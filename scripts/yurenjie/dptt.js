var Files = Java.type('java.nio.file.Files');
var Paths = Java.type('java.nio.file.Paths');
var rsc = server.getPluginManager().getPlugin('RykenSlimefunCustomizer').getDataFolder();
var base = new java.io.File(rsc, 'addons/WorldTaste/scripts');
var code = new java.lang.String(Files.readAllBytes(Paths.get(base.getPath(), 'lib/wt_crop.js')), 'UTF-8');
(0, eval)(code);


WT_setupCrop({
  id: "WT_SEED_DPTT",
  material: Material.POTATOES,
  maxAge: 7,
  growMs: 90000,
  stages: WT_SMALL_STEPS,
  weightedDrops: [
    {id: "WT_DUPUTUITOU", weight: 0.85},
    {id: "WT_SHELINGSHU", weight: 0.02},
    {id: "WT_SEED_JUDUGUO", weight: 0.0114514},
  ]
});
