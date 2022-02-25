import React, { JSXElementConstructor, ReactElement } from 'react';
import dayjs from 'dayjs';
import { inputFactory, dateFactory, timeFactory, autoCompleteFactory } from './formfactory';
import { URL_DATE_FORMAT, URL_TIME_FORMAT, URL_KEYS } from '../../constants';

import Box                      from '@mui/material/Box';
import Groups                   from '@mui/icons-material/Groups';
import { pushQuery, getQuery}   from '../../service/querybuilder';
import AdapterDayjs             from "@mui/lab/AdapterDayjs";
import LocalizationProvider     from '@mui/lab/LocalizationProvider';
import { ControlPanelProps }    from './interface';
import CircularProgress         from '@mui/material/CircularProgress';

import { useBookingService }    from '../../context/bookingservice';
import logo from './logo.png';

const { CAPACITY, START_DATE_TIME, START_TIME, END_TIME, ROOM } = URL_KEYS;

const ControlPanel: React.FunctionComponent<ControlPanelProps> = () => {

    const { availableRooms, roomsLoading, updateBooking, currentBookingProcess} = useBookingService();

    const roomNames = (availableRooms) ? availableRooms.map(room => room.name) : [];

    const handleChange = (key) => (value: any) => {
        //update url
        pushQuery({ key, value });

        //update context
         updateBooking(Object.fromEntries([[key, value]]));
    };

    const handleChangeForDate = (key) => (value: any) => {
        if (value) {
            try {
                pushQuery({ key, value: dayjs(value).format(URL_DATE_FORMAT).toString() });

                //update context
                updateBooking(Object.fromEntries([[key, value]]));
            } catch {
                console.log('Todo capture failed event');
            }
        }
    }

    const handleChangeForTime = (key) => (value: any) => {
        if (value) {
            try {
                pushQuery({ key, value: dayjs(value).format(URL_TIME_FORMAT).toString() });

                //update context
                updateBooking(Object.fromEntries([[key, value]]));
            } catch {
                console.log('Todo capture failed event');
            }
        }
    }


    // also check if its after the start time
    const handleChangeForEndTime = (key) => (value: any) => {

        // check start time
        if (value) {
            try {
                pushQuery({ key, value: dayjs(value).format(URL_TIME_FORMAT).toString() });

                //update context
                updateBooking(Object.fromEntries([[key, value]]));
            } catch {
                console.log('Todo capture failed event');
            }
        }
        }
    
    /**
     * HoC functions that call relevant input factories
     */
    const inputForString = (key: string, label: string, Icon: React.ReactElement, width?: string, type?: string) => inputFactory(key, label, currentBookingProcess[key], Icon, handleChange(key), width, type);
    const inputForDate = (key: string, label: string) => dateFactory(key, label, handleChangeForDate(key), currentBookingProcess[key]);
    const inputForTime = (key: string, label: string, changeHandler) => timeFactory(key, label, changeHandler(key), currentBookingProcess[key]);
    const inputForAutoComplete = (key: string, label: string, suggestions: Array<string>) => autoCompleteFactory(key, label, handleChange(key), suggestions, currentBookingProcess[key]);

    /**
     * Factory inputs
     */
    const capacity          = inputForString(CAPACITY, 'Capacity', <Groups/>, '15.5ch', 'number');
    const fromDate          = inputForDate(START_DATE_TIME, 'On');
    const startTime         = inputForTime(START_TIME, 'Starts', handleChangeForTime);
    const endTime           = inputForTime(END_TIME, 'Ends', handleChangeForEndTime);
    const roomAutoComplete  = inputForAutoComplete(ROOM, 'Rooms', roomNames);

    return (
        <>
            <div style={{minHeight: "180px"}}>
                {roomsLoading ? <CircularProgress className="splash-image" /> : <img className="splash-image" src={logo} alt="Event Rent Logo" />}
            </div>
            <Box>
                {capacity}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {fromDate}
                    {startTime}
                    {endTime}
                </LocalizationProvider>
                {roomAutoComplete}
            </Box>
        </>
    )
}

export default ControlPanel