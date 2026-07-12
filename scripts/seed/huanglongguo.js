var Files = Java.type('java.nio.file.Files');
var Paths = Java.type('java.nio.file.Paths');
var rsc = server.getPluginManager().getPlugin('RykenSlimefunCustomizer').getDataFolder();
var base = new java.io.File(rsc, 'addons/WorldTaste/scripts');
var code = new java.lang.String(Files.readAllBytes(Paths.get(base.getPath(), 'lib/wt_crop.js')), 'UTF-8');
(0, eval)(code);


WT_setupCrop({
  id: "WT_SEED_HUANGLONGGUO",
  material: Material.SWEET_BERRY_BUSH,
  maxAge: 3,
  growMs: 120000,
  stages: WT_SMALL_STEPS,
  weightedDrops: [
    {id: "WT_HUANGLONGGUO", weight: 0.8},
    {id: "WT_TIANLONGGUO", weight: 0.1},
    {id: "WT_SEED_HUANGLONGGUO", weight: 0.5},
    {id: "WT_QINGLONGGUO", weight: 0.3},
  ]
});
