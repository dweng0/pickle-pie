import react, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import { useBookingService } from '../../context/bookingservice';
import { steps, Step as IStep} from './services';
import Typography from '@mui/material/Typography';

export default function HorizontalNonLinearStepper() {

    const { currentBookingProcess }     = useBookingService();
    const [activeStep, setActiveStep]   = useState<number>(0);
    const [completed, setCompleted] = useState<Array<IStep>>([]);

    const allStepsCompleted             = () => steps.length === completed.length;
    const checkCompleteness = (testKey) => {
        const result = completed.find(({key}) => key === testKey);
        return !!(result);
    }

    /**
     * IT: updates the completed steps list and active step list
     * WHEN: the c
     */
    useEffect(() => {
        const bookingKeys = Object.keys(currentBookingProcess);
        console.log('called');
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


    return (
        <Box sx={{ width: '90%', margin: 'auto' }}>
                {allStepsCompleted() ? (
                    <>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            So you've booked [usebooking hook to get details here]
                        </Typography>
                    </>
                ) : null}
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