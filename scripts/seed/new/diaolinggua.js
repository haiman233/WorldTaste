// 作物脚本（薄壳）：通用逻辑见 lib/wt_crop.js
var rsc = server.getPluginManager().getPlugin('RykenSlimefunCustomizer').getDataFolder();
var base = new java.io.File(rsc, 'addons/WorldTaste/scripts');
var code = new java.lang.String(Files.readAllBytes(Paths.get(base.getPath(), 'lib/wt_crop.js')), 'UTF-8');
(0, eval)(code);

WT_setupCrop({
  id: "WT_SEED_DIAOLINGGUA",
  material: Material.MELON_STEM,
  maxAge: 6,
  growMs: 120000,
  stages: WT_SMALL_STEPS,
  spawnTick: 2,
  // 成熟时按权重随机选一个掉落（probability 语义等价于 weight）
  weightedDrops: [
    { id: "WT_DIAOLINGGUA",      weight: 0.7 },
    { id: "WT_EMOGUA",      weight: 0.3 },
    { id: "WT_SEED_DIAOLINGGUA", weight: 0.4 }
  ]
});
