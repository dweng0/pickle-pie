import { FormControl, InputLabel, OutlinedInput, InputAdornment } from "@mui/material";
import { ReactElement, useState } from "react";
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';

import MobileDatePicker from '@mui/lab/MobileDatePicker';
import TimePicker from "@mui/lab/MobileTimePicker";

export const timeFactory = (key: string, label: string, onChange, initialValue: string = dayjs().format()) => {
    
    const [value, setValue] = useState(initialValue);
    console.log(value);
    const localOnChange = (value) => {
        setValue(value);
        return onChange(value);
    }
    return (
        <FormControl sx={{ m: 1, width: '15ch' }} variant="outlined" >
        <TimePicker
            label={label}
            value={value}
            onChange={localOnChange}
            renderInput={(params) => <TextField {...params} />}
            />
        </FormControl>
    );
}

export const dateFactory = (key: string, label: string, onChange, initialValue: string = dayjs().format()) => {
    const [value, setValue] = useState(initialValue);
    const localOnChange = (value) => {
        setValue(value);
        return onChange(value);
    }
    return (
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" >
            <MobileDatePicker
                label={label}
                inputFormat="MM/dd/yyyy"
                value={value}
                onChange={localOnChange}
                renderInput={(params) => <TextField {...params} />}
            />
        </FormControl>
    );
    
}

export const inputFactory = (key: string, label: string, initialValue:string = '', Icon: ReactElement, handleChange: (event: any) => void, width: string = '25ch', type='text') => {
    const [value, setValue] = useState(initialValue);
    const onChange = (event) => {
        setValue(event.target.value);
        return handleChange(event.target.value);
    }
    return (
        <FormControl sx={{ m: 1, width }} variant="outlined" >
            <InputLabel htmlFor={key}> {label} </InputLabel>
            <OutlinedInput
                id={key}
                type={type}
                value={value}
                onChange={onChange}
                endAdornment={
                    <InputAdornment position="end">
                        {Icon}
                    </InputAdornment>
                }
                label = {key}
            />
        </FormControl>
        )
   
}