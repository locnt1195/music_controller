import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import CreateRoomPage from './CreateRoomPage';


export default function Room(props) {
    const [guestCanPause, setGuestCanPause] = useState(false);
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [isHost, setIsHost] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const roomCode = props.match.params.roomCode;
    const history = useHistory()

    const getRoomDetails = () => {
        fetch("/api/get-room" + "?code=" + roomCode)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setGuestCanPause(data.guest_can_pause);
                setVotesToSkip(data.votes_to_skip);
                setIsHost(data.is_host);
            })
    };

    useEffect(() => {
        getRoomDetails();
    }, []);

    const leaveButtonPressed = (e) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                room_code: roomCode
            }),
        };
        console.log(requestOptions)
        fetch("/api/user-leave-room", requestOptions)
            .then((response) => {
                if (response.ok) {
                    props.callBackRemoveCode();
                    history.push("/");
                } else {
                    setError("Room not found.");
                }
            }).catch((err) => {
                console.log(err);
            })
    };

    const updateShowSettings = (value) => {
        setShowSettings(value);
    }

    const renderSettings = () => {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <CreateRoomPage 
                        update={true}
                        votesToSkip={votesToSkip}
                        guestCanPause={guestCanPause}
                        roomCode={roomCode}
                        updateCallBack={() => {}}
                    />
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color="secondary" variant="contained" onClick={() => updateShowSettings(false)}>
                        Close
                    </Button>
                </Grid>
            </Grid>
        )
    }

    const renderSettingsButton = () => {
        return (
            <Grid item  xs={12} align="center">
                <Button color="secondary" variant="contained" onClick={() => updateShowSettings(true)}>
                    Settings
                </Button>
            </Grid>
        );
    }

    if (showSettings) {
        return renderSettings()
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                    Code: {roomCode}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Votes: {votesToSkip}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Guest Can Pause: {guestCanPause.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Host: {isHost.toString()}
                </Typography>
            </Grid>
            {isHost && renderSettingsButton()}
            <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" onClick={leaveButtonPressed}>
                    Leave Room
                </Button>
            </Grid>
        </Grid>
    )
}
// <div>
//     <h3>{roomCode}</h3>
//     <p>Votes {votesToSkip}</p>
//     <p>Guest Can Pause: {guestCanPause.toString()}</p>
//     <p>Host: {isHost.toString()}</p>
// </div>