import React, { useState, useMemo, useEffect} from 'react';

import { createTheme, ThemeProvider } from "@mui/material/styles";

import ColorSwitcher    from "./context/colorswitcher";
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline      from "@mui/material/CssBaseline";
import Container        from "@mui/material/Container";
import AppBar           from "./components/appbar";
import ControlPanel     from "./components/controlpanel";
import BookingState     from './components/bookingstage';
import ListComponent    from './components/list';
import './App.css';
import logo from './logo.png';
import { api } from './constants';

/**
 * App container handles toggling light/dark mode
 */
const App: React.FunctionComponent = () => {

    const [rooms, setRooms] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>();
    /** 
    * ************************************************************************
    *  Handle toggling of dark mode and light mode
    * ************************************************************************
    */
    const [mode, setMode] = React.useState<"light" | "dark">("dark");

    // use a memo to handle toggling, causing app to re render with new mode applied.
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
            },
        }),
        [],
    );

    // use memo so the theme does not switch back on re render
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    primary: {
                        light: '#b29a91',
                        main: '#d8dde3',
                        dark: '#b29a91',
                        contrastText: '#1d1d1e',
                    },
                    secondary: {
                        light: '#b29a91',
                        main: '#b29a91',
                        dark: '#a07763',
                        contrastText: '#000',
                    },
                },
            }),
        [mode],
    );

    const setResponse = (dataFor: 'room' | 'booking') => (response) => response.json().then(data => (dataFor === 'room') ? setRooms(data) : setBookings(data));
    const handleError = (err) => { setError('Failed to contact server') }

    useEffect(() => {
        const doFetch = () => {
            debugger;
            fetch(api.rooms)
                .then(setResponse('room'))
                .catch(handleError)
                .finally(() => setLoading(false));

            fetch(api.bookings)
                .then(setResponse('booking'))
                .catch(handleError)
                .finally(() => setLoading(false));
        };
        doFetch();
    }, []);
    


    return (
        <ColorSwitcher.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xl">
                <CssBaseline />
                    <AppBar />
                    <div className="container">
                        {loading ? <CircularProgress className="splash-image" /> : <img className="splash-image" src={logo} alt="Event Rent Logo" />}
                        <ControlPanel roomNames={rooms.map(item => item.name)}/>
                        <BookingState/>
                        <ListComponent rooms={rooms}/>
                    </div>
                </Container>
            </ThemeProvider>
        </ColorSwitcher.Provider>
     );
}
export default App;