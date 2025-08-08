function createPotionEffect(type, duration, amplifier, ambient = false) {
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
    
    // 检查副手是否持有打火石
    if (offHandItem == null || offHandItem.getType() != org.bukkit.Material.SHEARS) {
        player.sendMessage("您必须使用主手点烟且副手持有剪刀！");
        return;
    }

    // 判断玩家主手中是否有物品，且该物品的数量大于0  
    if (itemInMainHand != null && itemInMainHand.getAmount() > 0) {
        var amount = 1;
        // 将玩家主手中的物品数量设置为已有物品数量 - 1，即消耗了一个物品 
        itemInMainHand.setAmount(itemInMainHand.getAmount() - amount);
        offHandItem.setAmount(offHandItem.getAmount() - amount);
        inv.setItemInMainHand(itemInMainHand); // 更新主手物品

        // 添加药水效果
        player.addPotionEffect(createPotionEffect(org.bukkit.potion.PotionEffectType.ABSORPTION, 6000, 4));
        player.addPotionEffect(createPotionEffect(org.bukkit.potion.PotionEffectType.DOLPHINS_GRACE, 6000, 4));
        player.addPotionEffect(createPotionEffect(org.bukkit.potion.PotionEffectType.CONDUIT_POWER , 6000, 4));
        player.addPotionEffect(createPotionEffect(org.bukkit.potion.PotionEffectType.FIRE_RESISTANCE , 6000, 4));
        player.addPotionEffect(createPotionEffect(org.bukkit.potion.PotionEffectType.HUNGER, 800, 1));

      // 生成粒子效果
        const radius = 1;
        for (let x = -radius; x <= radius; x++) {
            for (let z = -radius; z <= radius; z++) {
                    player.getWorld().spawnParticle(org.bukkit.Particle.CAMPFIRE_COSY_SMOKE, new org.bukkit.Location(player.getWorld(), x1 + x, y1+1, z1 + z), 1);
            }
        }

        // 播放声音
        var soundName = "item.flintandsteel.use";
        player.getLocation().getWorld().playSound(player.getLocation(), soundName, 1.0, 1.0);
    }
}