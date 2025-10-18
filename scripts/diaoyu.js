// 淡水鱼饵掉落列表（全局常量，避免重复创建）
const DANSHUIYUER_DROPS = [
    { itemId: "LILY_PAD", weight: 10 },
    { itemId: "TADPOLE_BUCKET", weight: 20 },
    { itemId: "AXOLOTL_BUCKET", weight: 20 },
    { itemId: "SALMON", weight: 60 },
    { itemId: "PUFFERFISH", weight: 40 },
    { itemId: "GN_RAW_TROUT", weight: 30 },
    { itemId: "GN_RAW_BASS", weight: 15 },
    { itemId: "GN_RAW_CARP", weight: 12 },
    { itemId: "GN_SHRIMP", weight: 15 },
    { itemId: "WT_SHUIZHI", weight: 54 },
    { itemId: "WT_OUZHOULUYU", weight: 20 },
    { itemId: "WT_NIANYU", weight: 40 },
    { itemId: "WT_BINGYU", weight: 20 },
    { itemId: "WT_ZHANYU", weight: 50 },
    { itemId: "WT_JINYU", weight: 30 },
    { itemId: "WT_SHILAIMUYU", weight: 4 },
    { itemId: "WT_LONGXIA", weight: 25 },
    { itemId: "WT_LANLONGXIA", weight: 10 },
    { itemId: "WT_YNSHUIMU", weight: 8 },
    { itemId: "WT_YADAN", weight: 15 },
    { itemId: "WT_WUGUI", weight: 10 },
    { itemId: "WT_HEXIA", weight: 60 },
    { itemId: "WT_FEIQIYANGQIGUAN", weight: 20 },
    { itemId: "WT_SHIDIFUYU", weight: 3 },
    { itemId: "WT_JINGDIANYU", weight: 30 },
    { itemId: "WT_SHUIJINGYU", weight: 8 },
    { itemId: "WT_YOUNIYU", weight: 20 },
    { itemId: "WT_ZUANSHIHETUN", weight: 1 },
    { itemId: "WT_JINLI", weight: 5 },
    { itemId: "WT_SHUIPAOJINYU", weight: 20 },
    { itemId: "WT_EYU", weight: 4 },
    { itemId: "WT_HUOLIENIAO", weight: 1 },
    { itemId: "WT_HELI", weight: 10 }
];

// 小型咸水鱼饵掉落列表
const XIANSHUIYUER_DROPS = [

    { itemId: "SEAGRASS", weight: 5 },
    { itemId: "SEA_PICKLE", weight: 10 },
    { itemId: "KELP", weight: 10 },
    { itemId: "COD", weight: 50 },
    { itemId: "TROPICAL_FISH", weight: 30 },
    { itemId: "GN_RAW_TUNA", weight: 20 },
    { itemId: "GN_RAW_SQUID", weight: 15 },
    { itemId: "GN_CRAB", weight: 20 },
    { itemId: "WT_HUANGQIJINQIANGYU", weight: 42 },
    { itemId: "WT_JUSHI", weight: 30 },
    { itemId: "WT_HAIXING", weight: 40 },
    { itemId: "WT_RUANTIDONGWU", weight: 30 },
    { itemId: "WT_BEIKE", weight: 20 },
    { itemId: "WT_HAIOU", weight: 5 },
    { itemId: "WT_HAIDAN", weight: 40 },
    { itemId: "WT_TENGFHU", weight: 45 },
    { itemId: "WT_HAIKUI", weight: 38 },
    { itemId: "WT_JIJUXIE", weight: 26 },
    { itemId: "WT_HAIZHE", weight: 30 },
    { itemId: "WT_SHIDAN", weight: 20 },
    { itemId: "WT_HAILUO", weight: 35 },
    { itemId: "WT_CHENGZI", weight: 30 },
    { itemId: "WT_HUAJIAO", weight: 5 },
    { itemId: "WT_SHENGHAO", weight: 10 },
    { itemId: "WT_BAOYU", weight: 12 },
    { itemId: "WT_HAISHEN", weight: 15 },
    { itemId: "WT_TUXIA", weight: 20 },
    { itemId: "WT_SHACHONG", weight: 10 },
    { itemId: "WT_DAIYU", weight: 5 },
    { itemId: "WT_HAITU", weight: 15 }
];

