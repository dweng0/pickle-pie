import { FormControl, InputLabel, OutlinedInput, InputAdornment } from "@mui/material";
import { ReactElement, ChangeEventHandler } from "react";

const InputFactory = (key: string, label: string, Icon: ReactElement, handleChange: (event: any) => void, width: string = '25ch') => {
    return (
        <FormControl sx={{ m: 1, width }} variant="outlined" >
            <InputLabel htmlFor={key}> {label} </InputLabel>
            <OutlinedInput
                id={key}
                type={'text'}
                value={''}
                onChange={handleChange}
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