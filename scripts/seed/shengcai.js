const SlimefunItem = Java.type('io.github.thebusybiscuit.slimefun4.api.items.SlimefunItem');
const Material     = Java.type('org.bukkit.Material');
const ItemStack    = Java.type('org.bukkit.inventory.ItemStack');
const Ageable      = Java.type('org.bukkit.block.data.Ageable');

/* ---------- 存储 ---------- */
let lastUseTimes        = new java.util.HashMap();
let machineTickCounters = new java.util.HashMap();
let giftif              = new java.util.HashMap();

/* ---------- 配置 ---------- */
var SpawnEntitytick   = 2;
var GrowTimems_INFINITE = 120000;          // 120 s
var smallSteps = [1/10, 1/6, 1/3, 1/2, 2/3, 5/6, 1, 7/6];

var growthStages = {
    "WT_SEED_SHENGCAI": {
        stages   : smallSteps,
        material : Material.TORCHFLOWER_CROP,
        maxAge   : 1
    }
};

/* ---------- 主循环 ---------- */
function tick(info) {
    const loc = info.block().getLocation();
    if (giftif.get(loc) === true) return;

    let tickCounter = machineTickCounters.getOrDefault(loc, 0);
    if (tickCounter < SpawnEntitytick) {
        machineTickCounters.put(loc, tickCounter + 1);
        return;
    }

    const now = new Date().getTime();
    if (!lastUseTimes.containsKey(loc)) {
        lastUseTimes.put(loc, now);
        return;
    }

    const last = lastUseTimes.get(loc);
    if (info.machine().getId() === "WT_SEED_SHENGCAI") {
        handleGrowth(info.block().getWorld(), loc, last, now, "WT_SEED_SHENGCAI");
    }
}

/* ---------- 生长 ---------- */
function handleGrowth(world, loc, last, now, plantId) {
    const cfg = growthStages[plantId];
    const block = world.getBlockAt(loc);

    for (let i = 0; i < cfg.stages.length; i++) {
        const limit = GrowTimems_INFINITE * cfg.stages[i];
        if (now - last < limit) {
            if (i > 0) setGrowthStage(block, cfg.material, cfg.maxAge * (i / cfg.stages.length));
            return;
        }
    }

    setGrowthStage(block, cfg.material, cfg.maxAge);
    giftif.put(loc, true);
    lastUseTimes.remove(loc);
    machineTickCounters.remove(loc);
}

function setGrowthStage(block, material, age) {
    block.setType(material);
    const bs = block.getState();
    const bd = bs.getBlockData();
    if (bd instanceof Ageable) {
        bd.setAge(Math.floor(age));
        bs.setBlockData(bd);
        bs.update(true);
    }
}

/* ---------- 事件 ---------- */
function onPlace(e) {
    const loc = e.getBlock().getLocation();
    lastUseTimes.remove(loc);
    machineTickCounters.remove(loc);
    giftif.put(loc, false);
}

function onBreak(e, itemStack, drops) {
    const loc = e.getBlock().getLocation();
    const world = e.getPlayer().getWorld();

    lastUseTimes.remove(loc);
    machineTickCounters.remove(loc);

    if (giftif.get(loc) === true) handleHarvest(world, loc);
    giftif.put(loc, false);
}

/* ---------- 掉落 ---------- */
function handleHarvest(world, loc) {
    const sfItem = StorageCacheUtils.getSfItem(loc);
    if (sfItem?.getId() !== "WT_SEED_SHENGCAI") return;

    const drops = [
        { itemId: "WT_JIEQIUSHENGCAI",  probability: 0.9 },
        { itemId: "WT_XINGYUNZSDK",  probability: 0.08 },
        { itemId: "WT_SEED_SHENGCAI",   probability: 0.4 }
    ];

    const d = selectRandomDrop(drops);
    if (d) dropItem(world, loc, d.itemId);
}

/* ---------- 工具 ---------- */
function selectRandomDrop(drops) {
    const total = drops.reduce((s, d) => s + d.probability, 0);
    let rand = Math.random() * total;
    for (const d of drops) {
        rand -= d.probability;
        if (rand <= 0) return d;
    }
    return null;
}

function dropItem(world, loc, itemId) {
    const sf = getSfItemById(itemId);
    if (!sf) return;
    const is = new ItemStack(sf.getItem().getType());
    is.setItemMeta(sf.getItem().getItemMeta());
    world.dropItemNaturally(loc, is);
}