var Files = Java.type('java.nio.file.Files');
var Paths = Java.type('java.nio.file.Paths');
var rsc = server.getPluginManager().getPlugin('RykenSlimefunCustomizer').getDataFolder();
var base = new java.io.File(rsc, 'addons/WorldTaste/scripts');
var code = new java.lang.String(Files.readAllBytes(Paths.get(base.getPath(), 'lib/wt_crop.js')), 'UTF-8');
(0, eval)(code);


WT_setupCrop({
  id: "WT_SEED_YAOQIANSHU",
  material: Material.TORCHFLOWER_CROP,
  maxAge: 1,
  growMs: 300000,
  stages: WT_SMALL_STEPS,
  drops: [
    {id: "WT_JINBI", chance: 1.0},
    {id: "WT_SEED_YAOQIANSHU", chance: 1.0},
  ]
});
