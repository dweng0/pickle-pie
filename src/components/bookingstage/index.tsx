import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {
    useLocation
} from "react-router-dom";

const steps = [
    'Capacity',
    'Date',
    'Start time',
    'End Time',
    'Room'
];
interface QueryParams  {
    capacity: number,
    date: string,
    from: string,
    to: string,
};

const BookingState: React.FunctionComponent = () => {

    let location = useLocation();
    const [queries, setQueries] = useState();
    useEffect(() => {
        console.log(location.search);
        //set queries based on the search part of the location obj
    }, [location]);

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={1} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
}

export default BookingState;