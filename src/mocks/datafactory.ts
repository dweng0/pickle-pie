import { Room } from "../interface"
import seedFromCollatzConjecture from "./seed";

/**
 * Use Collatz Conjecture to provide a fixed result from the same seed
 * @param seed
 */
export const generateRoomsFromSeed = (seed: number) => {
    const rooms: Array<Room> = [];
    const [numberOfRooms, capacitySeed, nameSeed] = seedFromCollatzConjecture(seed, 3);
    const capacityList = seedFromCollatzConjecture(capacitySeed, numberOfRooms);
    const nameList = seedFromCollatzConjecture(nameSeed, numberOfRooms);
    
    for (let i = 0; i < numberOfRooms; i++) {
        rooms.push({
            capacity: capacityList[i],
            name: String.fromCharCode(nameList[i]),
            image: 'https://loremflickr.com/240/240'
        });
    }
    return rooms;
}
