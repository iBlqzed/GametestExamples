import { Entity, world } from "mojang-minecraft";

/**
 * Run a command!
 * @param {string} cmd Command to run
 * @param {Entity} executor Entity to run the command
 * @returns {{ error: boolean, data: any }} Whether or not the command errors, and command data
 * @example runCommand(`give @s diamond`, player)
 */
export function runCommand(cmd: string, executor?: Entity): { error: boolean, data: any } {
    try {
        if (executor) return { error: false, data: executor.runCommand(cmd) }
        return { error: false, data: world.getDimension('overworld').runCommand(cmd) }
    } catch {
        return { error: true, data: undefined }
    }
}

/**
 * Run an array of commands (if a command starts with "%", then it will be conditional!)
 * @param {string[]} commands Commands to run
 * @param {Entity} executor Entity to run all of the commands
 * @returns {{error: boolean}} Whether or not there was an error running all the commands
 * @example runCommands([
 * `testfor @s[hasitem={item=dirt}]`,
 * `%say I have dirt in my hand!`
 * ], player)
 */
export function runCommands(commands: string[], executor?: Entity): { error: boolean } {
    try {
        const cR = /^%/;
        if (cR.test(commands[0])) throw new TypeError('[Server] >> First command in runCommands function can not be conditional')
        let cE = false
        for (const cM of commands) {
            if (cE && cR.test(cM)) continue
            cE = runCommand(cM.replace(cR, ''), executor).error
        }
        return { error: false }
    } catch {
        return { error: true }
    }
}