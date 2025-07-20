function onEat(event, player, itemStack) { 
    var player = event.getPlayer();

    player.setFoodLevel(player.getFoodLevel() + 6);
    player.setSaturation(player.getSaturation() + 6);
    player.setExhaustion(player.getExhaustion() - 1.5);


}