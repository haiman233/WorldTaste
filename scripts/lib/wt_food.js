// wt_food.js — WorldTaste 公共食物逻辑库
// 由各个食物脚本通过 eval 引入；请勿在 yml 的 script 字段中直接指向本文件。
// 本文件只定义全局函数，不绑定任何 RSC 事件。

// items.yml 消耗品（onUse 形态）：主手消耗、副手校验、可选恢复饥饿/饱和/再生
globalThis.WT_eatConsumable = function (event, opts) {
  if (!opts) opts = {};
  var player = event.getPlayer();
  var inv = player.getInventory();
  var itemInMainHand = inv.getItemInMainHand();
  var offHandItem = inv.getItemInOffHand();

  if (opts.requireHungry && player.getFoodLevel() >= 20) {
    return;
  }
  if (offHandItem != null && SlimefunItem.getByItem(offHandItem) != null) {
    player.sendMessage("您必须使用主手进食且副手不能持有粘液科技物品！");
    return;
  }
  if (itemInMainHand != null && itemInMainHand.getAmount() > 0) {
    itemInMainHand.setAmount(itemInMainHand.getAmount() - 1);

    if (opts.food != null)        player.setFoodLevel(player.getFoodLevel() + opts.food);
    if (opts.saturation != null)  player.setSaturation(player.getSaturation() + opts.saturation);
    if (opts.exhaustion != null)  player.setExhaustion(player.getExhaustion() - opts.exhaustion);
    if (opts.saturationSet != null) player.setSaturation(opts.saturationSet);
    if (opts.satRegen != null)    player.setSaturatedRegenRate(opts.satRegen);
    if (opts.unsatRegen != null)  player.setUnsaturatedRegenRate(opts.unsatRegen);
    if (opts.starvation != null)  player.setStarvationRate(opts.starvation);
    if (opts.maxAir != null)      player.setMaximumAir(opts.maxAir);

    if (opts.message) player.sendMessage(opts.message);
    if (opts.sound !== false) {
      var sn = opts.soundName || "entity.strider.eat";
      player.getLocation().getWorld().playSound(player.getLocation(), sn, 1.0, 1.0);
    }
  }
};

// foods.yml 食物（onEat 形态）：自动进食，不消耗、不校验副手
globalThis.WT_eatFood = function (event, food, sat, exh) {
  var p = event.getPlayer();
  p.setFoodLevel(p.getFoodLevel() + food);
  p.setSaturation(p.getSaturation() + sat);
  p.setExhaustion(p.getExhaustion() - exh);
};
