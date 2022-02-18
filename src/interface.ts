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

/**
 * Show availability by date
 * 
 * Scenario, user selects a timeslot
 */
/**
 * PSUEDO
 */
let rooms: Array<Room> = [];
let bookings: Array<Booking> = [];
let userSelectedStartDateTime: string; //leverage moment: https://momentjscom.readthedocs.io/en/latest/moment/05-query/06-is-between/
// fetch all rooms  --> api/rooms/


// get all bookings where date matches users tentative date -> api/bookings/[date]/ <--- startDateTimeSlot


// filter out rooms array based on if their proposed time is already in our booking list for that room
let availableRoom = rooms.filter((item) => bookings.find(booking => { userSelectedStartDateTime.isBetween(booking.startDateTimeSlot, booking.endDateTimeSlot) }));

// user selects and end time (timeslot)
// repeat filter but for end date 

// we now have: 
// a roomId, (its name)
// a time slot ( start date time and end date time)

/**
 * Show availability by date
 */