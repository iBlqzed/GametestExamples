import { Entity, world } from "mojang-minecraft";

/**
 * Run a command!
 * @param {string} cmd Command to run
 * @param {Entity} executor Entity to run the command
 * @returns {{ error: boolean, data: any }} Whether or not the command errors, and command data
 */
export function runCommand(cmd: string, executor?: Entity): { error: boolean, data: any } {
    try {
        let rV: any
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
export function runCommands(commands: string[], executor?: Entity): { error: boolean } {
    try {
        const cR = /^%/;
        if (cR.test(commands[0])) throw new TypeError('[Server] >> First command in runCommands function can not be conditional')
        let cmdError = false
        for (const cmd of commands) {
            if (cmdError && cR.test(cmd)) continue
            cmdError = runCommand(cmd.replace(cR, ''), executor).error
        }
        return { error: false }
    } catch (error) {
        return { error: true };
    }
}