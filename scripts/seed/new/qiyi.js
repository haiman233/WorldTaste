var Files = Java.type('java.nio.file.Files');
var Paths = Java.type('java.nio.file.Paths');
var rsc = server.getPluginManager().getPlugin('RykenSlimefunCustomizer').getDataFolder();
var base = new java.io.File(rsc, 'addons/WorldTaste/scripts');
var code = new java.lang.String(Files.readAllBytes(Paths.get(base.getPath(), 'lib/wt_crop.js')), 'UTF-8');
(0, eval)(code);


WT_setupCrop({
  id: "WT_SEED_QIYI",
  material: Material.CHORUS_FLOWER,
  maxAge: 5,
  growMs: 30000,
  stages: WT_SMALL_STEPS,
  weightedDrops: [
    {id: "WT_MOFAGUO", weight: 0.5},
    {id: "WT_MOYINGLONGGUO", weight: 0.15},
    {id: "WT_AIQINGUO", weight: 0.2},
    {id: "WT_MONENGPINGGUO", weight: 0.4},
    {id: "WT_ZHANHUAJIANGGUO", weight: 0.35},
    {id: "WT_ZISONGGUA", weight: 0.2},
    {id: "WT_SEED_QIYI", weight: 0.32},
  ]
});
