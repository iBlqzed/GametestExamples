import { Player, world } from "mojang-minecraft"

const commandPrefix = '?'

export class Command {
    static registeredCommands: commandData[] = []
    protected registeredCommand: commandData
    protected arguments: Array<{ index: number, type: string }> = []
    /**
     * Create a new command!
     * @example const myCommand = new Command({
     * name: 'test', //The name of the command
     * description: 'This is just a test command', //The description of the command
     * aliases: ['test1', 'test2'], //Aliases of the command
     * permissions: ['Admin'] //Tags you need to have to run the command
     * })
     */
    constructor(commandInfo: commandInfo) {
        if (commandInfo.name.includes(' ') || commandInfo.aliases?.find(aL => aL.includes(' '))) throw new Error('Command names or aliases can\'t have spaces in them')
        this.registeredCommand = {
            name: commandInfo.name.toLowerCase(),
            description: commandInfo.description,
            aliases: commandInfo.aliases?.map(aL => aL.toLowerCase()),
            permissions: commandInfo.permissions ?? undefined,
            callback: undefined,
            arguments: undefined
        }
    }
    /**
     * Add a argument
     * @param {number} index Index of the argument to set the type to
     * @param {keyof argumentTypes} type The type of the argument
     */
    addArgument(index: number, type: keyof argumentTypes) {
        this.arguments.push({ index, type })
    }
    /**
     * Run code when the command is ran
     * @param {(player: Player, args: { type: string, value: any }[]) => void} callback Code to run when the command is ran
     */
    callback(callback: (player: Player, args: { type: string, value: any }[]) => void) {
        this.registeredCommand = Object.assign(this.registeredCommand, { callback })
    }
    /**
     * Register the command
     */
    register() {
        Command.registeredCommands.push(Object.assign(this.registeredCommand, { arguments: this.arguments }))
    }
}
const create = ['create', 'c', 'add', 'make'],
    remove = ['remove', 'delete', 'r'],
    set = ['set', 'change'],
    invite = ['invite', 'inv', 'i']
