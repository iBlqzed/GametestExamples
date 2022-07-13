import { Player, world } from "mojang-minecraft";

const commandPrefix = '?'
const adminTag = 'Admin'

export class Command {
    /**
     * Register a new command!
     * @param {{name: string,admin?: boolean,aliases?: string[]}} registerInfo Register info for the command
     * @param {(data: { player: Player, args: string[] }) => void} callback Code to run when the command is called for
     * @example new Command({
     * name: 'test',
     * admin: true,
     * aliases: ['test1','test2']
     * }, data => {
     * console.warn(data.player.name)
     * })
     */
    constructor(registerInfo, callback) {
        Command.rC.push({
            name: registerInfo.name.toLowerCase(),
            aliases: registerInfo.aliases?.map(a => a.toLowerCase()),
            admin: registerInfo.admin ?? undefined,
            callback
        })
    }
}
Command.rC = []

world.events.beforeChat.subscribe(data => {
    if (data.message.startsWith(commandPrefix)) {
        data.cancel = true
        const args = data.message.slice(commandPrefix.length).split(/\s+/g)
        const cM = args.shift().toLowerCase()
        const cD = Command.rC.find(cmd => cmd.name === cM || cmd.aliases?.includes(cM))
        if (!cD) return broadcastMessage(`§cInvalid command!`, data.sender)
        if (cD.admin && !data.sender.hasTag(adminTag)) return broadcastMessage(`§cYou do not have permission to run that command!`, data.sender)
        return cD.callback({ player: data.sender, args })
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