import { ItemStack, ItemEnchantsComponent, EnchantmentType } from "mojang-minecraft";

/**
 * Remove an enchantment from an item
 * @param {ItemStack} item Item to remove the enchant from
 * @param {EnchantmentType} enchant EnchantType to remove fro the item
 */
export function removeEnchant(item, enchant) {
    /**
     * @type {ItemEnchantsComponent} The enchantment component of the item
     */
    const enchComp = item.getComponent('enchantments'), enchantList = enchComp.enchantments
    enchantList.removeEnchantment(enchant)
    enchComp.enchantments = enchantList
}