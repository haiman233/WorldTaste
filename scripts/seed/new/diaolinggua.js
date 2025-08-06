const SlimefunItem = Java.type('io.github.thebusybiscuit.slimefun4.api.items.SlimefunItem');
const Material     = Java.type('org.bukkit.Material');
const ItemStack    = Java.type('org.bukkit.inventory.ItemStack');
const Ageable      = Java.type('org.bukkit.block.data.Ageable');

/* ---------- 存储结构 ---------- */
let lastUseTimes         = new java.util.HashMap(); // 每个机器的最后使用时间
let machineTickCounters  = new java.util.HashMap(); // 每个机器的独立 tick 计数
let giftif               = new java.util.HashMap(); // 植物是否已成熟

/* ---------- 配置参数 ---------- */
var SpawnEntitytick      = 2;
var GrowTimems_INFINITE  = 120000; // ms
var steps                = [1/3,2/3,1,4/3,5/3,5/3,2];
var smallSteps           = [1/10,1/6,1/3,1/2,2/3,5/6,1,7/6];

/* ---------- 生长阶段映射 ---------- */
var growthStages = {
    "WT_SEED_DIAOLINGGUA": {
        stages: smallSteps,
        material: Material.MELON_STEM,
        maxAge: 6
    }
};

/* ---------- 主循环 ---------- */
function tick(info) {
    const machine   = info.machine();
    const location  = info.block().getLocation();
    const world     = location.getWorld();
    const machinesf = machine.getId();
    const block     = info.block();

    if (giftif.get(location) === true) return; // 已成熟则跳过

    let tickCounter = machineTickCounters.getOrDefault(location, 0);
    if (tickCounter < SpawnEntitytick) {
        machineTickCounters.put(location, tickCounter + 1);
        return;
    }

    const currentTime = new Date().getTime();
    if (!lastUseTimes.containsKey(location)) {
        lastUseTimes.put(location, currentTime);
        return;
    }

    const lastUseTime = lastUseTimes.get(location);
    if (machinesf === "WT_SEED_DIAOLINGGUA") {
        handleGrowth(world, location, lastUseTime, currentTime, "WT_SEED_DIAOLINGGUA");
    }
}

/* ---------- 生长处理 ---------- */
function handleGrowth(world, location, lastUseTime, currentTime, plantId) {
    const cfg   = growthStages[plantId];
    const block = world.getBlockAt(location);

    for (let i = 0; i < cfg.stages.length; i++) {
        const timeLimit = GrowTimems_INFINITE * cfg.stages[i];
        if (currentTime - lastUseTime < timeLimit) {
            if (i > 0) setGrowthStage(block, cfg.material, cfg.maxAge * (i / cfg.stages.length));
            return;
        }
    }

    // 成熟
    setGrowthStage(block, cfg.material, cfg.maxAge);
    giftif.put(location, true);
    lastUseTimes.remove(location);
    machineTickCounters.remove(location);
}

/* ---------- 设置阶段 ---------- */
function setGrowthStage(block, material, age) {
    block.setType(material);
    const blockState = block.getState();
    const blockData  = blockState.getBlockData();
    if (blockData instanceof Ageable) {
        blockData.setAge(Math.floor(age));
        blockState.setBlockData(blockData);
        blockState.update(true);
    }
}

/* ---------- 放置事件 ---------- */
function onPlace(event) {
    const loc = event.getBlock().getLocation();
    lastUseTimes.remove(loc);
    machineTickCounters.remove(loc);
    giftif.put(loc, false);
}

/* ---------- 破坏事件 ---------- */
function onBreak(event, itemStack, drops) {
    const player = event.getPlayer();
    const loc    = event.getBlock().getLocation();
    const world  = player.getWorld();

    lastUseTimes.remove(loc);
    machineTickCounters.remove(loc);

    if (giftif.get(loc) === true) handleHarvest(world, loc);
    giftif.put(loc, false);
}

/* ---------- 成熟掉落 ---------- */
function handleHarvest(world, location) {
    const sfItem = StorageCacheUtils.getSfItem(location);
    if (sfItem && sfItem.getId() === "WT_SEED_DIAOLINGGUA") {
        const drops = [
            { itemId: "WT_DIAOLINGGUA",        probability: 0.7 },
            { itemId: "WT_EMOGUA",        probability: 0.3 },
            { itemId: "WT_SEED_DIAOLINGGUA",   probability: 0.4 }
        ];
        const chosen = selectRandomDrop(drops);
        if (chosen) dropItem(world, location, chosen.itemId);
    }
}

/* ---------- 随机掉落工具 ---------- */
function selectRandomDrop(drops) {
    const total = drops.reduce((s, d) => s + d.probability, 0);
    let rand = Math.random() * total;
    for (const d of drops) {
        rand -= d.probability;
        if (rand <= 0) return d;
    }
    return null;
}

function dropItem(world, location, itemId) {
    const sf = getSfItemById(itemId);
    if (!sf) return;
    const stack = new ItemStack(sf.getItem().getType());
    stack.setItemMeta(sf.getItem().getItemMeta());
    world.dropItemNaturally(location, stack);
}