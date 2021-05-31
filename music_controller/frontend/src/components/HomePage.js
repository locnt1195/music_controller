import React, { useEffect, useState } from 'react'
import { BrowserRouter, Link, Redirect, Switch, Route, useHistory} from 'react-router-dom';
import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';
import Room from './Room';
import { Grid, Typography, ButtonGroup, Button } from '@material-ui/core';

function HomePage() {
    const history = useHistory();
    const [roomCode, setRoomCode] = useState(null)

    useEffect(() => {
        fetch("/api/user-in-room")
            .then((response) => response.json())
            .then((data) => {
                if (data.code) {
                    setRoomCode(data.code)
                }
            })
        return () => {
            console.log()
        }
    }, [])

    const removeRoomCode = () => {
        setRoomCode(null)
    }

    const renderHomePage = () => {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                    <Typography variant="h3" compact="h3">
                        House Party
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonGroup disableElevation variant="contained" color="primary">
                        <Button color="primary" to="/join" component={Link}>Join a Room</Button>
                        <Button color="secondary" to="/create" component={Link}>Create a Room</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        );
    }
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact render={() => {
                    return roomCode ? (<Redirect to={`/room/${roomCode}`}/>) : (renderHomePage());
                }}/>
                <Route path='/join' component={RoomJoinPage} exact/>
                <Route path='/create' component={CreateRoomPage} exact/>
                <Route path='/room/:roomCode'
                    render={(props) => (
                        <Room {...props} callBackRemoveCode={removeRoomCode}/>
                    )}/>
            </Switch>
        </BrowserRouter>
    )
}

export default HomePage
