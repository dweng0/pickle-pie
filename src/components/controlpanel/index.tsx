import React, { JSXElementConstructor, ReactElement } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import Button from '@mui/material/Button';

import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';

import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import EventIcon from '@mui/icons-material/Event';
import DateRange from '@mui/icons-material/DateRange';
import MeetingRoom from '@mui/icons-material/MeetingRoom';
import Groups from '@mui/icons-material/Groups';
//Hail
import Grid from '@mui/material/Grid';
import formFactory from './formfactory';

const ControlPanel: React.FunctionComponent = () => {

    const handleChange = (key) => (e:any) => console.log(key, e);


    const capacity = formFactory('capacity', 'Capacity', <Groups />, handleChange('capacity'), '15.5ch');
    const fromDate = formFactory('from', 'From', <EventIcon />, handleChange('from'));
    const toDate = formFactory('to', 'To', <DateRange />, handleChange('to'));
    const room = formFactory('room', 'Room', <MeetingRoom />, handleChange('room'), '15.5ch');

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