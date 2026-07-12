var Files = Java.type('java.nio.file.Files');
var Paths = Java.type('java.nio.file.Paths');
var rsc = server.getPluginManager().getPlugin('RykenSlimefunCustomizer').getDataFolder();
var base = new java.io.File(rsc, 'addons/WorldTaste/scripts');
var code = new java.lang.String(Files.readAllBytes(Paths.get(base.getPath(), 'lib/wt_crop.js')), 'UTF-8');
(0, eval)(code);


WT_setupCrop({
  id: "WT_SEED_PIPA",
  material: Material.SWEET_BERRY_BUSH,
  maxAge: 3,
  growMs: 90000,
  stages: WT_SMALL_STEPS,
  drops: [
    {id: "WT_PIPA", chance: 1.0},
    {id: "WT_SEED_PIPA", chance: 1.0},
  ]
});
