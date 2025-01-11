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
    var location = player.getLocation();
    var x1 = location.getX();
    var y1 = location.getY();
    var z1 = location.getZ();
    
    if (offHandItem.getType() != org.bukkit.Material.FLINT_AND_STEEL) {
        player.sendMessage("您必须使用主手点烟且副手持有打火石！");
        return;
    }

    // 判断玩家主手中是否有物品，且该物品的数量大于0  
    if (itemInMainHand != null && itemInMainHand.getAmount() > 0 && offHandItem.getType() == org.bukkit.Material.FLINT_AND_STEEL) {
        var amount = 1;
        // 将玩家主手中的物品数量设置为已有物品数量 - 1，即消耗了一个物品 
        itemInMainHand.setAmount(itemInMainHand.getAmount() - amount);
        player.addPotionEffect(createPotionEffect(org.bukkit.potion.PotionEffectType.DAMAGE_RESISTANCE, 1200, 1, false));
        player.addPotionEffect(createPotionEffect(org.bukkit.potion.PotionEffectType.INCREASE_DAMAGE, 1200, 1, false));
        player.addPotionEffect(createPotionEffect(org.bukkit.potion.PotionEffectType.CONFUSION, 200, 0, false));

        const radius = 8;
        for (let y = -radius; y <= radius; y++) {
            for (let x = -radius; x <= radius; x++) {
                for (let z = -radius; z <= radius; z++) {
                    player.getWorld().spawnParticle(org.bukkit.Particle.CAMPFIRE_COSY_SMOKE, new org.bukkit.Location(player.getWorld(), x1 + x, y1 + y, z1 + z), 1);
                }
            }
        }

        // 使用正确的声音名称
        var soundName = "item.flintandsteel.use";

        // 播放声音，确保音量和音调参数在0到1之间
        player.getLocation().getWorld().playSound(player.getLocation(), soundName, 1.0, 1.0);
    }
}
