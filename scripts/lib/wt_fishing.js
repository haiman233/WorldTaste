// wt_fishing.js — WorldTaste 公共钓鱼逻辑库
// 由钓鱼事件脚本（scripts/diaoyu.js）通过 eval 引入；请勿在 yml 的 script 字段中直接指向本文件。
// 本文件只定义全局函数，不直接绑定 RSC 事件（事件函数在 WT_setupFishing 中定义到 globalThis）。

globalThis.Material  = Java.type('org.bukkit.Material');
globalThis.ItemStack = Java.type('org.bukkit.inventory.ItemStack');

// 按权重从掉落列表中随机选一个（drop 含 weight 字段）。等价于原 diaoyu.js 的 selectRandomDrop。
globalThis.WT_selectRandomDrop = function (drops) {
  var total = 0;
  for (var i = 0; i < drops.length; i++) total += drops[i].weight;
  var r = Math.random() * total;
  for (var i = 0; i < drops.length; i++) {
    r -= drops[i].weight;
    if (r <= 0) return drops[i];
  }
  return null;
};

// 减少指定手中物品数量
globalThis.WT_decreaseItemInWhichHand = function (item, amount) {
  item.setAmount(item.getAmount() - amount);
};

// 把 id 解析为 ItemStack：优先 Slimefun 物品，否则尝试原版 Material
globalThis.WT_resolveItemStack = function (itemId) {
  var sfItem = getSfItemById(itemId);
  if (sfItem) {
    var is = new ItemStack(sfItem.getItem().getType());
    is.setItemMeta(sfItem.getItem().getItemMeta());
    return is;
  }
  try {
    return new ItemStack(Material.valueOf(itemId));
  } catch (e) {
    return null;
  }
};

// 生成掉落物并拉向玩家（带拾取延迟）
globalThis.WT_createDropItemAndEffects = function (hook, player, itemstack) {
  var itemEntity = hook.getWorld().dropItem(hook.getLocation(), itemstack);
  itemEntity.setPickupDelay(2);
  var playerLocation = player.getLocation().add(0, 1, 0);
  var itemLocation = itemEntity.getLocation();
  var direction = playerLocation.subtract(itemLocation.toVector()).toVector();
  itemEntity.setVelocity(direction.normalize().multiply(1.7));
  return itemEntity;
};

// 发送捕获消息与音效
globalThis.WT_sendCatchMessageAndSound = function (player, itemstack) {
  var meta = itemstack.getItemMeta();
  var displayName = meta ? meta.getDisplayName() : "";
  if (!displayName || displayName === "") {
    displayName = itemstack.getType().name().toLowerCase().replace(/_/g, ' ');
    displayName = displayName.replace(/\b\w/g, function (l) { return l.toUpperCase(); });
  }
  player.sendMessage("§b恭喜你钓到了 " + displayName + " §b*1");
  player.playSound(player.getLocation(), "entity.experience_orb.pickup", 1.0, 1.0);
};

// 配置钓鱼事件
// cfg = {
//   rodId: "WT_BAIWEIDIAOGAN",
//   baits: { "鱼饵ID": 掉落列表, ... }   // 掉落列表元素为 { itemId, weight }
// }
globalThis.WT_setupFishing = function (cfg) {
  globalThis.onPlayerFish = function (event) {
    var caught = event.getCaught();
    var player = event.getPlayer();
    var hook = event.getHook();
    var State = event.getState();

    if (State != "CAUGHT_FISH" || caught === null) return;

    var itemInMainHand = player.getInventory().getItemInMainHand();
    var itemInOffHand = player.getInventory().getItemInOffHand();

    var sfItem_Main = getSfItemByItem(itemInMainHand);
    if (sfItem_Main === null || sfItem_Main.getId() != cfg.rodId) return;

    var sfItem_Off = getSfItemByItem(itemInOffHand);
    if (sfItem_Off === null) return;

    var baitId = sfItem_Off.getId();
    var drops = cfg.baits[baitId];
    if (drops === null || drops === undefined) return;

    event.setCancelled(true);
    WT_decreaseItemInWhichHand(itemInOffHand, 1);
    caught.remove();

    var selectedDrop = WT_selectRandomDrop(drops);
    if (!selectedDrop) return;
    var itemstack = WT_resolveItemStack(selectedDrop.itemId);
    if (!itemstack) return;
    itemstack.setAmount(1);
    WT_createDropItemAndEffects(hook, player, itemstack);
    WT_sendCatchMessageAndSound(player, itemstack);
  };
};
