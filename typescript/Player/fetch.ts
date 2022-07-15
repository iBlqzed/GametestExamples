import { Player, world } from "mojang-minecraft";

/**
 * Get a player class from a player's name or nameTag
 * @param {string} playerName The player's name or nameTag
 * @returns {Player|undefined} The player class
 * @example fetch("iBlqzed") //Returns the player class of the person named "iBlqzed"
 */
export function fetch(playerName: string): Player | undefined {
    for (const pL of world.getPlayers()) if ((pL.name || pL.nameTag) === playerName) return pL
    return undefined
}