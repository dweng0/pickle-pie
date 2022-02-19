import { FormControl, InputLabel, OutlinedInput, InputAdornment } from "@mui/material";
import { ReactElement, useState } from "react";
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';

import MobileDatePicker from '@mui/lab/MobileDatePicker';
import TimePicker from "@mui/lab/MobileTimePicker";
import Autocomplete from '@mui/material/Autocomplete';
import { URL_DATE_FORMAT, URL_TIME_FORMAT } from "../../constants";

export const timeFactory = (key: string, label: string, onChange, initialValue: string = dayjs().format(URL_TIME_FORMAT)) => {

    const [value, setValue] = useState(dayjs(initialValue, URL_TIME_FORMAT));
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

export const dateFactory = (key: string, label: string, onChange, initialValue: string = dayjs().format(URL_DATE_FORMAT)) => {
  
    const [value, setValue] = useState(dayjs(initialValue, URL_DATE_FORMAT));
    const localOnChange = (value) => {
        setValue(value);
        return onChange(value);
    }
    return (
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" >
            <MobileDatePicker
                label={label}
                inputFormat={URL_DATE_FORMAT}
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
                label={key}
            />
        </FormControl>
    );   
}

export const autoCompleteFactory = (key: string, label: string, onChange, list) => {
    
    return (
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" >
            <Autocomplete
                disablePortal
                id={key}
                options={list}
                renderInput={(params) => <TextField {...params} label={label} />}
            />
        </FormControl>
    );
}