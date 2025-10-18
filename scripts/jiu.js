// 生成 1~12 的随机整数
function randomFood() {
    return Math.floor(Math.random() * 12) + 1;
}

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
        player.sendMessage("您必须使用主手进食且副手不能持有粘液科技物品！");
        return;
    }

    if (itemInMainHand != null && itemInMainHand.getAmount() > 0) {
        var amount = 1;
        itemInMainHand.setAmount(itemInMainHand.getAmount() - amount);

        // 随机恢复 1~12 点饥饿值
        var foodToAdd = randomFood();
        player.setFoodLevel(player.getFoodLevel() + foodToAdd);
        player.setExhaustion(player.getExhaustion() - 2);

        var nauseaEffect = org.bukkit.potion.PotionEffectType.NAUSEA;
        var confusionEffect = org.bukkit.potion.PotionEffectType.CONFUSION;
        var effectType = (nauseaEffect != null) ? nauseaEffect : confusionEffect;

        player.addPotionEffect(createPotionEffect(effectType, 1000, 1, false));
        player.addPotionEffect(createPotionEffect(org.bukkit.potion.PotionEffectType.ABSORPTION, 1200, 2, false));

        var soundName = "entity.generic.drink";
        player.getLocation().getWorld().playSound(player.getLocation(), soundName, 1.0, 1.0);
    }
}