import { Player, world } from "mojang-minecraft";

/**
 * Broadcast a message (or send it to a player)
 * @param {string} message Message to broadcast
 * @param {Player} player Player to send the message to
 * @example broadcastMessage('This message was sent to everyone!')
 */
export function broadcastMessage(message: string, player?: Player) {
    player ? player.runCommand(`tellraw @s ${JSON.stringify({ rawtext: [{ text: message }] })}`) : world.getDimension('overworld').runCommand(`tellraw @a ${JSON.stringify({ rawtext: [{ text: message }] })}`)
}