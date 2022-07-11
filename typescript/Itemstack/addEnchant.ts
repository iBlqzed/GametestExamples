import { ItemStack, ItemEnchantsComponent, Enchantment } from "mojang-minecraft";

/**
 * Add an enchantment to an item
 * @param {ItemStack} item Item to add the enchant on
 * @param {Enchantment} enchant Enchant to add to the item
 * @returns {boolean} Whether or not the enchantment was added successfully
 */
export function addEnchant(item: ItemStack, enchant: Enchantment): boolean {
    const enchComp = item.getComponent('enchantments') as ItemEnchantsComponent, enchantList = enchComp.enchantments
    const returnValue = enchantList.addEnchantment(enchant)
    enchComp.enchantments = enchantList
    return returnValue
}