function onPlayerFish(event) {
    var caught = event.getCaught();
    var player = event.getPlayer();
    var hook = event.getHook();
    var State = event.getState();

    // 获取主手和副手的物品
    var itemInMainHand = player.getInventory().getItemInMainHand();
    var itemInOffHand = player.getInventory().getItemInOffHand();
    var sfItem_Main = getSfItemByItem(itemInMainHand);
    var sfItem_Off = getSfItemByItem(itemInOffHand);

    if (caught !== null && sfItem_Main !== null && sfItem_Off !== null) {
        var sfItem_Main_id = sfItem_Main.getId();
        var sfItem_Off_id = sfItem_Off.getId();

        // 使用特定鱼竿
        if (State == "CAUGHT_FISH" && sfItem_Main_id == "WT_BAIWEIDIAOGAN") {
            // 取消事件防止默认行为
            event.setCancelled(true);
            // 删除被捕获的实体
            let amount = 1;
            decreaseItemInWhichHand(itemInOffHand, amount);
            caught.remove();

            // 根据鱼饵类型选择掉落列表
            let drops;
            if (sfItem_Off_id == "WT_DANSHUIYUER") {
                // 淡水鱼饵
                drops = [
                    { itemId: "WT_SHUIZHI", probability: 0.5 },
                    { itemId: "WT_OUZHOULUYU", probability: 0.2 },
                    { itemId: "WT_NIANYU", probability: 0.4 },
                    { itemId: "WT_BINGYU", probability: 0.2 },
                    { itemId: "WT_ZHANYU", probability: 0.5 },
                    { itemId: "WT_JINYU", probability: 0.52 },
                    { itemId: "WT_SHILAIMUYU", probability: 0.04 },
                    { itemId: "WT_LONGXIA", probability: 0.25 },
                    { itemId: "WT_LANLONGXIA", probability: 0.115 },
                    { itemId: "WT_YNSHUIMU", probability: 0.1 },
                    { itemId: "WT_YADAN", probability: 0.12 },
                    { itemId: "WT_WUGUI", probability: 0.06 },
                    { itemId: "WT_HEXIA", probability: 0.6 },
                    { itemId: "WT_FEIQIYANGQIGUAN", probability: 0.2 },
                    { itemId: "WT_SHIDIFUYU", probability: 0.03 },
                    { itemId: "WT_JINGDIANYU", probability: 0.3 },
                    { itemId: "WT_SHUIJINGYU", probability: 0.08 },
                    { itemId: "WT_YOUNIYU", probability: 0.2 },
                    { itemId: "WT_ZUANSHIHETUN", probability: 0.009 }
                ];
            } else if (sfItem_Off_id == "WT_XIANSHUIYUER") {
                // 咸水鱼饵
                drops = [
                    { itemId: "WT_SHAYU", probability: 0.01 },
                    { itemId: "WT_NIANYUWANG", probability: 0.08 },
                    { itemId: "WT_HUANGQIJINQIANGYU", probability: 0.4 },
                    { itemId: "WT_JINXUEYU", probability: 0.2 },
                    { itemId: "WT_SHUIDIYU", probability: 0.35 },
                    { itemId: "WT_JINGYU", probability: 0.01 },
                    { itemId: "WT_ZHANGYU", probability: 0.05 },
                    { itemId: "WT_JUSHI", probability: 0.3 },
                    { itemId: "WT_HAIXING", probability: 0.4 },
                    { itemId: "WT_RUANTIDONGWU", probability: 0.3 },
                    { itemId: "WT_BEIKE", probability: 0.2 },
                    { itemId: "WT_YINGWULUO", probability: 0.18 },
                    { itemId: "WT_LANJING", probability: 0.009 },
                    { itemId: "WT_POJIUDEYUWANG", probability: 0.22 },
                    { itemId: "WT_PIPAYU", probability: 0.15 },
                    { itemId: "WT_HAIOU", probability: 0.3 },
                    { itemId: "WT_HAIDAN", probability: 0.4 },
                    { itemId: "WT_TENGFHU", probability: 0.45 },
                    { itemId: "WT_HAIKUI", probability: 0.38 },
                    { itemId: "WT_JIJUXIE", probability: 0.26 },
                    { itemId: "WT_HAIZHE", probability: 0.3 },
                    { itemId: "WT_SHSHUIMU", probability: 0.32 },
                    { itemId: "WT_HAIMIANBAOBAO", probability: 0.02 },
                    { itemId: "WT_SHIDAN", probability: 0.2 },
                    { itemId: "WT_HAILUO", probability: 0.35 }
                ];
            } else if (sfItem_Off_id == "WT_SHUIGUOYUER") {
                // 水果鱼饵
                drops = [
                    { itemId: "WT_YINGTAOYU", probability: 0.5 },
                    { itemId: "WT_BOLUOYU", probability: 0.45 },
                    { itemId: "WT_LANMEIYU", probability: 0.45 },
                    { itemId: "WT_PUTAOYU", probability: 0.45 },
                    { itemId: "WT_HUANGGUAYU", probability: 0.45 },
                    { itemId: "WT_HULUOBOYU", probability: 0.45 },
                    { itemId: "WT_TIANCAIYU", probability: 0.45 },
                    { itemId: "WT_XIAOMAIYU", probability: 0.55 },
                    { itemId: "WT_XIGUAYU", probability: 0.55 },
                    { itemId: "WT_TUDOUYU", probability: 0.55 },
                    { itemId: "WT_YUNDUOYU", probability: 0.1 },
                    { itemId: "WT_HAIZEIWANGYU", probability: 0.18 },
                    { itemId: "WT_XIGUASHAYU", probability: 0.01 },
                    { itemId: "WT_NANGUAZZ", probability: 0.35 }
                ];
            } else {
                // 如果鱼饵类型不匹配，直接返回
                return;
            }

            // 根据概率随机选择一个物品
            const selectedDrop = selectRandomDrop(drops);
            if (selectedDrop) {
                const slimefunItem = getSfItemById(selectedDrop.itemId);
                if (slimefunItem) {
                    const itemstack = new org.bukkit.inventory.ItemStack(slimefunItem.getItem().getType());
                    itemstack.setItemMeta(slimefunItem.getItem().getItemMeta());
                    itemstack.setAmount(1);

                    var itemEntity = hook.getWorld().dropItem(hook.getLocation(), itemstack);

                    // 设置物品不会被立即捡起（10 ticks = 0.5秒）
                    itemEntity.setPickupDelay(2);

                    // 将物品拉向玩家（可选增强效果）
                    var playerLocation = player.getLocation().add(0, 1, 0);
                    var itemLocation = itemEntity.getLocation();
                    var direction = playerLocation.subtract(itemLocation.toVector()).toVector();
                    itemEntity.setVelocity(direction.normalize().multiply(1.7));

                    sendMessage(player, "§b恭喜你钓到了 " + itemstack.getItemMeta().getDisplayName() + " §b*1");

                    // 发送音效反馈
                    player.playSound(player.getLocation(), "entity.experience_orb.pickup", 1.0, 1.0);
                }
            }
        }
    }
}

// 减少物品
function decreaseItemInWhichHand(itemInWhich, amount) {
    itemInWhich.setAmount(itemInWhich.getAmount() - amount);
}

// 根据概率随机选择一个物品
function selectRandomDrop(drops) {
    // 计算总概率
    let totalProbability = drops.reduce((sum, drop) => sum + drop.probability, 0);

    // 生成一个随机数
    let random = Math.random() * totalProbability;

    // 遍历掉落列表，选择一个物品
    for (let drop of drops) {
        random -= drop.probability;
        if (random <= 0) {
            return drop;
        }
    }

    // 如果没有选中任何物品（理论上不会发生），返回 null
    return null;
}