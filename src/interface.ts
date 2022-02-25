import { Dayjs } from "dayjs";

/**
 * Represents a resource
 */
export interface Room {
    name: string,
    image: string,
    capacity: number
}

/**
 * Represents a booking made by a user
 */
export interface Booking {
    bookingId: number,
    startDate: string,
    startTime: string
    endTime: string,
    room: Room,
    capacity: number
}

export interface UnsavedBooking {
    from?: string | Dayjs,
    startTime?: string |  Dayjs,
    endTime?: string | Dayjs,
    room?: string,
    capacity?: number
}

export interface BookingServiceProvider {
    availableRooms: Array<Room>,
    allBookings: Array<Booking>,
    currentBookingProcess: UnsavedBooking,
    getBookings: () => void,
    getRooms: () => void,
    updateBooking: (booking: UnsavedBooking) => void
    roomsLoading: boolean,
    bookingsLoading: boolean,
    warnings?: Array<string>,
    setWarnings: (warnings: Array<string>) => void;
}