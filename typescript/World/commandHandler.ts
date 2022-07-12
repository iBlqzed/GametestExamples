import { Player, world } from "mojang-minecraft";

const commandPrefix = '?'
const adminTag = 'Admin'

export class Command {
    static readonly registeredCommands: commandData[] = []
    /**
     * Register a new command!
     * @param {commandInfo} registerInfo Register info for the command
     * @param {(data: { player: Player, args: string[] }) => void} callback Code to run when the command is called for
     */
    constructor(registerInfo: commandInfo, callback: (data: { player: Player, args: string[] }) => void) {
        Command.registeredCommands.push({
            name: registerInfo.name.toLowerCase(),
            aliases: registerInfo.aliases?.map(alias => alias.toLowerCase()),
            admin: registerInfo.admin ?? undefined,
            callback
        })
    }
}

world.events.beforeChat.subscribe(data => {
    if (data.message.startsWith(commandPrefix)) {
        data.cancel = true
        const args = data.message.slice(commandPrefix.length).toLowerCase().split(/\s+/g)
        const command = args.shift()
        const commandData = Command.registeredCommands.find(cmd => cmd.name === command || cmd.aliases?.includes(command))
        if (!commandData) return broadcastMessage(`§cInvalid command!`, data.sender)
        if (commandData.admin && !data.sender.hasTag(adminTag)) return broadcastMessage(`§cYou do not have permission to run that command!`, data.sender)
        return commandData.callback({ player: data.sender, args })
    }
})

interface commandInfo {
    /**
     * Name of the command
     */
    name: string,
    /**
     * The tag you have to have to use the command
     */
    admin?: boolean,
    /**
     * Aliases for the command
     */
    aliases?: string[]
}

interface commandData extends commandInfo {
    /**
     * Code to run when the command is ran
     */
    callback: (data: { player: Player, args: string[] }) => void
}

/**
 * Broadcast a message (or send it to a player)
 * @param {string} message Message to broadcast
 * @param {Player} player Player to send the message to
 * @example broadcastMessage('This message was sent to everyone!')
 */
export function broadcastMessage(message: string, player?: Player) {
    player ? player.runCommand(`tellraw @s ${JSON.stringify({ rawtext: [{ text: message }] })}`) : world.getDimension('overworld').runCommand(`tellraw @a ${JSON.stringify({ rawtext: [{ text: message }] })}`)
}