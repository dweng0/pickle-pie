import dayjs from "dayjs";
import isBetween from 'dayjs/plugin/isBetween';

import { Booking, UnsavedBooking } from "../../interface";


/**
 * Go Through bookings and return rooms that clash
 * @param currentBooking
 */
export const getClashingBookings = (currentBooking: UnsavedBooking) => (booking: Booking) => {

    //parse date into dayjs
    const date      = dayjs(booking.startDate)
    const startTime = dayjs(booking.startTime);
    const endTime   = dayjs(booking.endTime);

    if (date.isSame(currentBooking.startDate, 'day')) {
        return startTime.isBetween(currentBooking.startTime, currentBooking.endTime, 'minute')
            || endTime.isBetween(currentBooking.startTime, currentBooking.endTime, 'minute');
    }
    return false;
}