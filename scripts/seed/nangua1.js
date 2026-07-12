var Files = Java.type('java.nio.file.Files');
var Paths = Java.type('java.nio.file.Paths');
var rsc = server.getPluginManager().getPlugin('RykenSlimefunCustomizer').getDataFolder();
var base = new java.io.File(rsc, 'addons/WorldTaste/scripts');
var code = new java.lang.String(Files.readAllBytes(Paths.get(base.getPath(), 'lib/wt_crop.js')), 'UTF-8');
(0, eval)(code);


WT_setupCrop({
  id: "WT_SEED_NANGUA1",
  material: Material.MELON_STEM,
  maxAge: 6,
  growMs: 120000,
  stages: WT_SMALL_STEPS,
  weightedDrops: [
    {id: "WT_SHENGNANGUA", weight: 0.6},
    {id: "WT_HAIMIANGUA", weight: 0.4},
    {id: "WT_BINGNANGUA", weight: 0.2},
    {id: "WT_NAIYOUNANGUA", weight: 0.15},
    {id: "WT_HUANGNANGUA", weight: 0.3},
    {id: "WT_KEAINANGUA", weight: 0.05},
    {id: "WT_XIANGZINANGUA", weight: 0.2},
  ]
});
