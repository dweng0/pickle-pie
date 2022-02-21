import React    from 'react';
import { Room } from '../../interface';
import ListItem from '../listitem';
import Grid from '@mui/material/Grid';
import { roomList } from './style';

interface ListComponentProps {
    rooms: Array<Room>
}

const ListComponent: React.FunctionComponent<ListComponentProps> = ({ rooms }) => (<Grid sx={roomList} container spacing={1}> {rooms.map(room => <ListItem key={room.name} room={room} />)} </Grid>);
export default ListComponent;