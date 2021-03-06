import React from 'react';

import { Room }     from '../../interface';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent  from '@mui/material/CardContent';
import CardMedia    from '@mui/material/CardMedia';
import Typography   from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useBookingService } from '../../context/bookingservice';

interface RoomCardProps {
    room: Room
}

const RoomCard: React.FunctionComponent<RoomCardProps> = ({room}) => {

    const { name, image, capacity } = room;
    const { updateBooking } = useBookingService();
    return (
        <Grid item xs={4}>
            <Card sx={{ maxWidth: 345 }} onClick={(e) => updateBooking({ room: name })}>
                <CardActionArea >
                    <CardMedia
                        component="img"
                        height="140"
                        image={image}
                        alt={name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {name} cap: {capacity}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
         </Grid>
    )
}

export default RoomCard;