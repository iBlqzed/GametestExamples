import { Player, world } from "mojang-minecraft";

const commandPrefix = '?'
const adminTag = 'Admin'

export class Command {
    /**
     * Register a new command!
     * @param {{name: string,admin?: boolean,aliases?: string[]}} registerInfo Register info for the command
     * @param {(data: { player: Player, args: string[] }) => void} callback Code to run when the command is called for
     */
    constructor(registerInfo, callback) {
        Command.registeredCommands.push({
            name: registerInfo.name.toLowerCase(),
            aliases: registerInfo.aliases?.map(a => a.toLowerCase()),
            admin: registerInfo.admin ?? undefined,
            callback
        })
    }
}
Command.registeredCommands = []

world.events.beforeChat.subscribe(data => {
    if (data.message.startsWith(commandPrefix)) {
        data.cancel = true
        const args = data.message.slice(commandPrefix.length).split(/\s+/g)
        const command = args.shift().toLowerCase()
        const commandData = Command.registeredCommands.find(cmd => cmd.name === command || cmd.aliases?.includes(command))
        if (!commandData) return broadcastMessage(`§cInvalid command!`, data.sender)
        if (commandData.admin && !data.sender.hasTag(adminTag)) return broadcastMessage(`§cYou do not have permission to run that command!`, data.sender)
        return commandData.callback({ player: data.sender, args })
    }
})

/**
 * Broadcast a message (or send it to a player)
 * @param {string} message Message to broadcast
 * @param {Player} player Player to send the message to
 * @example broadcastMessage('This message was sent to everyone!')
 */
function broadcastMessage(message, player = null) {
    player ? player.runCommand(`tellraw @s ${JSON.stringify({ rawtext: [{ text: message }] })}`) : world.getDimension('overworld').runCommand(`tellraw @a ${JSON.stringify({ rawtext: [{ text: message }] })}`)
}