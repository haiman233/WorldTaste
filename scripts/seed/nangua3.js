var Files = Java.type('java.nio.file.Files');
var Paths = Java.type('java.nio.file.Paths');
var rsc = server.getPluginManager().getPlugin('RykenSlimefunCustomizer').getDataFolder();
var base = new java.io.File(rsc, 'addons/WorldTaste/scripts');
var code = new java.lang.String(Files.readAllBytes(Paths.get(base.getPath(), 'lib/wt_crop.js')), 'UTF-8');
(0, eval)(code);


WT_setupCrop({
  id: "WT_SEED_NANGUA3",
  material: Material.MELON_STEM,
  maxAge: 6,
  growMs: 240000,
  stages: WT_SMALL_STEPS,
  weightedDrops: [
    {id: "WT_FUHUANANGUA", weight: 0.35},
    {id: "WT_NANGUA4", weight: 0.2},
    {id: "WT_FUGUA", weight: 0.01},
    {id: "WT_CANGBAINANGUA", weight: 0.05},
    {id: "WT_LANGUA2", weight: 0.15},
    {id: "WT_HONGLINANGUA", weight: 0.52},
  ]
});
