var Files = Java.type('java.nio.file.Files');
var Paths = Java.type('java.nio.file.Paths');
var rsc = server.getPluginManager().getPlugin('RykenSlimefunCustomizer').getDataFolder();
var base = new java.io.File(rsc, 'addons/WorldTaste/scripts');
var code = new java.lang.String(Files.readAllBytes(Paths.get(base.getPath(), 'lib/wt_crop.js')), 'UTF-8');
(0, eval)(code);


WT_setupCrop({
  id: "WT_SEED_LIULIAN",
  material: Material.PITCHER_CROP,
  maxAge: 4,
  growMs: 90000,
  stages: WT_SMALL_STEPS,
  weightedDrops: [
    {id: "WT_LIULIAN", weight: 0.9},
    {id: "WT_QINGNILIULIAN", weight: 0.1},
    {id: "WT_SEED_LIULIAN", weight: 0.2},
  ]
});
