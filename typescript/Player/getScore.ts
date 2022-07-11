import { Entity, world } from "mojang-minecraft";

/**
 * Get the score of a target on an objective
 * @param {string} objective Objective to get a score from
 * @param {Entity|string} target The entity, player, or fake player to get the score of
 * @param {boolean} useZero Specifies whether to return NaN or 0 if an error is thrown
 * @returns {number} The target's score, or NaN / 0 if error
 */
export function getScore(objective: string, target: Entity | string, useZero?: boolean): number {
    try {
        const obj = world.scoreboard.getObjective(objective)
        //@ts-ignore
        if (typeof target == 'string') return obj.getScore(obj.getParticipants().find(v => v.displayName == target))
        return obj.getScore(target.scoreboard)
    } catch {
        return useZero ? 0 : NaN
    }
}