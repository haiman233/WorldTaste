var Files = Java.type('java.nio.file.Files');
var Paths = Java.type('java.nio.file.Paths');
var rsc = server.getPluginManager().getPlugin('RykenSlimefunCustomizer').getDataFolder();
var base = new java.io.File(rsc, 'addons/WorldTaste/scripts');
var code = new java.lang.String(Files.readAllBytes(Paths.get(base.getPath(), 'lib/wt_crop.js')), 'UTF-8');
(0, eval)(code);


WT_setupCrop({
  id: "WT_SEED_DOUJIA",
  material: Material.WHEAT,
  maxAge: 7,
  growMs: 120000,
  stages: WT_SMALL_STEPS,
  weightedDrops: [
    {id: "WT_HONGDOU", weight: 0.5},
    {id: "WT_LVDOU", weight: 0.6},
    {id: "WT_HEIDOU", weight: 0.4},
    {id: "WT_HUANGDOU", weight: 0.5},
    {id: "WT_LANDOU", weight: 0.1},
    {id: "WT_SEED_DOUJIA", weight: 0.3},
  ]
});
