// wt_crop.js — WorldTaste 公共作物逻辑库
// 由各个作物脚本通过 eval 引入；请勿在 yml 的 script 字段中直接指向本文件。
// 本文件只定义全局函数与常量，不绑定任何 RSC 事件。

globalThis.Material  = Java.type('org.bukkit.Material');
globalThis.ItemStack = Java.type('org.bukkit.inventory.ItemStack');
globalThis.Ageable   = Java.type('org.bukkit.block.data.Ageable');

// 通用小生长阶段（与原始 smallSteps 完全一致）
globalThis.WT_SMALL_STEPS = [1/10, 1/6, 1/3, 1/2, 2/3, 5/6, 1, 7/6];

// 掉落单个粘液物品
globalThis.WT_dropItem = function (world, location, id) {
  var si = getSfItemById(id);
  if (si == null) return;
  var is = new ItemStack(si.getItem().getType());
  is.setItemMeta(si.getItem().getItemMeta());
  world.dropItemNaturally(location, is);
};

// 按权重从列表中随机选一个（等价于原 selectRandomDrop）
globalThis.WT_selectRandomDrop = function (drops) {
  var total = 0;
  for (var i = 0; i < drops.length; i++) total += drops[i].weight;
  var r = Math.random() * total;
  for (var i = 0; i < drops.length; i++) {
    r -= drops[i].weight;
    if (r <= 0) return drops[i];
  }
  return null;
};

// 配置并注册作物的 tick / onPlace / onBreak（每个脚本独立一份存储）
// cfg: { id, material, maxAge, growMs, stages, spawnTick?, drops?:[{id,chance}], weightedDrops?:[{id,weight}] }
globalThis.WT_setupCrop = function (cfg) {
  var lastUseTimes = new java.util.HashMap();
  var tickCounters = new java.util.HashMap();
  var giftif = new java.util.HashMap();
  var spawnTick = (cfg.spawnTick != null) ? cfg.spawnTick : 2;

  globalThis.tick = function (info) {
    var machine = info.machine();
    var location = info.block().getLocation();
    var world = location.getWorld();
    var machinesf = machine.getId();

    if (giftif.get(location) === true) return;

    var tc = tickCounters.getOrDefault(location, 0);
    if (tc < spawnTick) { tickCounters.put(location, tc + 1); return; }

    var currentTime = new Date().getTime();
    if (!lastUseTimes.containsKey(location)) { lastUseTimes.put(location, currentTime); return; }
    var lastUseTime = lastUseTimes.get(location);

    if (machinesf === cfg.id) {
      handleGrowth(world, location, lastUseTime, currentTime, cfg.id);
    }
  };

  function handleGrowth(world, location, lastUseTime, currentTime, plantId) {
    var stages = cfg.stages;
    var block = world.getBlockAt(location);
    for (var i = 0; i < stages.length; i++) {
      var timeLimit = cfg.growMs * stages[i];
      if (currentTime - lastUseTime < timeLimit) {
        if (i > 0) setGrowthStage(block, cfg.material, cfg.maxAge * (i / stages.length));
        return;
      }
    }
    setGrowthStage(block, cfg.material, cfg.maxAge);
    giftif.put(location, true);
    lastUseTimes.remove(location);
    tickCounters.remove(location);
  }

  function setGrowthStage(block, material, age) {
    block.setType(material);
    var blockState = block.getState();
    var blockData = blockState.getBlockData();
    if (blockData instanceof Ageable) {
      blockData.setAge(Math.floor(age));
      blockState.setBlockData(blockData);
      blockState.update(true);
    }
  }

  globalThis.onPlace = function (event) {
    var location = event.getBlock().getLocation();
    lastUseTimes.remove(location);
    tickCounters.remove(location);
    giftif.put(location, false);
  };

  globalThis.onBreak = function (event, itemStack, drops) {
    var player = event.getPlayer();
    var location = event.getBlock().getLocation();
    var world = player.getWorld();
    lastUseTimes.remove(location);
    tickCounters.remove(location);
    if (giftif.get(location) === true) handleHarvest(world, location);
    giftif.put(location, false);
  };

  function handleHarvest(world, location) {
    var sfItem = StorageCacheUtils.getSfItem(location);
    if (sfItem == null || sfItem.getId() !== cfg.id) return;
    if (cfg.weightedDrops != null) {
      var sel = WT_selectRandomDrop(cfg.weightedDrops);
      if (sel != null) WT_dropItem(world, location, sel.id);
    } else if (cfg.drops != null) {
      for (var i = 0; i < cfg.drops.length; i++) {
        if (Math.random() < cfg.drops[i].chance) WT_dropItem(world, location, cfg.drops[i].id);
      }
    }
  }
};
