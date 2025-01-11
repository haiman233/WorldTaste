// 检查物品是否为辐射物品
function isRadioactiveItem(item) {
    // 这里需要您根据实际情况来定义辐射物品的检查逻辑
    return true; 
}

// 检查物品是否为粘液物品
function isSlimeItem(item) {
    // 这里需要您根据实际情况来定义粘液物品的检查逻辑
    return true; 
}

// 检查物品是否为原版物品
function isVanillaItem(item) {
    // 这里需要您根据实际情况来定义原版物品的检查逻辑
    return true;
}

// 播放声音
function playSound(player, sound) {
    playSound(player, sound, 1.0, 1.0);
}

function playSound(player, sound, volume, pitch) {
    player.getLocation().getWorld().playSound(player.getLocation(), sound, volume, pitch);
}

// 消耗物品
function consumeItem(itemStack, consume) {
    if (itemStack == null) {
        return;
    }

    // 修改物品数量
    // 新数量 = 原数量 - 消耗数量
    itemStack.setAmount(itemStack.getAmount() - consume);

    // 防止物品数量小于 0
    if (itemStack.getAmount() <= 0) {
        itemStack.setAmount(0); // 设置为0，材质会变为AIR
    }
}

// 创建药水效果
function potionEffect(type, duration, amplifier) {
    return new org.bukkit.potion.PotionEffect(type, duration, amplifier);
}

// 添加药水效果
function addPotionEffect(player, effect) {
    player.addPotionEffect(effect);
}

function addPotionEffect(player, effect, force) {
    player.addPotionEffect(effect, force);
}

// 增加饥饿值
function addFoodLevel(player, amount) {
    player.setFoodLevel(player.getFoodLevel() + amount);
}

// 增加生命值
function addHealth(player, amount) {
    player.setHealth(player.getHealth() + amount);
}

// 使用物品的事件处理器
function onUse(event) { 
    var player = event.getPlayer();
    var mainHandItem = player.getInventory().getItemInMainHand();
    var offHandItem = player.getInventory().getItemInOffHand();

    var material_air = org.bukkit.Material.AIR;

    if (mainHandItem == null || mainHandItem.getType() == material_air) {
        player.sendMessage("您的主手必须持有物品！");
        return;
    }

    if (offHandItem == null || offHandItem.getType() == material_air) {
        player.sendMessage("您的副手必须持有物品！");
        return;
    }

    var sfItem_ironDust = SlimefunItem.getById("WT_FUSHI");
    if (sfItem_ironDust == null) {
        player.sendMessage("无法找到辅食丸！");
        return;
    }

    var targetItem=sfItem_ironDust.getItem();
    if(!SlimefunUtils.isItemSimilar(offHandItem, targetItem, true, false)){
        player.sendMessage("您必须在您的副手持有辅食丸时才能食用!");
        return;
    }

    var ironDust = sfItem_ironDust.getItem();
    var soundName = "entity.strider.eat";
    var consume = 1; // 消耗的物品数量

    if (isVanillaItem(mainHandItem)) {
        consumeItem(mainHandItem, consume);
        if (mainHandItem.getAmount() <= 0) {
            player.getInventory().setItemInMainHand(null);
        }

        addFoodLevel(player, 2);
        player.getLocation().getWorld().playSound(player.getLocation(), soundName, 1.0, 1.0);
    }
}