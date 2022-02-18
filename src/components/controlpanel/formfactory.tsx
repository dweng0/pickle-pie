import { FormControl, InputLabel, OutlinedInput, InputAdornment } from "@mui/material";
import { ReactElement, useState } from "react";

const InputFactory = (key: string, label: string, initialValue:string = '', Icon: ReactElement, handleChange: (event: any) => void, width: string = '25ch', type='text') => {
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
export default InputFactory;