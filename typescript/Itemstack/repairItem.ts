import { Items, ItemStack } from "mojang-minecraft"

/**
 * Repair an item
 * @param {ItemStack} item Item to repair
 * @returns {ItemStack} A repaired item
 */
function repairItem(item: ItemStack): ItemStack {
    const newItem = new ItemStack(Items.get(item.id), item.amount, item.data)
    newItem.nameTag = item.nameTag
    newItem.getComponents = item.getComponents
    newItem.setLore(item.getLore())
    newItem.getComponent('enchantments').enchantments = item.getComponent('enchantments').enchantments
    return newItem
}