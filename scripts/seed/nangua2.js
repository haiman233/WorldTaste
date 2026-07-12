var Files = Java.type('java.nio.file.Files');
var Paths = Java.type('java.nio.file.Paths');
var rsc = server.getPluginManager().getPlugin('RykenSlimefunCustomizer').getDataFolder();
var base = new java.io.File(rsc, 'addons/WorldTaste/scripts');
var code = new java.lang.String(Files.readAllBytes(Paths.get(base.getPath(), 'lib/wt_crop.js')), 'UTF-8');
(0, eval)(code);


WT_setupCrop({
  id: "WT_SEED_NANGUA2",
  material: Material.MELON_STEM,
  maxAge: 6,
  growMs: 180000,
  stages: WT_SMALL_STEPS,
  weightedDrops: [
    {id: "WT_NANGUA2", weight: 0.4},
    {id: "WT_LANGUA", weight: 0.2},
    {id: "WT_JINNANGUA", weight: 0.05},
    {id: "WT_NANGUA3", weight: 0.3},
    {id: "WT_XIANGJIAONANGUA", weight: 0.25},
    {id: "WT_HABODENANGUA", weight: 0.5},
  ]
});
