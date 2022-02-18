import React from "react";
import Box from "@mui/material/Box";
import { toggleWrapper } from "./style";
import ThemeToggle from "../themetoggle";

/**
 * Nav bar component, wraps theme toggle and StatusBar
 * {@see ThemeToggle }
 * {@see StatusBar }
 */
const NavBar: React.FunctionComponent = () => {
    return (
        <Box sx={toggleWrapper}>
            <ThemeToggle />
        </Box>
    )
}
export default NavBar;