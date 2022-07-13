import { Entity, world } from "mojang-minecraft";

/**
 * Get the score of a target on an objective
 * @param {string} objective Objective to get a score from
 * @param {Entity|string} target The entity, player, or fake player to get the score of
 * @param {boolean} useZero Specifies whether to return NaN or 0 if an error is thrown
 * @returns {number} The target's score, or NaN / 0 if error
 * @example getScore('Money', player, true) //Returns the value of the scoreboard "Money", or 0 if error
 */
export function getScore(objective, target, useZero = false) {
    try {
        const oB = world.scoreboard.getObjective(objective)
        if (typeof target == 'string') return oB.getScore(oB.getParticipants().find(pT => pT.displayName == target))
        return oB.getScore(target.scoreboard)
    } catch {
        return useZero ? 0 : NaN
    }
}