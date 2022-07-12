import { Player, world } from "mojang-minecraft";

/**
 * Get a player class from a player's name or nameTag
 * @param {string} playerName The player's name or nameTag
 * @returns {Player} The player class
 */
export function fetch(playerName) {
    for (const pL of world.getPlayers()) if ((pL.name || pL.nameTag) === playerName) return pL
    return undefined
}