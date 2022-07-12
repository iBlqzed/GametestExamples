import { world } from "mojang-minecraft";

/**
 * Run code when the world is loaded
 * @param {() => void} callback Code to run when the world is loaded
 * @example onWorldLoad(() => console.warn(`World is loaded!`))
 */
export function onWorldLoad(callback: () => void) {
    const tE = world.events.tick.subscribe(() => {
        try {
            world.getDimension('overworld').runCommand(`testfor @a`)
            world.events.tick.unsubscribe(tE)
            callback()
        } catch { }
    })
}