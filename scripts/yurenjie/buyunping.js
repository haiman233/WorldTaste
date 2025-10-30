const ItemStack = Java.type('org.bukkit.inventory.ItemStack');

function onUse(event) {
    var player = event.getPlayer();
    var location = player.getLocation();
    var world = player.getWorld();
    var yPosition = location.getY();
    
    if (yPosition < 192 || yPosition > 196) {
        player.sendMessage("§c您必须在云层(Y=192-196)才能使用捕云瓶！");
        return;
    }
    
    var inv = player.getInventory();
    var itemInMainHand = inv.getItemInMainHand();
    var offHandItem = inv.getItemInOffHand();
    if (offHandItem != null && SlimefunItem.getByItem(offHandItem) != null) {
        player.sendMessage("您必须使用主手捕云且副手不能持有粘液科技物品！");
        return;
    }
    
    // 判断玩家主手中是否有物品，且该物品的数量大于0
    if (itemInMainHand != null && itemInMainHand.getAmount() > 0) {
        var amount = 1;
        // 消耗一个捕云瓶
        itemInMainHand.setAmount(itemInMainHand.getAmount() - amount);
        inv.setItemInMainHand(itemInMainHand); // 更新主手物品
        
        // 根据天气决定掉落的云朵类型
        var dropItemId;
        if (world.isClearWeather()) {
            // 晴天掉落普通云朵
            dropItemId = "WT_CLOUD";
        } else {
            // 雨天(包括雷雨)掉落雷云
            dropItemId = "WT_THUNDERCLOUD";
        }
        
        // 掉落对应的云朵物品
        dropSfItem(dropItemId, world, location);
        
        // 发送提示消息
        var cloudType = dropItemId === "WT_CLOUD" ? "云朵" : "乌云";
        player.sendMessage("§b成功捕获了" + cloudType + "！");
        
        // 播放声音效果
        world.playSound(location, "entity.player.splash", 1.0, 1.0);
    }
}

// 使用aicao.js中的掉落机制来掉落Slimefun物品
function dropSfItem(itemId, world, location) {
    let slimefunItem = getSfItemById(itemId);
    if (slimefunItem) {
        let itemStack = new ItemStack(slimefunItem.getItem().getType());
        itemStack.setItemMeta(slimefunItem.getItem().getItemMeta());
        world.dropItemNaturally(location, itemStack);
    }
}