// 大型咸水鱼饵掉落列表
const XIANSHUIYUER_2_DROPS = [
    { itemId: "NAUTILUS_SHELL", weight: 30 },
    { itemId: "HEART_OF_THE_SEA", weight: 10 },
    { itemId: "GN_GUARDIAN_FIN", weight: 15 },
    { itemId: "GN_RAW_MACKEREL", weight: 20 },
    { itemId: "GN_RAW_EEL", weight: 20 },
    { itemId: "GN_RAW_PIKE", weight: 20 },
    { itemId: "WT_SHAYU", weight: 1 },
    { itemId: "WT_NIANYUWANG", weight: 8 },
    { itemId: "WT_JINXUEYU", weight: 20 },
    { itemId: "WT_SHUIDIYU", weight: 35 },
    { itemId: "WT_JINGYU", weight: 1 },
    { itemId: "WT_ZHANGYU", weight: 5 },
    { itemId: "WT_YINGWULUO", weight: 30 },
    { itemId: "WT_LANJING", weight: 1 },
    { itemId: "WT_POJIUDEYUWANG", weight: 25 },
    { itemId: "WT_PIPAYU", weight: 15 },
    { itemId: "WT_SHSHUIMU", weight: 32 },
    { itemId: "WT_HAIMIANBAOBAO", weight: 2 },
    { itemId: "WT_NIUPIXUE", weight: 10 },
    { itemId: "WT_SHENHAISHILAIMU", weight: 12 },
    { itemId: "WT_HAIXIANG", weight: 5 },
    { itemId: "WT_HUOMAN", weight: 20 },
    { itemId: "WT_BQBFENSESHUIMU", weight: 25 },
    { itemId: "WT_DIWANGXIE", weight: 2 },
    { itemId: "WT_DONGYANGYU", weight: 15 },
    { itemId: "WT_PAOCAIGUO", weight: 25 }
];

// 水果鱼饵掉落列表
const SHUIGUOYUER_DROPS = [
    { itemId: "WT_YINGTAOYU", weight: 50 },
    { itemId: "WT_BOLUOYU", weight: 45 },
    { itemId: "WT_LANMEIYU", weight: 45 },
    { itemId: "WT_PUTAOYU", weight: 45 },
    { itemId: "WT_HUANGGUAYU", weight: 45 },
    { itemId: "WT_HULUOBOYU", weight: 45 },
    { itemId: "WT_TIANCAIYU", weight: 45 },
    { itemId: "WT_XIAOMAIYU", weight: 55 },
    { itemId: "WT_XIGUAYU", weight: 55 },
    { itemId: "WT_TUDOUYU", weight: 55 },
    { itemId: "WT_YUNDUOYU", weight: 10 },
    { itemId: "WT_HAIZEIWANGYU", weight: 5 },
    { itemId: "WT_XIGUASHAYU", weight: 1 },
    { itemId: "WT_NANGUAZZ", weight: 35 }
];

// 河豚鱼饵掉落列表
const HETUNYUER_DROPS = [
    { itemId: "WT_PUFFERFISH_NORMAL", weight: 55 },
    { itemId: "WT_PUFFERFISH_MECHANICAL", weight: 20 },
    { itemId: "WT_PUFFERFISH_BEE", weight: 20 },
    { itemId: "WT_PUFFERFISH_SLIME", weight: 12 },
    { itemId: "WT_PUFFERFISH_HIM", weight: 8 },
    { itemId: "WT_PUFFERFISH_MR", weight: 20 },
    { itemId: "WT_PUFFERFISH_LAVA", weight: 8 },
    { itemId: "WT_PUFFERFISH_RADIATION", weight: 8 },
    { itemId: "WT_PUFFERFISH_EMBER", weight: 10 },
    { itemId: "WT_PUFFERFISH_BIOHAZARD", weight: 12 },
    { itemId: "WT_PUFFERFISH_GLOW", weight: 13 },
    { itemId: "WT_PUFFERFISH_NEEDLEFISH", weight: 14 },
    { itemId: "WT_PUFFERFISH_GRASS_BLOCK", weight: 16 },
    { itemId: "WT_PUFFERFISH_SACRIFICE", weight: 9 },
    { itemId: "WT_PUFFERFISH_WHITE", weight: 25 },
    { itemId: "WT_PUFFERFISH_PINK", weight: 25 },
    { itemId: "WT_PUFFERFISH_RED", weight: 25 },
    { itemId: "WT_PUFFERFISH_ORANGE", weight: 25 },
    { itemId: "WT_PUFFERFISH_YELLOW", weight: 25 },
    { itemId: "WT_PUFFERFISH_YELLOW_GREEN", weight: 25 },
    { itemId: "WT_PUFFERFISH_CYAN", weight: 25 },
    { itemId: "WT_PUFFERFISH_LIGHT_BLUE", weight: 25 },
    { itemId: "WT_PUFFERFISH_PURPLE", weight: 25 },
    { itemId: "WT_PUFFERFISH_MAGENTA", weight: 25 },
    { itemId: "WT_PUFFERFISH_BROWN", weight: 25 },
    { itemId: "WT_PUFFERFISH_CARROT", weight: 20 },
    { itemId: "WT_PUFFERFISH_AMETHYST", weight: 16 },
    { itemId: "WT_PUFFERFISH_EMERALD", weight: 4 },
    { itemId: "WT_ZUANSHIHETUN", weight: 5 },
    { itemId: "WT_PUFFERFISH_GOLD", weight: 6 }
];

