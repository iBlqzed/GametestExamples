import { ItemStack, ItemEnchantsComponent, EnchantmentType } from "mojang-minecraft";

/**
 * Remove an enchantment from an item
 * @param {ItemStack} item Item to remove the enchant from
 * @param {EnchantmentType} enchant EnchantType to remove fro the item
 */
export function removeEnchant(item: ItemStack, enchant: EnchantmentType) {
    const enchComp = item.getComponent('enchantments') as ItemEnchantsComponent, enchantList = enchComp.enchantments
    enchantList.removeEnchantment(enchant)
    enchComp.enchantments = enchantList
}