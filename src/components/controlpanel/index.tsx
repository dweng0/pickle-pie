import React, { JSXElementConstructor, ReactElement } from 'react';
import Box from '@mui/material/Box';

import MeetingRoom from '@mui/icons-material/MeetingRoom';
import Groups from '@mui/icons-material/Groups';
import { inputFactory, dateFactory, timeFactory  } from './formfactory';
import pushQuery from '../../service/querybuilder';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import TimePicker from '@mui/lab/TimePicker';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

const CAPACITY = 'capacity';
const START_DATE_TIME = 'from';
const START_TIME = 'startTime';
const END_TIME = 'endTime';
const ROOM = 'room';

const ControlPanel: React.FunctionComponent = () => {

    const handleChange = (key) => (value: any) => {
        pushQuery({ key, value });
    };

    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    const queryString = window.location.search;
    const query = new URLSearchParams(queryString);

    const inputForString = (key: string, label: string, Icon: React.ReactElement, width?: string, type?: string) => inputFactory(key, label, query.get(key), Icon, handleChange(key), width, type);
    const inputForDate = (key: string, label: string) => dateFactory(key, label, handleChange(key));
    const inputForTime = (key: string, label: string) => timeFactory(key, label, handleChange(key));

    const capacity = inputForString(CAPACITY, 'Capacity', <Groups/>, '15.5ch', 'number');
    const room = inputForString(ROOM, 'Room', <MeetingRoom />, '15.5ch');
    const fromDate = inputForDate(START_DATE_TIME, 'On');
    const startTime = inputForTime(START_TIME, 'Starts');
    const endTime = inputForTime(END_TIME, 'Ends');

    return (
        
        <Box>
            {capacity}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                {fromDate}
                {startTime}
                {endTime}
            </LocalizationProvider>
           
            {room}
        </Box>
    )
}

export default ControlPanel