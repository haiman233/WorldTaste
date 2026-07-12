var Files = Java.type('java.nio.file.Files');
var Paths = Java.type('java.nio.file.Paths');
var rsc = server.getPluginManager().getPlugin('RykenSlimefunCustomizer').getDataFolder();
var base = new java.io.File(rsc, 'addons/WorldTaste/scripts');
var code = new java.lang.String(Files.readAllBytes(Paths.get(base.getPath(), 'lib/wt_crop.js')), 'UTF-8');
(0, eval)(code);


WT_setupCrop({
  id: "WT_SEED_CULI",
  material: Material.SWEET_BERRY_BUSH,
  maxAge: 3,
  growMs: 90000,
  stages: WT_SMALL_STEPS,
  weightedDrops: [
    {id: "WT_CULI", weight: 0.7},
    {id: "WT_HEICULI", weight: 0.2},
    {id: "WT_LANCULI", weight: 0.1},
  ]
});
