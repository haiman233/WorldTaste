const SlimefunItem = Java.type('io.github.thebusybiscuit.slimefun4.api.items.SlimefunItem');
const Material = Java.type('org.bukkit.Material');
const ItemStack = Java.type('org.bukkit.inventory.ItemStack');
const Ageable = Java.type('org.bukkit.block.data.Ageable');

// 创建存储结构
let lastUseTimes = new java.util.HashMap(); // 存储每个机器的最后使用时间
let machineTickCounters = new java.util.HashMap(); // 存储每个机器的独立计数器
let giftif = new java.util.HashMap(); // 存储植物成熟状态

// 配置参数
var SpawnEntitytick = 2;
var GrowTimems_INFINITE = 120000; // 无尽植物生长周期间隔，单位毫秒
var steps = [1/3, 1/3, 1/3, 2/3, 2/3, 2/3, 1]; // 生长阶段
var smallSteps = [1/10, 1/6, 1/3, 1/2, 2/3, 5/6, 1, 7/6]; // 小生长阶段

// 生长阶段映射
var growthStages = {
    "WT_SEED_YEGUO": {
        stages: smallSteps,
        material: Material.SWEET_BERRY_BUSH,
        maxAge: 3
    }
};

// 主循环逻辑
function tick(info) {
    var machine = info.machine();
    var location = info.block().getLocation();
    var world = location.getWorld();
    var machinesf = machine.getId();
    var block = info.block();

    // 检查植物是否已经成熟，如果成熟则跳过处理
    if (giftif.get(location) === true) {
        return;
    }

    // 获取计数器，如果不存在则初始化为0
    let tickCounter = machineTickCounters.getOrDefault(location, 0);

    if (tickCounter < SpawnEntitytick) {
        machineTickCounters.put(location, tickCounter + 1);
        return;
    }

    const currentTime = new Date().getTime();

    // 初始化最后使用时间
    if (!lastUseTimes.containsKey(location)) {
        lastUseTimes.put(location, currentTime);
        return;
    }

    let lastUseTime = lastUseTimes.get(location);

    // 处理无尽植物生长逻辑
    if (machinesf === "WT_SEED_YEGUO") {
        handleGrowth(world, location, lastUseTime, currentTime, "WT_SEED_YEGUO");
    }
}

// 处理生长逻辑
function handleGrowth(world, location, lastUseTime, currentTime, plantId) {
    var config = growthStages[plantId];
    var block = world.getBlockAt(location);

    for (let i = 0; i < config.stages.length; i++) {
        let timeLimit = GrowTimems_INFINITE * config.stages[i];
        if (currentTime - lastUseTime < timeLimit) {
            if (i > 0) {
                setGrowthStage(block, config.material, config.maxAge * (i / config.stages.length));
            }
            return;
        }
    }

    // 成熟处理
    setGrowthStage(block, config.material, config.maxAge);
    giftif.put(location, true);

    // 移除相关记录，避免后续继续更新
    lastUseTimes.remove(location);
    machineTickCounters.remove(location);
}

// 设置方块生长阶段
function setGrowthStage(block, material, age) {
    block.setType(material);
    let blockState = block.getState();
    let blockData = blockState.getBlockData();

    if (blockData instanceof Ageable) {
        blockData.setAge(Math.floor(age));
        blockState.setBlockData(blockData);
        blockState.update(true);
    }
}

// 方块放置事件
function onPlace(event) {
    let location = event.getBlock().getLocation();
    lastUseTimes.remove(location);
    machineTickCounters.remove(location);
    giftif.put(location, false);
}

// 方块破坏事件
function onBreak(event, itemStack, drops) {
    let player = event.getPlayer();
    let location = event.getBlock().getLocation();
    let world = player.getWorld();

    // 清理记录
    lastUseTimes.remove(location);
    machineTickCounters.remove(location);

    if (giftif.get(location) === true) {
        handleHarvest(world, location);
    }

    giftif.put(location, false);
}

// 处理成熟植物掉落
function handleHarvest(world, location) {
    let sfItem = StorageCacheUtils.getSfItem(location);
    if (sfItem.getId() === "WT_SEED_YEGUO") {
        // 定义所有可能掉落的物品及其掉落概率
        let drops = [
            { itemId: "WT_DONGQINGGUO", probability: 0.5 },
            { itemId: "WT_YEYINGMEI", probability: 0.5 },
            { itemId: "WT_HEIXINGUO", probability: 0.5 },
            { itemId: "WT_SHANZHA", probability: 0.6 },
            { itemId: "WT_BOLUOMEI", probability: 0.5 },
            { itemId: "WT_BAITAO", probability: 0.5 },
            { itemId: "WT_DENGLONGGUO", probability: 0.5 },
            { itemId: "WT_TIANSHIGUO", probability: 0.1 },
            { itemId: "WT_KUCHENG", probability: 0.5 },
            { itemId: "WT_SHATANGJU", probability: 0.4 },
            { itemId: "WT_SEED_YEGUO", probability: 0.3 }
        ];

        // 随机选择一种物品进行掉落
        let randomItem = selectRandomDrop(drops);
        if (randomItem) {
            dropItem(world, location, randomItem.itemId);
        }
    }
}

// 随机选择一种物品进行掉落
function selectRandomDrop(drops) {
    // 计算总概率
    let totalProbability = drops.reduce((sum, drop) => sum + drop.probability, 0);

    // 生成一个随机数
    let random = Math.random() * totalProbability;

    // 遍历掉落列表，选择一种物品
    for (let drop of drops) {
        random -= drop.probability;
        if (random <= 0) {
            return drop;
        }
    }

    // 如果没有选中任何物品（理论上不会发生），返回 null
    return null;
}

// 掉落物品
function dropItem(world, location, itemId) {
    let slimefunItem = getSfItemById(itemId);
    if (slimefunItem) {
        let itemStack = new ItemStack(slimefunItem.getItem().getType());
        itemStack.setItemMeta(slimefunItem.getItem().getItemMeta());
        world.dropItemNaturally(location, itemStack);
    }
}