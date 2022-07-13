import { Entity, world } from "mojang-minecraft";

/**
 * Run a command!
 * @param {string} cmd Command to run
 * @param {Entity} executor Entity to run the command
 * @returns {{ error: boolean, data: any }} Whether or not the command errors, and command data
 * @example runCommand(`give @s diamond`, player)
 */
export function runCommand(cmd, executor = null) {
    try {
        let rV
        if (executor) rV = executor.runCommand(cmd)
        else rV = world.getDimension('overworld').runCommand(cmd)
        return { error: false, data: rV }
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
 * `testfor @s[hasitem={item=dirt}]`
 * `%say I have dirt in my hand!`
 * ], player)
 */
export function runCommands(commands, executor = null) {
    try {
        const cR = /^%/;
        if (cR.test(commands[0])) throw new TypeError('[Server] >> First command in runCommands function can not be conditional')
        let cE = false
        for (const cD of commands) {
            if (cE && cR.test(cD)) continue
            cE = runCommand(cD.replace(cR, ''), executor).error
        }
        return { error: false }
    } catch {
        return { error: true }
    }
}