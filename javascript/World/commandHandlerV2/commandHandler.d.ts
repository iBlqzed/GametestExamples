import { Player } from "mojang-minecraft";
export declare class Command {
    static registeredCommands: commandData[];
    protected registeredCommand: commandData;
    protected arguments: Array<{
        index: number;
        type: string;
    }>;
    /**
     * Create a new command!
     * @example const myCommand = new Command({
     * name: 'test', //The name of the command
     * description: 'This is just a test command', //The description of the command
     * aliases: ['test1', 'test2'], //Aliases of the command
     * permissions: ['Admin'] //Tags you need to have to run the command
     * })
     */
    constructor(commandInfo: commandInfo);
    /**
     * Add a argument
     * @param {number} index Index of the argument to set the type to
     * @param {keyof argumentTypes} type The type of the argument
     */
    addArgument(index: number, type: keyof argumentTypes): void;
    /**
     * Run code when the command is ran
     * @param {(player: Player, args: { type: string, value: any }[]) => void} callback Code to run when the command is ran
     */
    callback(callback: (player: Player, args: {
        type: string;
        value: any;
    }[]) => void): void;
    /**
     * Register the command
     */
    register(): void;
}
interface argumentTypes {
    create: string;
    set: string;
    remove: string;
    invite: string;
    player: string;
    playerOnline: Player;
    number: number;
    boolean: boolean;
    any: any;
}
interface commandData extends commandInfo {
    callback?: (player: Player, args: {
        type: keyof argumentTypes;
        value: any;
    }[]) => void;
    arguments?: {
        index: number;
        type: keyof argumentTypes;
    }[];
}
interface commandInfo {
    /**
     * The name of the command
     */
    name: string;
    /**
     * The description of the command
     */
    description?: string;
    /**
     * Aliases of the command
     */
    aliases?: string[];
    /**
     * Tags you need to have to run the command
     */
    permissions?: string[];
}
export { };