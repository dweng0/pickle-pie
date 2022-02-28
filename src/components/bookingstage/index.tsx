import react, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
    
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import { useBookingService } from '../../context/bookingservice';
import { steps, Step as IStep} from './services';
import Typography from '@mui/material/Typography';
import { URL_DATE_FORMAT, URL_TIME_FORMAT } from '../../constants';

// no types for duration in the duration plugin? will raise a pr to get it into the open code after the fact.
declare module 'dayjs' {
    interface Dayjs {
        duration: (dateTime?: any) => any
    }
}

export default function HorizontalNonLinearStepper() {
    
    const { currentBookingProcess, warnings, saveBooking }  = useBookingService();
    const [activeStep, setActiveStep]                       = useState<number>(0);
    const [completed, setCompleted]                         = useState<Array<IStep>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    dayjs.extend(duration);
    dayjs.extend(relativeTime)

    const allStepsCompleted = () => steps.length === completed.length;
    const checkCompleteness = (testKey) => {
        const result = completed.find(({key}) => key === testKey);
        return !!(result);
    }

    /**
     * IT: updates the completed steps list and active step list
     * WHEN: the currentBookingProcess changes
     */
    useEffect(() => {
        const bookingKeys = Object.keys(currentBookingProcess);
        const buildCompleteSteps = (acc, currentKey) => {
            const result = currentBookingProcess[currentKey];
            if (result) {
                acc.push(steps.find(item => item.key === currentKey));
            }
            return acc;
        };

        const completedSteps = bookingKeys.reduce(buildCompleteSteps, []);
        setActiveStep(completedSteps.length);

        setCompleted(completedSteps);
    }, [currentBookingProcess, setCompleted, setActiveStep]);

    const pluralOrSingular = (num: number) => num > 1 ? 'people' : 'person';

    const friendlyText = () => {
        const { room, from, startTime, endTime, capacity } = currentBookingProcess;

        const start = dayjs(startTime);
        const end = dayjs(endTime);
        const duration = dayjs.duration(start.diff(end)).humanize();
        const date = dayjs(from).format('dddd MMMM D');

        return `You are about to book a timeslot that is ${duration} long. For ${room} on ${date}. For ${capacity} ${pluralOrSingular(capacity)}. Starting at ${start.format(URL_TIME_FORMAT)}`;
    };

    return (
        <Box sx={{ width: '90%', margin: 'auto' }}>
            <div className={'fade-in'} style={{height: '250px', margin: 'auto', textAlign: 'center', marginBottom: '60px'}}>
                    {(allStepsCompleted() && warnings.length === 0)? (
                            <>
                                <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
                                    {friendlyText()}
                                </Typography>
                        <Button size="large" variant="contained" color="success" onClick={() => { setLoading(true); saveBooking().then(() => setLoading(false)) }}>
                                    Submit Booking
                                </Button>
                            </>
                ) : null}
                {warnings ? (
                    <Typography sx={{ mt: 2, mb: 1, color: 'tomato' }}>{warnings}</Typography>) : null}
            </div>
                <Box sx={{ width: '100%' }}>
                    <Stepper nonLinear activeStep={activeStep}>
                        {steps.map(({ label, key }, index) => (
                            <Step key={key} completed={checkCompleteness(key)}>
                                <StepButton color="inherit">
                                    {label}
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
            
        </Box>
        
    );
}