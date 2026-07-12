var Files = Java.type('java.nio.file.Files');
var Paths = Java.type('java.nio.file.Paths');
var rsc = server.getPluginManager().getPlugin('RykenSlimefunCustomizer').getDataFolder();
var base = new java.io.File(rsc, 'addons/WorldTaste/scripts');
var code = new java.lang.String(Files.readAllBytes(Paths.get(base.getPath(), 'lib/wt_crop.js')), 'UTF-8');
(0, eval)(code);


WT_setupCrop({
  id: "WT_SEED_DLJ",
  material: Material.MELON_STEM,
  maxAge: 6,
  growMs: 120000,
  stages: WT_SMALL_STEPS,
  weightedDrops: [
    {id: "WT_DLJ", weight: 0.7},
    {id: "WT_CDLJ", weight: 0.2},
    {id: "WT_LDLJ", weight: 0.1},
    {id: "WT_SEED_DLJ", weight: 0.3},
  ]
});
