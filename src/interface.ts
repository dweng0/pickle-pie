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
    startDateTimeSlot: string,
    endDateTimeSlot: string
    room: Room
    specialRequirements: string,
    numberOfAttendants: number
}