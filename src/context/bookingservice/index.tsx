import React, { useState, useContext, useEffect, createContext } from 'react';
import { Booking, Room, UnsavedBooking, BookingServiceProvider } from '../../interface';
import { useFetch } from '../../hooks';
import { api, URL_KEYS } from '../../constants';
import { useLocation } from 'react-router-dom';
import { getQuery } from '../../service/querybuilder';


const BookingServiceContext = createContext<BookingServiceProvider | undefined>(undefined);

export const BookingContextProvider: React.FunctionComponent = ({ children }) => {

    const roomFetchService      = useFetch<Array<Room>>(api.rooms);
    const bookingFetchService   = useFetch<Array<Booking>>(api.bookings);
    const [currentBooking, setCurrentBooking] = useState<UnsavedBooking>(null);
    const location = useLocation();

    roomFetchService.get();
    bookingFetchService.get();

    /**
     * IT: Builds the current booking process object
     * WHEN: the params change on the url
     */
    useEffect(() => {
        debugger;
        const buildCurrentBookingFromUrl = (acc, curr) => {
            acc[URL_KEYS[curr]] = getQuery(curr, location.search);
            return acc;
        };

        const booking = Object.keys(URL_KEYS).reduce<UnsavedBooking>(buildCurrentBookingFromUrl, {});

        setCurrentBooking(booking);
    }, [location, setCurrentBooking, URL_KEYS]);

    const value: BookingServiceProvider = {
        availableRooms: roomFetchService.response,
        getRooms: roomFetchService.get,
        allBookings: bookingFetchService.response,
        getBookings: bookingFetchService.get,
        currentBookingProcess: currentBooking,
        bookingsLoading: bookingFetchService.loading,
        roomsLoading: roomFetchService.loading
    }

    return (
        <BookingServiceContext.Provider value={value}>
            {children}
        </BookingServiceContext.Provider>
    );
}

export const useBookingService = () => {
    const context = useContext(BookingServiceContext);

    if (context === undefined) {
        throw new Error('useBookingService must be used within a BookinService Provider');
    }

    return context;
}