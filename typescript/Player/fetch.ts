import { Player, world } from "mojang-minecraft";

/**
 * Get a player class from a player's name or nameTag
 * @param {string} playerName The player's name or nameTag
 * @returns {Player} The player class
 */
export function fetch(playerName: string): Player {
    for (const player of world.getPlayers()) if ((player.name || player.nameTag) === playerName) return player
    return undefined
}