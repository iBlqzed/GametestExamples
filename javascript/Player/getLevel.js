import { Player } from "mojang-minecraft"

/**
 * Get a player's xp level
 * @param {Player} player Player to get the level of
 * @param {boolean} useZero Whether or not to use 0 or NaN if error
 * @returns {number} The player's level
 */
export function getLevel(player, useZero = false) {
    try {
        const level = player.runCommand(`xp 0 @s`).level
        try { player.runCommand(`stopsound random.levelup`) } catch { }
        return level
    } catch {
        return useZero ? 0 : NaN
    }
}