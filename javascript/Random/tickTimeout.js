import { world } from "mojang-minecraft";

/**
 * Delay executing a function
 * @param {() => void} callback Code you want to execute when the delay is finished
 * @param {number} tick Time in ticks until the callback runs
 * @param {boolean} loop Whether or not the code should loop or not
 */
export function setTickTimeout(callback, tick, loop = false) {
    let cT = 0
    const tE = world.events.tick.subscribe((data) => {
        if (cT === 0) cT = data.currentTick + tick
        try {
            if (cT > data.currentTick) {
                callback()
                if (loop) cT = data.currentTick + tick
                else world.events.tick.unsubscribe(tE)
            }
        } catch (e) {
            console.warn(`${e} : ${e.stack}`)
        }
    })
}