import { FormControl, InputLabel, OutlinedInput, InputAdornment } from "@mui/material";
import { ReactElement, useState } from "react";

import TextField from '@mui/material/TextField';

import DateTimePicker from '@mui/lab/DateTimePicker';

export const dateFactory = (key: string, label: string, onChange) => {
    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" >
        <DateTimePicker
            label={label}
            value={key}
            onChange={onChange}
            renderInput={(params) => <TextField {...params} />}
        />
    </FormControl>
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