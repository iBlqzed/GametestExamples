import { ItemStack, ItemEnchantsComponent, Enchantment } from "mojang-minecraft";

/**
 * Add an enchantment to an item
 * @param {ItemStack} item Item to add the enchant on
 * @param {Enchantment} enchant Enchant to add to the item
 * @returns {boolean} Whether or not the enchantment was added successfully
 * @example addEnchant(new ItemStack(Items.get('minecraft:diamond_sword')), new Enchantment(MinecraftEnchantmentTypes.sharpness, 5))
 */
export function addEnchant(item: ItemStack, enchant: Enchantment): boolean {
    const eC = item.getComponent('enchantments') as ItemEnchantsComponent, eL = eC.enchantments
    const rV = eL.addEnchantment(enchant)
    eC.enchantments = eL
    return rV
}