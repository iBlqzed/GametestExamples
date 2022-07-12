import { Entity, Player, world } from "mojang-minecraft"

/**
 * Get the gamemode of a player
 * @param {Player} player Player to get the gamemode of
 * @returns {"survival" | "creative" | "adventure" | "unknown"} The gamemode of the player
 */
export function getGamemode(player: Player): "survival" | "creative" | "adventure" | "unknown" {
    const sT = runCommand(`testfor @s[m=0]`, player).error
    if (!sT) return 'survival'
    const cT = runCommand(`testfor @s[m=1]`, player).error
    if (!cT) return 'creative'
    const aT = runCommand(`testfor @s[m=2]`, player).error
    if (!aT) return 'adventure'
    return 'unknown'
}

/**
 * Run a command!
 * @param {string} cmd Command to run
 * @param {Entity} executor Entity to run the command
 * @returns {{ error: boolean, data: any }} Whether or not the command errors, and command data
 */
function runCommand(cmd: string, executor?: Entity): { error: boolean, data: any } {
    try {
        let returnValue: any
        if (executor) returnValue = executor.runCommand(cmd)
        else returnValue = world.getDimension('overworld').runCommand(cmd)
        return { error: false, data: returnValue }
    } catch {
        return { error: true, data: undefined }
    }
}