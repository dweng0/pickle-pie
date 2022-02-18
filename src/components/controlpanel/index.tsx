import React, { JSXElementConstructor, ReactElement } from 'react';
import Box from '@mui/material/Box';

import EventIcon from '@mui/icons-material/Event';
import DateRange from '@mui/icons-material/DateRange';
import MeetingRoom from '@mui/icons-material/MeetingRoom';
import Groups from '@mui/icons-material/Groups';
import formFactory from './formfactory';
import pushQuery from '../../service/querybuilder';

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

    const inputForKey = (key: string, label: string, Icon: React.ReactElement, width?: string, type?: string) => formFactory(key, label, query.get(key), Icon, handleChange(key), width, type);

    const capacity = inputForKey(CAPACITY, 'Capacity', <Groups/>, '15.5ch', 'number');
    const fromDate = inputForKey(START_DATE_TIME, 'From', <EventIcon />, );
    const toDate = inputForKey(END_DATE_TIME, 'To', <DateRange />);
    const room = inputForKey(ROOM, 'Room', <MeetingRoom />, '15.5ch');

    return (
        
        <Box>
            {capacity}
            {fromDate}
            {toDate}
            {room}
        </Box>
    )
}

export default ControlPanel