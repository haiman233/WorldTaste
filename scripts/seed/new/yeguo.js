var Files = Java.type('java.nio.file.Files');
var Paths = Java.type('java.nio.file.Paths');
var rsc = server.getPluginManager().getPlugin('RykenSlimefunCustomizer').getDataFolder();
var base = new java.io.File(rsc, 'addons/WorldTaste/scripts');
var code = new java.lang.String(Files.readAllBytes(Paths.get(base.getPath(), 'lib/wt_crop.js')), 'UTF-8');
(0, eval)(code);


WT_setupCrop({
  id: "WT_SEED_YEGUO",
  material: Material.SWEET_BERRY_BUSH,
  maxAge: 3,
  growMs: 120000,
  stages: WT_SMALL_STEPS,
  weightedDrops: [
    {id: "WT_DONGQINGGUO", weight: 0.5},
    {id: "WT_YEYINGMEI", weight: 0.5},
    {id: "WT_HEIXINGUO", weight: 0.5},
    {id: "WT_SHANZHA", weight: 0.6},
    {id: "WT_BOLUOMEI", weight: 0.5},
    {id: "WT_BAITAO", weight: 0.5},
    {id: "WT_DENGLONGGUO", weight: 0.5},
    {id: "WT_TIANSHIGUO", weight: 0.1},
    {id: "WT_KUCHENG", weight: 0.5},
    {id: "WT_SHATANGJU", weight: 0.4},
    {id: "WT_SEED_YEGUO", weight: 0.3},
  ]
});
