import { EnchantmentType, EntityInventoryComponent, ItemEnchantsComponent, ItemStack, MinecraftEnchantmentTypes, world } from "mojang-minecraft";

let change = false

world.events.tick.subscribe(({ currentTick }) => {
    if (currentTick % 2 !== 0) return
    const players = world.getPlayers()
    for (const player of players) {
        const inv = (<EntityInventoryComponent>player.getComponent('inventory')).container, { size } = inv
        for (let i = 0; i < size; i++) {
            const item = inv.getItem(i)
            if (!item) continue
            const enchList = (<ItemEnchantsComponent>item.getComponent('enchantments')).enchantments
            for (const ench in MinecraftEnchantmentTypes) {
                const itemEnch = enchList.getEnchantment(MinecraftEnchantmentTypes[ench])
                if (!itemEnch) continue
                if (enchList.slot === 0) if (!enchList.canAddEnchantment(itemEnch)) {
                    removeEnchant(item, itemEnch.type)
                    change = true
                }
                if (itemEnch.level > itemEnch.type.maxLevel) {
                    removeEnchant(item, itemEnch.type)
                    change = true
                }
            }
            if (!change) continue
            inv.setItem(i, item)
            change = false
        }
    }
})

/**
 * Remove an enchantment from an item
 * @param {ItemStack} item Item to remove the enchant from
 * @param {EnchantmentType} enchant EnchantType to remove fro the item
 * @example removeEnchant(new ItemStack(Items.get('minecraft:diamond_sword')), MinecraftEnchantmentTypes.sharpness)
 */
function removeEnchant(item: ItemStack, enchant: EnchantmentType) {
    const eC = item.getComponent('enchantments') as ItemEnchantsComponent, eL = eC.enchantments
    eL.removeEnchantment(enchant)
    eC.enchantments = eL
}