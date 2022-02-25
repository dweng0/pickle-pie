import React    from 'react';
import ListItem from '../listitem';
import Grid from '@mui/material/Grid';
import { roomList } from './style';
import { useBookingService } from '../../context/bookingservice';
import CircularProgress from '@mui/material/CircularProgress';
import { getClashingBookings } from './services';
import { Room } from '../../interface';

const ListComponent: React.FunctionComponent = () => {
    const { availableRooms, roomsLoading, currentBookingProcess, allBookings } = useBookingService();
    
    if (roomsLoading) {
        return <div style={{margin: 'auto'}}> <CircularProgress/></div>
    }

    // filter down list based on current booking service
    let rooms: Array<Room> = availableRooms;
    if (currentBookingProcess.capacity) {
       rooms = rooms.filter(room => room.capacity > currentBookingProcess.capacity);
    }

    //reduce by dates
    if (currentBookingProcess.from && currentBookingProcess.startTime && currentBookingProcess.endTime) {
        rooms = allBookings.filter(getClashingBookings(currentBookingProcess)).map(booking => booking.room);        
    }

    return (<Grid sx={roomList} container spacing={1}> {rooms.map(room => <ListItem key={room.name} room={room} />)} </Grid>);
}
export default ListComponent;