var Files = Java.type('java.nio.file.Files');
var Paths = Java.type('java.nio.file.Paths');
var rsc = server.getPluginManager().getPlugin('RykenSlimefunCustomizer').getDataFolder();
var base = new java.io.File(rsc, 'addons/WorldTaste/scripts');
var code = new java.lang.String(Files.readAllBytes(Paths.get(base.getPath(), 'lib/wt_crop.js')), 'UTF-8');
(0, eval)(code);


WT_setupCrop({
  id: "WT_SEED_YANGTAO",
  material: Material.PITCHER_CROP,
  maxAge: 4,
  growMs: 90000,
  stages: WT_SMALL_STEPS,
  weightedDrops: [
    {id: "WT_YANGTAO", weight: 0.85},
    {id: "WT_QINGYANGTAO", weight: 0.15},
    {id: "WT_SEED_YANGTAO", weight: 0.2},
  ]
});
