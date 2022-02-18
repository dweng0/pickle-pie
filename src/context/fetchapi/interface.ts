import { Room, Booking } from "../../interface";

export type actionType = 'getRooms' | 'getBooking' | 'login' | 'submitBooking';
export type BookingApiReturnType = {
    state: 'idle' | 'loading',
    fetch: () => void,
    data: Array<Room> | Array<Booking>
}

export type DataDocument = {
    rooms: Array<Room>
    bookings: Array<Booking>
}