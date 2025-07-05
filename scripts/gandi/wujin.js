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
        player.setFoodLevel(player.getFoodLevel() + 20);
        player.setSaturation(player.getSaturation() + 20);
        player.setExhaustion(player.getExhaustion() - 4);

        
        var nauseaEffect = org.bukkit.potion.PotionEffectType.HEAL;
        var confusionEffect = org.bukkit.potion.PotionEffectType.INSTANT_HEALTH;

        var effectType1 = (nauseaEffect != null) ? nauseaEffect : confusionEffect;

        // 检查是否存在 WIND_CHARGED 效果
        var windChargedEffect = org.bukkit.potion.PotionEffectType.WIND_CHARGED;

        // 添加效果
        player.addPotionEffect(createPotionEffect(effectType1, 200, 100, false));
        player.addPotionEffect(createPotionEffect(org.bukkit.potion.PotionEffectType.HERO_OF_THE_VILLAGE, 5000, 14, false));
        player.addPotionEffect(createPotionEffect(org.bukkit.potion.PotionEffectType.HEALTH_BOOST, 5000, 50, false));
        player.addPotionEffect(createPotionEffect(org.bukkit.potion.PotionEffectType.NIGHT_VISION, 5000, 0, false));
        player.addPotionEffect(createPotionEffect(org.bukkit.potion.PotionEffectType.SPEED, 5000, 2, false));
        player.addPotionEffect(createPotionEffect(org.bukkit.potion.PotionEffectType.WATER_BREATHING, 5000, 2, false));
        player.addPotionEffect(createPotionEffect(org.bukkit.potion.PotionEffectType.SATURATION, 1000, 0, false));
        player.addPotionEffect(createPotionEffect(org.bukkit.potion.PotionEffectType.REGENERATION, 2000, 14, false));
        player.addPotionEffect(createPotionEffect(org.bukkit.potion.PotionEffectType.LUCK, 5000, 14, false));

        // 如果服务器支持 WIND_CHARGED 效果，则添加
        if (windChargedEffect != null) {
            player.addPotionEffect(createPotionEffect(windChargedEffect, 5000, 50, false));
        }

        // 使用正确的声音名称
        var soundName = "entity.strider.eat";

        // 播放声音，确保音量和音调参数在0到1之间
        player.getLocation().getWorld().playSound(player.getLocation(), soundName, 1.0, 1.0);
    }
}