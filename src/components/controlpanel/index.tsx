import React, { JSXElementConstructor, ReactElement } from 'react';
import Box from '@mui/material/Box';

import MeetingRoom from '@mui/icons-material/MeetingRoom';
import Groups from '@mui/icons-material/Groups';
import { inputFactory, dateFactory  } from './formfactory';
import pushQuery from '../../service/querybuilder';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import TextField from '@mui/material/TextField';

const CAPACITY = 'capacity';
const START_DATE_TIME = 'from';
const END_DATE_TIME = 'to';
const ROOM = 'room';

const ControlPanel: React.FunctionComponent = () => {

    const handleChange = (key) => (value: any) => {
        pushQuery({ key, value });
    };

    const queryString = window.location.search;
    const query = new URLSearchParams(queryString);

    const inputForString = (key: string, label: string, Icon: React.ReactElement, width?: string, type?: string) => inputFactory(key, label, query.get(key), Icon, handleChange(key), width, type);
    const inputForDate = (key: string, label: string) => dateFactory(key, label, handleChange(key));

    const capacity = inputForString(CAPACITY, 'Capacity', <Groups/>, '15.5ch', 'number');
    const room = inputForString(ROOM, 'Room', <MeetingRoom />, '15.5ch');
    const fromDate = inputForDate(START_DATE_TIME, 'From');
    const toDate = inputForDate(END_DATE_TIME, 'To');

    return (
        
        <Box>
            {capacity}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                {fromDate}
                {toDate}
            </LocalizationProvider>
            {room}
        </Box>
    )
}

export default ControlPanel