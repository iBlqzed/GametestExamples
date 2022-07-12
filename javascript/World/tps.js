import { world } from "mojang-minecraft";

/**
 * The tps of the world
 */
export let tps = 0

world.events.tick.subscribe(data => {
    tps = Math.min(Number((1 / data.deltaTime).toFixed(2)), 20)
})