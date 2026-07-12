var Files = Java.type('java.nio.file.Files');
var Paths = Java.type('java.nio.file.Paths');
var rsc = server.getPluginManager().getPlugin('RykenSlimefunCustomizer').getDataFolder();
var base = new java.io.File(rsc, 'addons/WorldTaste/scripts');
var code = new java.lang.String(Files.readAllBytes(Paths.get(base.getPath(), 'lib/wt_crop.js')), 'UTF-8');
(0, eval)(code);


WT_setupCrop({
  id: "WT_SEED_TONGNIAN",
  material: Material.SWEET_BERRY_BUSH,
  maxAge: 3,
  growMs: 240000,
  stages: WT_SMALL_STEPS,
  weightedDrops: [
    {id: "WT_WANDOUSHESHOU", weight: 0.2},
    {id: "WT_DAZUIHUA", weight: 0.12},
    {id: "WT_HUIMIE", weight: 0.1},
    {id: "WT_XIANGRIKUI", weight: 0.5},
    {id: "WT_MALIAOMOGU", weight: 0.08},
  ]
});
