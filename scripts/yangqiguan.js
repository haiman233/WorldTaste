function onUse(event) { 
    var player = event.getPlayer();
    var inv = player.getInventory();
    var itemInMainHand = inv.getItemInMainHand();
    var offHandItem = inv.getItemInOffHand();
    
    if (offHandItem != null && SlimefunItem.getByItem(offHandItem) != null) {
        player.sendMessage("您必须通过主手使用废弃的氧气罐且副手不能持有粘液科技物品！");
        return;
    }

    // 判断玩家主手中是否有物品，且该物品的数量大于0  
    if (itemInMainHand != null && itemInMainHand.getAmount() > 0) {
        var amount = 1;
        // 将玩家主手中的物品数量设置为已有物品数量 - 1，即消耗了一个物品 
        itemInMainHand.setAmount(itemInMainHand.getAmount() - amount);
        player.setRemainingAir(player.getRemainingAir() + 300);
        player.sendMessage("成功使用！");

        // 使用正确的声音名称
        var soundName = "entity.generic.drink";

        // 播放声音，确保音量和音调参数在0到1之间
        player.getLocation().getWorld().playSound(player.getLocation(), soundName, 1.0, 1.0);
    }
}