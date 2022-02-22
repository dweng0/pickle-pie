import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useBookingService } from '../../context/bookingservice';

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

    const { currentBookingProcess } = useBookingService()
    const [activeStep, setActiveStep] = useState(0);

    let currentProcess = 0;

    if (currentBookingProcess.capacity) {
        currentProcess
    }
    
    
    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep} alternativeLabel>
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