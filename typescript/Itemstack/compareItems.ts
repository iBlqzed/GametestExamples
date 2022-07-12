import { ItemStack } from "mojang-minecraft"

/**
 * Compare two items
 * @param {ItemStack} item1 Item to test with
 * @param {ItemStack} item2 Other item to test with
 * @returns {boolean} Whether or not the items are the same
 * @example ```ts
 * const item1 = new ItemStack(Items.get('minecraft:air'))
 * const item2 = new ItemStack(Items.get('minecraft:air'))
 * 
 * console.warn(compareItems(item1, item2)) //Warns "true"
 * ```
 */
export function compareItems(item1: ItemStack, item2: ItemStack): boolean {
    if (item1?.id !== item2?.id) return false
    if (item1?.nameTag !== item2?.nameTag) return false
    if (item1?.amount !== item2?.amount) return false
    if (item1?.data !== item2?.data) return false
    if (JSON.stringify(item1?.getLore()) !== JSON.stringify(item2?.getLore())) return false
    return true
}