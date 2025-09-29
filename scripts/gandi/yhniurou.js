function onEat(event, player, itemStack) { 
    var player = event.getPlayer();

    player.setFoodLevel(player.getFoodLevel() + 3);
    player.setSaturation(player.getSaturation() + 1.8);
    
    // 防止食物被消耗
    event.setCancelled(true);

}