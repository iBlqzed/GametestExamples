import { world } from "mojang-minecraft";

/**
 * Delay executing a function
 * @param {() => void} callback Code you want to execute when the delay is finished
 * @param {number} tick Time in ticks until the callback runs
 * @param {boolean} loop Whether or not the code should loop or not
 * @example setTickTimeout(() => {
 * console.warn(`This was called after 20 ticks!`)
 * }, 20)
 */
export function setTickTimeout(callback: () => void, tick: number, loop?: boolean) {
    let cT = 0
    const tE = world.events.tick.subscribe((data) => {
        if (cT === 0) cT = data.currentTick + tick
        if (cT <= data.currentTick) {
            try { callback() } catch (e) { console.warn(`${e} : ${e.stack}`) }
            if (loop) cT += tick
            else world.events.tick.unsubscribe(tE)
        }
    })
}