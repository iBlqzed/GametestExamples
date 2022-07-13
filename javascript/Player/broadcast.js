import { Player, world } from "mojang-minecraft";

/**
 * Broadcast a message (or send it to a player)
 * @param {string} message Message to broadcast
 * @param {Player|Player[]} player Player(s) to send the message to
 * @example broadcastMessage('This message was sent to everyone!')
 */
export function broadcastMessage(message, player = null) {
    !player ? world.getDimension('overworld').runCommand(`tellraw @a ${JSON.stringify({ rawtext: [{ text: message }] })}`) : player instanceof Player ? player.runCommand(`tellraw @a ${JSON.stringify({ rawtext: [{ text: message }] })}`) : player.forEach(pL => pL.runCommand(`tellraw @a ${JSON.stringify({ rawtext: [{ text: message }] })}`))
}
