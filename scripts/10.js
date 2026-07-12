var Files = Java.type('java.nio.file.Files');
var Paths = Java.type('java.nio.file.Paths');
var rsc = server.getPluginManager().getPlugin('RykenSlimefunCustomizer').getDataFolder();
var base = new java.io.File(rsc, 'addons/WorldTaste/scripts');
var code = new java.lang.String(Files.readAllBytes(Paths.get(base.getPath(), 'lib/wt_food.js')), 'UTF-8');
(0, eval)(code);

function onUse(event) {
  WT_eatConsumable(event, { food: 10, saturation: 10, exhaustion: 1, requireHungry: true });
}
