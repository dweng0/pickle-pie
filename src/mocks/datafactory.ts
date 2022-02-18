import { Room } from "../interface"
import seedFromCollatzConjecture from "./seed";
import { uniqueNamesGenerator, adjectives, colors, animals, Config } from 'unique-names-generator';

/**
 * Use Collatz Conjecture to provide a fixed result from the same seed
 * @param seed
 */
export const generateRoomsFromSeed = (seed: number) => {
    const rooms: Array<Room> = [];
    const [numberOfRooms, capacitySeed, nameSeed] = seedFromCollatzConjecture(seed, 3);
    const capacityList = seedFromCollatzConjecture(capacitySeed, numberOfRooms);
    const nameList = seedFromCollatzConjecture(nameSeed, numberOfRooms);

    // cap at 20 rooms
    for (let i = 0; i < 20; i++) {

        const config: Config = {
            dictionaries: [adjectives, colors, animals],
            separator: ' ',
            seed: nameList[i],
        };

        rooms.push({
            capacity: capacityList[i],
            name: uniqueNamesGenerator(config),
            image: 'https://loremflickr.com/240/240'
        });
    }
    return rooms;
}
