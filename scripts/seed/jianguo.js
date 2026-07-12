var Files = Java.type('java.nio.file.Files');
var Paths = Java.type('java.nio.file.Paths');
var rsc = server.getPluginManager().getPlugin('RykenSlimefunCustomizer').getDataFolder();
var base = new java.io.File(rsc, 'addons/WorldTaste/scripts');
var code = new java.lang.String(Files.readAllBytes(Paths.get(base.getPath(), 'lib/wt_crop.js')), 'UTF-8');
(0, eval)(code);


WT_setupCrop({
  id: "WT_SEED_JIANGUO",
  material: Material.COCOA,
  maxAge: 2,
  growMs: 180000,
  stages: WT_SMALL_STEPS,
  weightedDrops: [
    {id: "WT_SONGGUO", weight: 0.8},
    {id: "WT_HETAO", weight: 0.25},
    {id: "WT_XINREN", weight: 0.25},
    {id: "WT_BANLI", weight: 0.27},
    {id: "WT_SHANHETAO", weight: 0.27},
    {id: "WT_YAOGUO", weight: 0.23},
    {id: "WT_XIANGZI", weight: 0.23},
    {id: "WT_ZHENZI", weight: 0.3},
    {id: "WT_KAIXINGUO", weight: 0.1},
    {id: "WT_MALI", weight: 0.4},
    {id: "WT_CONGLINMUJIA", weight: 0.1},
    {id: "WT_DALISHISONGGUO", weight: 0.08},
    {id: "WT_JIANGUOQIANG", weight: 0.06},
  ]
});
