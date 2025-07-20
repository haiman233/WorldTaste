function createPotionEffect(type, duration, amplifier) {
    return createPotionEffect(type, duration, amplifier, false);
}

function createPotionEffect(type, duration, amplifier, ambient) {
    return new org.bukkit.potion.PotionEffect(type, duration, amplifier, ambient);
}


function onEat(event, player, itemStack) { 
    var player = event.getPlayer();

    player.setFoodLevel(player.getFoodLevel() + 6);
    player.setSaturation(player.getSaturation() + 6);
    player.setExhaustion(player.getExhaustion() - 1.5);
    player.addPotionEffect(createPotionEffect(org.bukkit.potion.PotionEffectType.ABSORPTION , 5000, 6, false));
    player.addPotionEffect(createPotionEffect(org.bukkit.potion.PotionEffectType.REGENERATION, 5000, 6, false));
    player.addPotionEffect(createPotionEffect(org.bukkit.potion.PotionEffectType.FIRE_RESISTANCE, 5000, 6, false));


}