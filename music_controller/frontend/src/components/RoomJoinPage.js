import React, { useState } from 'react'
import { TextField, Button, Grid, Typography } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom';

function RoomJoinPage() {
    const [error, setError] = useState('');
    const [roomCode, setRoomCode] = useState('');
    const history = useHistory();

    const onRoomCodeChanged = ({target}) => {
        setRoomCode(target.value);
    }

    const onRoomClicked = () => {
        console.log("===roomcode", roomCode)
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                code: roomCode
            }),
        };
        console.log(requestOptions)
        fetch("/api/join-room", requestOptions)
            .then((response) => {
                if (response.ok) {
                    history.push("/room/" + roomCode);
                } else {
                    setError("Room not found.");
                }
            }).catch((err) => {
                console.log(err);
            })
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">Join a Room</Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <TextField
                    error={error}
                    label="Code"
                    placeholder="Enter a Room Code"
                    value={roomCode}
                    helperText={error}
                    variant="outlined"
                    onChange={onRoomCodeChanged}
                />
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="primary" variant="contained" onClick={onRoomClicked}>
                    Enter Room
                </Button>
            </Grid>

            <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" to="/" component={Link}>
                    Back
                </Button>
            </Grid>
        </Grid>
    )
}

export default RoomJoinPage
