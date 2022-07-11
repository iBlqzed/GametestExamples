import { ItemStack, ItemEnchantsComponent, Enchantment } from "mojang-minecraft";

/**
 * Add an enchantment to an item
 * @param {ItemStack} item Item to add the enchant on
 * @param {Enchantment} enchant Enchant to add to the item
 * @returns {boolean} Whether or not the enchantment was added successfully
 */
export function addEnchant(item, enchant) {
    /**
     * @type {ItemEnchantsComponent} The enchantment component of the item
     */
    const enchComp = item.getComponent('enchantments'), enchantList = enchComp.enchantments
    const returnValue = enchantList.addEnchantment(enchant)
    enchComp.enchantments = enchantList
    return returnValue
}