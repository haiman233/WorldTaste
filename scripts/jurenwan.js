let Entity_type = org.bukkit.entity.EntityType.GIANT;

let customName = "§2§l巨人丸"; // 自定义名称
const ARTIFICIAL_ENTITIES = [
  { id: "WT_JURENWAN", entityType: Java.type('org.bukkit.entity.EntityType').GIANT, customName: "§2§l巨人丸" },

];

function onUse(event, itemStack) {

  let player = event.getPlayer();
  if(event.getHand() !== org.bukkit.inventory.EquipmentSlot.HAND){
    player.sendMessage("请主手持有相应物品");
    return;
  }
  
  var onUseItem = event.getItem();
  var itemStack = getSfItemByItem(onUseItem);
  var sfitemid = itemStack.getId();
  // 查找匹配的人造实体配置
  let entityConfig = ARTIFICIAL_ENTITIES.find(entity => entity.id === sfitemid);

  if (entityConfig) {
    // 如果找到匹配项，则应用对应的 entityType 和 customName
    var Entity_type = entityConfig.entityType;

  } else {
    return;
  }
  

  
  let item = event.getItem();
  item.setAmount(item.getAmount() - 1);
  
  let block = player.getTargetBlock(null, 5);
  let location = block.getLocation().add(0, 1, 0); 
  let world = location.getWorld();

  let entity = world.spawnEntity(location, Entity_type);
  
}