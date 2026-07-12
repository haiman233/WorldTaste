var Files = Java.type('java.nio.file.Files');
var Paths = Java.type('java.nio.file.Paths');
var rsc = server.getPluginManager().getPlugin('RykenSlimefunCustomizer').getDataFolder();
var base = new java.io.File(rsc, 'addons/WorldTaste/scripts');
var code = new java.lang.String(Files.readAllBytes(Paths.get(base.getPath(), 'lib/wt_food.js')), 'UTF-8');
(0, eval)(code);

function onUse(event) {
  WT_eatConsumable(event, { food: 3, saturation: 3, exhaustion: 0.3, requireHungry: true });
}