function onPlayerFish(event) {
    var caught = event.getCaught();
    var player = event.getPlayer();
    var hook = event.getHook();
    var State = event.getState();

    // 提前检查是否为需要处理的事件类型
    if (State != "CAUGHT_FISH" || caught === null) {
        return;
    }

    // 获取主手和副手的物品
    var itemInMainHand = player.getInventory().getItemInMainHand();
    var itemInOffHand = player.getInventory().getItemInOffHand();
    
    // 提前检查是否使用特定鱼竿
    var sfItem_Main = getSfItemByItem(itemInMainHand);
    if (sfItem_Main === null || sfItem_Main.getId() != "WT_BAIWEIDIAOGAN") {
        return;
    }
    
    var sfItem_Off = getSfItemByItem(itemInOffHand);
    if (sfItem_Off === null) {
        return;
    }

    var sfItem_Off_id = sfItem_Off.getId();

    // 使用特定鱼竿
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
        drops = DANSHUIYUER_DROPS;
    } else if (sfItem_Off_id == "WT_XIANSHUIYUER") {
        // 小型咸水鱼饵
        drops = XIANSHUIYUER_DROPS;
    } else if (sfItem_Off_id == "WT_XIANSHUIYUER_2") {
        // 大型咸水鱼饵
        drops = XIANSHUIYUER_2_DROPS;
    } else if (sfItem_Off_id == "WT_SHUIGUOYUER") {
        // 水果鱼饵
        drops = SHUIGUOYUER_DROPS;
    } else if (sfItem_Off_id == "WT_HETUNYUER") {
        // 河豚鱼饵
        drops = HETUNYUER_DROPS;
    } else {
        // 如果鱼饵类型不匹配，直接返回
        return;
    }


    // 根据权重随机选择一个物品
    const selectedDrop = selectRandomDrop(drops);
    if (selectedDrop) {
        const slimefunItem = getSfItemById(selectedDrop.itemId);
        let itemstack;
        
        if (slimefunItem) {
            // 处理Slimefun物品
            itemstack = new org.bukkit.inventory.ItemStack(slimefunItem.getItem().getType());
            itemstack.setItemMeta(slimefunItem.getItem().getItemMeta());
        } else {
            // 如果Slimefun物品不存在，则尝试作为原版物品处理
            try {
                const Material = Java.type('org.bukkit.Material');
                const materialType = Material.valueOf(selectedDrop.itemId);
                itemstack = new org.bukkit.inventory.ItemStack(materialType);
            } catch (e) {
                return;
            }
        }
        
        itemstack.setAmount(1);
        createDropItemAndEffects(hook, player, itemstack);
        sendCatchMessageAndSound(player, itemstack);
    }
}




// 减少物品
function decreaseItemInWhichHand(itemInWhich, amount) {
    itemInWhich.setAmount(itemInWhich.getAmount() - amount);
}

// 根据权重随机选择一个物品
function selectRandomDrop(drops) {
    // 计算总权重
    let totalWeight = drops.reduce((sum, drop) => sum + drop.weight, 0);

    // 生成一个随机数
    let random = Math.random() * totalWeight;

    // 遍历掉落列表，选择一个物品
    for (let drop of drops) {
        random -= drop.weight;
        if (random <= 0) {
            return drop;
        }
    }

    // 如果没有选中任何物品（理论上不会发生），返回 null
    return null;
}

function sendCatchMessageAndSound(player, itemstack) {
    let displayName = itemstack.getItemMeta().getDisplayName();
    // 如果没有显示名称，则使用物品类型名称
    if (!displayName || displayName === "") {
        displayName = itemstack.getType().name().toLowerCase().replace(/_/g, ' ');
        // 首字母大写格式化
        displayName = displayName.replace(/\b\w/g, function(l) { return l.toUpperCase(); });
    }
    sendMessage(player, "§b恭喜你钓到了 " + displayName + " §b*1");
    player.playSound(player.getLocation(), "entity.experience_orb.pickup", 1.0, 1.0);
}


function createDropItemAndEffects(hook, player, itemstack) {
    var itemEntity = hook.getWorld().dropItem(hook.getLocation(), itemstack);
    
    // 设置物品不会被立即捡起（10 ticks = 0.5秒）
    itemEntity.setPickupDelay(2);
    
    // 将物品拉向玩家（可选增强效果）
    var playerLocation = player.getLocation().add(0, 1, 0);
    var itemLocation = itemEntity.getLocation();
    var direction = playerLocation.subtract(itemLocation.toVector()).toVector();
    itemEntity.setVelocity(direction.normalize().multiply(1.7));
    
    return itemEntity;
}