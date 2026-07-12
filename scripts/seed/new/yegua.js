var Files = Java.type('java.nio.file.Files');
var Paths = Java.type('java.nio.file.Paths');
var rsc = server.getPluginManager().getPlugin('RykenSlimefunCustomizer').getDataFolder();
var base = new java.io.File(rsc, 'addons/WorldTaste/scripts');
var code = new java.lang.String(Files.readAllBytes(Paths.get(base.getPath(), 'lib/wt_crop.js')), 'UTF-8');
(0, eval)(code);


WT_setupCrop({
  id: "WT_SEED_YEGUA",
  material: Material.MELON_STEM,
  maxAge: 6,
  growMs: 120000,
  stages: WT_SMALL_STEPS,
  weightedDrops: [
    {id: "WT_QINGPITIANGUA", weight: 0.6},
    {id: "WT_JINSIGUA", weight: 0.4},
    {id: "WT_XINGHONGTIANGUA", weight: 0.1},
    {id: "WT_MABOGUA", weight: 0.4},
    {id: "WT_YINGGUANGLVGUA", weight: 0.2},
    {id: "WT_SEED_YEGUA", weight: 0.3},
  ]
});
