import React, { useState, useContext, createContext, useReducer, useEffect } from 'react';
import { Booking, Room, UnsavedBooking, BookingServiceProvider } from '../../interface';
import { useFetch } from '../../hooks';
import { api, URL_DATE_FORMAT, URL_KEYS, URL_TIME_FORMAT } from '../../constants';
import { useLocation } from 'react-router-dom';
import { updateProposedBooking } from './reducers';
import dayjs, { Dayjs } from 'dayjs';
import { getQuery } from '../../service/querybuilder';
import { Warning } from '@mui/icons-material';

const BookingServiceContext = createContext<BookingServiceProvider | undefined>(undefined);

export const BookingContextProvider: React.FunctionComponent = ({ children }) => {

    const roomFetchService          = useFetch<Array<Room>>(api.rooms);
    const bookingFetchService       = useFetch<Array<Booking>>(api.bookings);
    const [warnings, setWarnings]   = useState<string>('');
    const location                  = useLocation();

    roomFetchService.get();
    bookingFetchService.get();

    /**
     * Takes a string and tries to parse it into a dayjs object, fails gracefully
     * @param format the proposed format
     * @param value the string value
     */
    const handleDates = (format: string, value: string) => {

        let proposedDate: string | Dayjs = dayjs(value, format);
        if (!proposedDate.isValid()) {
            proposedDate = '';
        }
        return proposedDate;
    }

    /**
     * reducer function to build the unsavedbooking object based off the URL_KEYS provided
     * @param acc accumulated result
     * @param curr current item in the index
     */
    const buildCurrentBookingFromUrl = (acc, curr) => {

        const key = URL_KEYS[curr];

        let value: string | number | Dayjs = getQuery(key, location.search);

        // parse capacity into a number or default if not possible
        if (key === 'capacity') {
            try {
                value = parseInt(value);
            } catch {
                value = 1;
            }
        }

        // parse the date or warn that the date is invalid
        if (key === 'from') {

            value = handleDates(URL_DATE_FORMAT, value as string);
        }

        // parse the start time
        if (key === 'startTime') {
            value = handleDates(URL_TIME_FORMAT, value as string);
        }

        // parse the end time
        if (key === 'endTime') {
            value = handleDates(URL_TIME_FORMAT, value as string);
        }

        acc[key] = value;
        return acc;
    };

    /**
     * IT: builds an unsavedbooking object from the url query params
     */
    const booking = Object.keys(URL_KEYS).reduce<UnsavedBooking>(buildCurrentBookingFromUrl, {});

    const [currentBooking, dispatch] = useReducer(updateProposedBooking, booking);

    // hoc, callcs action on reducer
    const updateBooking = (bookingData: UnsavedBooking) => dispatch({ type: 'update', payload: bookingData });

    // Sanitize unsaved booking with an error gate
    const warningBarrier = (booking: UnsavedBooking): string => {
        const earlyWarnings = [];
        const { startTime, endTime, from, capacity, room } = booking;
        if (startTime && endTime) {
            const start = dayjs(startTime, URL_TIME_FORMAT);
            const end = dayjs(endTime, URL_TIME_FORMAT);

            if (!end.isValid()) {
                earlyWarnings.push('End date is not valid');
            }

            if (!start.isValid()) {
                earlyWarnings.push('Start date is not valid');
            }

            if (end.isBefore(start)) {
                earlyWarnings.push('End date is set before start date');
            }
        }

        if (room && roomFetchService.loading === false) {
            const result = roomFetchService.response.find(item => item.name === room);

            if (!result) {
                earlyWarnings.push('Could not find the room you have entered');
            }
        }

        if (capacity) {
            if (capacity <= 0) {
                earlyWarnings.push('There must be atleast one person for a booking. Please update required capacity.');
            }
        }

        if (from) {
            const date = dayjs(from, URL_DATE_FORMAT);
            const now = dayjs();

            if (!date.isValid()) {
                earlyWarnings.push('The provided date for the booking is invalid');
            }

            if (date.isBefore(now)) {
                earlyWarnings.push('The provided date is in the past');
            }
        }
        return earlyWarnings.reduce((msg, currentErr) => {
            msg += '\n' + currentErr;
            return msg;
        }, '');
    }

    useEffect(() => {
        setWarnings(warningBarrier(currentBooking))
    }, [currentBooking, warningBarrier]);

    const saveBooking = (): Promise<Response> => {

        const warnings = warningBarrier(currentBooking);
        if (warnings) {
            setWarnings(warnings);
            return;
        } 
        const { endTime, startTime, from, capacity, room }: UnsavedBooking = currentBooking;

        const convert = (possibleDate: string | Dayjs, format): string => {
            if (typeof possibleDate !== 'string') {
                return possibleDate.format(format);
            }
            return possibleDate;
        }

        const payload: UnsavedBooking = {
            capacity,
            room,
            startTime: convert(startTime, URL_TIME_FORMAT),
            endTime: convert(endTime, URL_TIME_FORMAT),
            from: convert(from, URL_DATE_FORMAT)
        };

        return bookingFetchService.post(payload);
    }

    const value: BookingServiceProvider = {
        availableRooms: roomFetchService.response || [],
        getRooms: roomFetchService.get,
        allBookings: bookingFetchService.response || [],
        getBookings: bookingFetchService.get,
        saveBooking,
        currentBookingProcess: currentBooking,
        bookingsLoading: bookingFetchService.loading,
        roomsLoading: roomFetchService.loading,
        updateBooking: updateBooking,
        warnings: warnings
    }

    return (
        <BookingServiceContext.Provider value={value}>
            {children}
        </BookingServiceContext.Provider>
    );
}

export const useBookingService = (): BookingServiceProvider => {
    const context = useContext(BookingServiceContext);

    if (context === undefined) {
        throw new Error('useBookingService must be used within a BookinService Provider');
    }

    return context;
}