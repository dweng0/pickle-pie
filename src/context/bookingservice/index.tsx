import React, { useState, useContext, useEffect, createContext, useReducer } from 'react';
import { Booking, Room, UnsavedBooking, BookingServiceProvider } from '../../interface';
import { useFetch } from '../../hooks';
import { api, URL_KEYS } from '../../constants';
import { useLocation } from 'react-router-dom';
import { getQuery } from '../../service/querybuilder';
import { updateProposedBooking } from './reducers';


const BookingServiceContext = createContext<BookingServiceProvider | undefined>(undefined);

export const BookingContextProvider: React.FunctionComponent = ({ children }) => {

    const roomFetchService      = useFetch<Array<Room>>(api.rooms);
    const bookingFetchService   = useFetch<Array<Booking>>(api.bookings);
    const location = useLocation();

    roomFetchService.get();
    bookingFetchService.get();

    const buildCurrentBookingFromUrl = (acc, curr) => {
        acc[URL_KEYS[curr]] = getQuery(curr, location.search);
        return acc;
    };

    const booking = Object.keys(URL_KEYS).reduce<UnsavedBooking>(buildCurrentBookingFromUrl, {});    
    const [currentBooking, dispatch] = useReducer(updateProposedBooking, booking);

    // hoc, callcs action on reducer
    const updateBooking = (bookingData: UnsavedBooking) => dispatch({ type: 'update', payload: bookingData });

    const value: BookingServiceProvider = {
        availableRooms: roomFetchService.response || [],
        getRooms: roomFetchService.get,
        allBookings: bookingFetchService.response || [],
        getBookings: bookingFetchService.get,
        currentBookingProcess: currentBooking,
        bookingsLoading: bookingFetchService.loading,
        roomsLoading: roomFetchService.loading,
        updateBooking: updateBooking
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