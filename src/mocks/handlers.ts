import { rest } from 'msw';
import { Booking, Room } from '../interface';
import { generateRoomsFromSeed } from './datafactory';

const SEED = 427;
const API_ROOT = '/api';
const ROOMS = API_ROOT + '/rooms';
const BOOKINGS = API_ROOT + '/bookings';

try {
    localStorage.setItem(ROOMS, JSON.stringify(generateRoomsFromSeed(SEED)));
    localStorage.setItem(BOOKINGS, '[]');
} catch (error) {
    console.log(`failed to setup storage`);
}


// generic storage fetcher
const fromStorage = (itemPath: string) => JSON.parse(localStorage.getItem(itemPath) || '');

// response HoC to provide generic types
const response = (path: string) => withResponse<Array<Room | Booking>>(200, fromStorage(path));
const withResponse = <T>(status: number = 400, resource: T) => (req, res, ctx) => res(ctx.status(200), ctx.json(resource));

export const handlers = [
    rest.get(ROOMS, response(ROOMS)),
    rest.get(BOOKINGS, response(BOOKINGS))
];