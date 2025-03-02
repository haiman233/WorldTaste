function onEat(event, player, itemStack) { 
    var player = event.getPlayer();

    player.setFoodLevel(player.getFoodLevel() + 1);
    player.setSaturation(player.getSaturation() + 2);
    player.setExhaustion(player.getExhaustion() - 1);


}