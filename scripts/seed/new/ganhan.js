var Files = Java.type('java.nio.file.Files');
var Paths = Java.type('java.nio.file.Paths');
var rsc = server.getPluginManager().getPlugin('RykenSlimefunCustomizer').getDataFolder();
var base = new java.io.File(rsc, 'addons/WorldTaste/scripts');
var code = new java.lang.String(Files.readAllBytes(Paths.get(base.getPath(), 'lib/wt_crop.js')), 'UTF-8');
(0, eval)(code);


WT_setupCrop({
  id: "WT_SEED_GANHAN",
  material: Material.PITCHER_CROP,
  maxAge: 4,
  growMs: 120000,
  stages: WT_SMALL_STEPS,
  weightedDrops: [
    {id: "WT_DUOROUZHIWU", weight: 0.5},
    {id: "WT_DWANGHUA", weight: 0.35},
    {id: "WT_HUOBANGXRZ", weight: 0.3},
    {id: "WT_BAIHUAXRZ", weight: 0.2},
    {id: "WT_YOUNIXRZ", weight: 0.3},
    {id: "WT_ZUANSHIXRZ", weight: 0.1},
    {id: "WT_TLRYXRZ", weight: 0.15},
    {id: "WT_SEED_GANHAN", weight: 0.2},
  ]
});
