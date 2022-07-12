import { BlockLocation, Location } from "mojang-minecraft";

/**
 * Converts a location to a block location
 * @param {Location} loc The BlockLocation of the Location
 * @returns {BlockLocation}
 */
export function locationToBlockLocation(loc: Location): BlockLocation {
    return new BlockLocation(
        Math.floor(loc.x),
        Math.floor(loc.y),
        Math.floor(loc.z)
    )
}

/**
 * Converts a block location to a location
 * @param {BlockLocation} loc The Location of the BlockLocation
 * @returns {Location}
 */
export function blockLocationToLocation(loc: BlockLocation): Location {
    return new Location(
        loc.x,
        loc.y,
        loc.z
    )
}

/**
 * Convert coords into a location
 * @param {[number, number, number]} coords Coords to turn into a location
 * @returns {Location} Location from the coords
 */
export function coordsToLocation(coords: [number, number, number]): Location {
    return new Location(
        coords[0],
        coords[1],
        coords[2]
    )
}

/**
 * Convert coords into a block location
 * @param {[number, number, number]} coords Coords to turn into a block location
 * @returns {BlockLocation} BlockLocation from the coords
 */
export function coordsToBlockLocation(coords: [number, number, number]): BlockLocation {
    return new BlockLocation(
        Math.floor(coords[0]),
        Math.floor(coords[1]),
        Math.floor(coords[2])
    )
}

/**
 * Convert a location to coords
 * @param {Location} loc Location to convert into coords
 * @returns {[number, number, number]} Coords
 */
export function locationToCoords(loc: Location): [number, number, number] {
    return [loc.x, loc.y, loc.z]
}

/**
 * Convert a block location to coords
 * @param {BlockLocation} loc BlockLocation to convert into coords
 * @returns {[number, number, number]} Coords
 */
export function blockLocationToCoords(loc: BlockLocation): [number, number, number] {
    return [loc.x, loc.y, loc.z]
}