world.events.beforeChat.subscribe(data => {
    if (!data.message.startsWith(commandPrefix)) return
    data.cancel = true
    const args = data.message.slice(commandPrefix.length).trim().split(/\s+/)
    const command = Command.registeredCommands.find(cmd => cmd.name === args[0] || cmd.aliases?.includes(args[0]))
    if (!command) return broadcastMessage(`§cInvalid command!`)
    if (command.permissions?.length && data.sender.getTags().filter(tag => command.permissions?.includes(tag)).length !== command.permissions.length) return broadcastMessage(`§cYou do not have permission to run this command!`)
    const sortedArgs = command.arguments?.sort((a, b) => a.index - b.index) ?? [],
        callbackArgs: { type: keyof argumentTypes, value: any }[] = []
    args.shift()
    let foundArg = true, argTest = 1, playerCheck = { value: '', check: false }, loopAmount = sortedArgs[sortedArgs.length - 1]?.index + 1, indexPlus = 0
    if (isNaN(loopAmount)) loopAmount = 0
    for (let i = 0; i < loopAmount; i++) {
        const argsData = command.arguments?.filter((arg) => arg.index === i)
        const argValue = args[i + indexPlus] ?? undefined
        if (argsData?.find(value => value.type === 'player' || value.type === 'playerOnline')) playerCheck.check = true
        if (argsData?.length === 0) { if (argValue !== '' && argValue !== undefined) { callbackArgs.push({ type: 'any', value: argValue }) } }
        else argsData?.forEach(arg => {
            if (arg.type === 'number') { if (Number(argValue)) callbackArgs.push({ type: 'number', value: Number(argValue) }) }
            if (arg.type === 'boolean') { if (argValue === 'true' || argValue === 'false') callbackArgs.push({ type: 'boolean', value: argValue === 'true' ? true : false }) }
            if (arg.type === 'create') { if (create.includes(argValue)) callbackArgs.push({ type: 'create', value: argValue }) }
            if (arg.type === 'remove') { if (remove.includes(argValue)) callbackArgs.push({ type: 'remove', value: argValue }) }
            if (arg.type === 'set') { if (set.includes(argValue)) callbackArgs.push({ type: 'set', value: argValue }) }
            if (arg.type === 'invite') { if (invite.includes(argValue)) callbackArgs.push({ type: 'invite', value: argValue }) }
            if (arg.type === 'any') { if (argValue !== '' && argValue !== undefined) callbackArgs.push({ type: 'any', value: argValue }) }
        })
        if (argTest !== callbackArgs.length) {
            if (playerCheck.check) {
                playerCheck.check = false
                if (argValue === '' || argValue === undefined) {
                    foundArg = false
                    //@ts-ignore
                    broadcastMessage(`§c[Nothing] is not of type ${JSON.stringify(argsData.map(arg => arg.type)).slice(2, -2).replaceAll('","', ", ")} (btw a player\'s name has to start with a ")`, data.sender)
                    break
                }
                if (!argValue?.startsWith('"')) {
                    //@ts-ignore
                    if (argsData.length > argsData.filter(value => value.type === 'player' || value.type === 'playerOnline').length) broadcastMessage(`§c${argValue} is not of type ${JSON.stringify(argsData.map(arg => arg.type)).slice(2, -2).replaceAll('","', ", ")} (btw a player\'s name has to start with a ")`, data.sender)
                    else {
                        broadcastMessage(`§cA player's name must start with a §4"§c!`, data.sender)
                        foundArg = false
                    }
                    foundArg = false
                    break
                }
                let testValue = args.filter((e, index) => index >= i).join(' ').slice(1)
                testValue = testValue.slice(0, testValue.includes('"') ? testValue.indexOf('"') : 0)
                if (testValue === '') {
                    broadcastMessage(`§cA player's name must end with a §4"§c!`, data.sender)
                    foundArg = false
                    break
                }
                if (testValue.length > 20) {
                    broadcastMessage(`§cPlayer's name is too long!`, data.sender)
                    foundArg = false
                    break
                }
                if (argsData?.find(arg => arg.type === 'playerOnline')) if ([...world.getPlayers()].find(plr => plr.name !== testValue)) {
                    broadcastMessage('§cPlayer is not online', data.sender)
                    foundArg = false
                    break
                }
                callbackArgs.push({ type: 'player', value: testValue })
                testValue.split("").forEach(letter => { if (letter === ' ') { indexPlus++ } })
            } else {
                foundArg = false
                //@ts-ignore
                broadcastMessage(`§c${argValue === '' || argValue === undefined ? '[Nothing]' : argValue} is not of type ${JSON.stringify(argsData.map(arg => arg.type)) !== '[]' ? JSON.stringify(argsData.map(arg => arg.type)).slice(2, -2).replaceAll('","', ", ") : 'any'}`, data.sender)
                break
            }
        }
        argTest++
    }
    if (foundArg) {
        if (loopAmount < args.length) for (let i = 0; i < args.length - loopAmount; i++) callbackArgs.push({ type: 'any', value: args[i + loopAmount] })
        command.callback && command.callback(data.sender, callbackArgs)
    }
})

interface argumentTypes {
    create: string,
    set: string,
    remove: string,
    invite: string,
    player: string,
    playerOnline: Player,
    number: number,
    boolean: boolean,
    any: any
}

interface commandData extends commandInfo {
    callback?: (player: Player, args: { type: keyof argumentTypes, value: any }[]) => void
    arguments?: { index: number, type: keyof argumentTypes }[]
}

interface commandInfo {
    /**
     * The name of the command
     */
    name: string
    /**
     * The description of the command
     */
    description?: string
    /**
     * Aliases of the command
     */
    aliases?: string[]
    /**
     * Tags you need to have to run the command
     */
    permissions?: string[]
}

/**
 * Broadcast a message (or send it to a player)
 * @param {string} message Message to broadcast
 * @param {Player|Player[]} player Player(s) to send the message to
 * @example broadcastMessage('This message was sent to everyone!')
 */
function broadcastMessage(message: string, player?: Player | Player[]) {
    if (!player) world.getDimension('overworld').runCommand(`tellraw @a ${JSON.stringify({ rawtext: [{ text: message }] })}`)
    else if (player instanceof Player) player.runCommand(`tellraw @a ${JSON.stringify({ rawtext: [{ text: message }] })}`)
    else player.forEach(pL => pL.runCommand(`tellraw @a ${JSON.stringify({ rawtext: [{ text: message }] })}`))
}