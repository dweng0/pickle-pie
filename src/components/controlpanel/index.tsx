import React, { JSXElementConstructor, ReactElement } from 'react';
import Box from '@mui/material/Box';

import MeetingRoom from '@mui/icons-material/MeetingRoom';
import Groups from '@mui/icons-material/Groups';
import { inputFactory, dateFactory, timeFactory, autoCompleteFactory } from './formfactory';
import { pushQuery, getQuery} from '../../service/querybuilder';
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { ControlPanelProps } from './interface';
import dayjs from 'dayjs';
import { URL_DATE_FORMAT, URL_TIME_FORMAT } from '../../constants';

const CAPACITY = 'capacity';
const START_DATE_TIME = 'from';
const START_TIME = 'startTime';
const END_TIME = 'endTime';
const ROOM = 'room';

const ControlPanel: React.FunctionComponent<ControlPanelProps> = ({ roomNames, selectedRoomFromList}) => {

    const handleChange = (key) => (value: any) => {
        pushQuery({ key, value });
    };

    const handleChangeForDate = (key) => (value: any) => {
        if (value) {
            try {
                pushQuery({ key, value: dayjs(value).format(URL_DATE_FORMAT).toString() });
            } catch {
                console.log('Todo capture failed event');
            }
        }
    }

    const handleChangeForTime = (key) => (value: any) => {
        if (value) {
            try {
                pushQuery({ key, value: dayjs(value).format(URL_TIME_FORMAT).toString() });
            } catch {
                console.log('Todo capture failed event');
            }
        }
    }


    /**
     * HoC functions that call relevant input factories
     */
    const inputForString = (key: string, label: string, Icon: React.ReactElement, width?: string, type?: string) => inputFactory(key, label, getQuery(key), Icon, handleChange(key), width, type);
    const inputForDate = (key: string, label: string) => dateFactory(key, label, handleChangeForDate(key), getQuery(key));
    const inputForTime = (key: string, label: string) => timeFactory(key, label, handleChangeForTime(key), getQuery(key));
    const inputForAutoComplete = (key: string, label: string, suggestions: Array<string>) => autoCompleteFactory(key, label, handleChange(key), suggestions);

    /**
     * Factory inputs
     */
    const capacity = inputForString(CAPACITY, 'Capacity', <Groups/>, '15.5ch', 'number');
    const fromDate = inputForDate(START_DATE_TIME, 'On');
    const startTime = inputForTime(START_TIME, 'Starts');
    const endTime = inputForTime(END_TIME, 'Ends');
    const roomAutoComplete = inputForAutoComplete(ROOM, 'Rooms', roomNames)
    
    return (
        <Box>
            {capacity}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                {fromDate}
                {startTime}
                {endTime}
            </LocalizationProvider>
            {roomAutoComplete}
        </Box>
    )
}

export default ControlPanel