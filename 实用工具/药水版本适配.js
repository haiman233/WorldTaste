function createPotionEffect(type, duration, amplifier) {
    return createPotionEffect(type, duration, amplifier, false);
}

function createPotionEffect(type, duration, amplifier, ambient) {
    return new org.bukkit.potion.PotionEffect(type, duration, amplifier, ambient);
}

function onUse(event) { 
    var player = event.getPlayer();
    var inv = player.getInventory();
    var itemInMainHand = inv.getItemInMainHand();
    var offHandItem = inv.getItemInOffHand();

    if (player.getFoodLevel() >= 20) {
        return;
    }
    if (offHandItem != null && SlimefunItem.getByItem(offHandItem) != null) {
        player.sendMessage("您必须使用主手进食且副手不能有粘液物品！");
        return;
    }

    // 判断玩家主手中是否有物品，且该物品的数量大于0  
    if (itemInMainHand != null && itemInMainHand.getAmount() > 0) {
        var amount = 1;
        // 将玩家主手中的物品数量设置为已有物品数量 - 1，即消耗了一个物品 
        itemInMainHand.setAmount(itemInMainHand.getAmount() - amount);
        player.setFoodLevel(player.getFoodLevel() + 4);
        player.setSaturation(player.getSaturation() + 4);
        player.setExhaustion(player.getExhaustion() - 2);

        // 检查是否存在 NAUSEA 效果
        var nauseaEffect = org.bukkit.potion.PotionEffectType.NAUSEA;
        var confusionEffect = org.bukkit.potion.PotionEffectType.CONFUSION;

        var effectType = (nauseaEffect != null) ? nauseaEffect : confusionEffect;

        player.addPotionEffect(createPotionEffect(effectType, 1000, 1, false));
        player.addPotionEffect(createPotionEffect(org.bukkit.potion.PotionEffectType.ABSORPTION , 1200, 2, false));

        // 使用正确的声音名称
        var soundName = "entity.strider.eat";

        // 播放声音，确保音量和音调参数在0到1之间
        player.getLocation().getWorld().playSound(player.getLocation(), soundName, 1.0, 1.0);
    }
}