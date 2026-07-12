var Files = Java.type('java.nio.file.Files');
var Paths = Java.type('java.nio.file.Paths');
var rsc = server.getPluginManager().getPlugin('RykenSlimefunCustomizer').getDataFolder();
var base = new java.io.File(rsc, 'addons/WorldTaste/scripts');
var code = new java.lang.String(Files.readAllBytes(Paths.get(base.getPath(), 'lib/wt_crop.js')), 'UTF-8');
(0, eval)(code);


WT_setupCrop({
  id: "WT_SEED_XINGHONG",
  material: Material.NETHER_WART,
  maxAge: 3,
  growMs: 30000,
  stages: WT_SMALL_STEPS,
  weightedDrops: [
    {id: "WT_XUETENG:", weight: 0.5},
    {id: "WT_NAOXINCAI", weight: 0.4},
    {id: "WT_SADANGUO", weight: 0.3},
    {id: "WT_SEED_XINGHONG", weight: 0.3},
  ]
});
