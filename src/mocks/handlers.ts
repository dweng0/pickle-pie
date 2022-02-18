import { Session } from 'inspector';
import { rest } from 'msw';
import { generateRoomsFromSeed } from './datafactory';

const SEED = 1538023;
const API_ROOT = '/api';
const ROOMS = API_ROOT + '/rooms';
const BOOKINGS = API_ROOT + '/bookings';

sessionStorage.setItem(ROOMS, JSON.stringify(generateRoomsFromSeed(SEED)));
sessionStorage.setItem(BOOKINGS, JSON.stringify([]));
const getFromStorage = (itemPath: string) => JSON.parse(sessionStorage.getItem(itemPath) || '');

export const handlers = [
    rest.get(ROOMS, (req, res, ctx) => res(
        ctx.status(200),
        ctx.json(getFromStorage(ROOMS))
    )),
    rest.get(BOOKINGS, (req, res, ctx) => res(
        ctx.status(200),
        ctx.json(getFromStorage(BOOKINGS))
    ))
];