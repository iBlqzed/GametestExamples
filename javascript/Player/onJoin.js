import { Player, world } from "mojang-minecraft";

/**
 * Run code when a player joins
 * @param {(player: Player) => void} callback Code to run when a player joins
 * @example onPlayerJoin(player => {
 * console.warn(player.name)
 * })
 */
export function onPlayerJoin(callback) {
    if (jT) throw new Error(`There can only be 1 onPlayerJoin callback!`)
    jT = true
    world.events.tick.subscribe(() => {
        for (const pL of world.getPlayers()) if (!pNA.includes((pL.name))) { pNA.push(pL.name); callback(pL); }
    })
    world.events.playerLeave.subscribe(({ playerName }) => pNA.splice(pNA.findIndex(pL => pL === playerName)))
}

const pNA = []
let jT = false