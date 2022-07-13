import { ItemStack, ItemEnchantsComponent, EnchantmentType } from "mojang-minecraft";

/**
 * Remove an enchantment from an item
 * @param {ItemStack} item Item to remove the enchant from
 * @param {EnchantmentType} enchant EnchantType to remove fro the item
 * @example removeEnchant(new ItemStack(Items.get('minecraft:diamond_sword')), MinecraftEnchantmentTypes.sharpness)
 */
export function removeEnchant(item, enchant) {
    /**
     * @type {ItemEnchantsComponent} The enchantment component of the item
     */
    const eC = item.getComponent('enchantments'), eL = eC.enchantments
    eL.removeEnchantment(enchant)
    eC.enchantments = eL
}