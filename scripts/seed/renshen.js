var Files = Java.type('java.nio.file.Files');
var Paths = Java.type('java.nio.file.Paths');
var rsc = server.getPluginManager().getPlugin('RykenSlimefunCustomizer').getDataFolder();
var base = new java.io.File(rsc, 'addons/WorldTaste/scripts');
var code = new java.lang.String(Files.readAllBytes(Paths.get(base.getPath(), 'lib/wt_crop.js')), 'UTF-8');
(0, eval)(code);


WT_setupCrop({
  id: "WT_SEED_RENSHEN",
  material: Material.POTATOES,
  maxAge: 7,
  growMs: 240000,
  stages: WT_SMALL_STEPS,
  weightedDrops: [
    {id: "WT_RENSHEN", weight: 0.95},
    {id: "WT_XIANRENSHEN", weight: 0.05},
  ]
});
