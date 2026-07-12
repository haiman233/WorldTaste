var Files = Java.type('java.nio.file.Files');
var Paths = Java.type('java.nio.file.Paths');
var rsc = server.getPluginManager().getPlugin('RykenSlimefunCustomizer').getDataFolder();
var base = new java.io.File(rsc, 'addons/WorldTaste/scripts');
var code = new java.lang.String(Files.readAllBytes(Paths.get(base.getPath(), 'lib/wt_crop.js')), 'UTF-8');
(0, eval)(code);


WT_setupCrop({
  id: "WT_SEED_SHIRUN",
  material: Material.WHEAT,
  maxAge: 7,
  growMs: 120000,
  stages: WT_SMALL_STEPS,
  weightedDrops: [
    {id: "WT_XIANGPUTOU", weight: 0.5},
    {id: "WT_YUMAOLUWEICAO", weight: 0.5},
    {id: "WT_BUYINGCAO", weight: 0.3},
    {id: "WT_YUNMEI", weight: 0.2},
    {id: "WT_TIANMEI", weight: 0.1},
    {id: "WT_SEED_SHIRUN", weight: 0.3},
  ]
});
