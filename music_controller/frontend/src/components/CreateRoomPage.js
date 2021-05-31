import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { Link, useHistory } from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';


export default function CreateRoomPage(props) {
    const [guestCanPause, setGuestCanPause] = useState(props.guestCanPause);
    const [votesToSkip, setVotesToSkip] = useState(props.votesToSkip);
    const isUpdate = props.update;
    const history = useHistory();

    const handleVotesChanged = (e) => {
        setVotesToSkip(e.target.value);
    }

    const handleGuestCanPauseChanged = (e) => {
        setGuestCanPause(e.target.value === 'true' ? true : false);
    }

    const handleRoomClicked = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                votes_to_skip: votesToSkip,
                guest_can_pause: guestCanPause
            }),
        };
        fetch(`/api/create-room`, requestOptions)
            .then((response) => response.json())
            .then((data) => history.push("/room/" + data.code))
    }

    const handlUpdateRoomClicked = () => {
        const requestOptions = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                votes_to_skip: votesToSkip,
                guest_can_pause: guestCanPause,
                code: props.roomCode
            }),
        };
        fetch(`/api/update-room`, requestOptions)
            .then((response) => response.json())
            .then((data) => history.push("/room/" + data.code, {update: false}))

    }

    const renderButtons = () => {
        console.log(isUpdate);
        if (isUpdate) {
            return (
                <Grid item xs={12} align="center">
                    <Button color="primary" variant="contained" onClick={handlUpdateRoomClicked}>
                       Update Room
                    </Button>
                </Grid>
            )
        }
        return (
            <Grid item xs={12} align="center">
                <Button color="primary" variant="contained" onClick={handleRoomClicked}>
                    Create a Room
                </Button>
            </Grid>
        )
    }

    return (
        <Grid container spacing={1} >
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                    {isUpdate ? 'Update' : 'Create'} a Room
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormHelperText>
                        <div align="center">
                            Guest Control of Playback State
                        </div>
                    </FormHelperText>
                    <RadioGroup row defaultValue={guestCanPause ? "true" : "false"} onChange={handleGuestCanPauseChanged}>
                        <FormControlLabel
                            value="true"
                            control={<Radio color="primary" />}
                            label="Play/Pause"
                            labelPlacement="bottom"/>
                        <FormControlLabel
                            value="false"
                            control={<Radio color="secondary" />}
                            label="No Control"
                            labelPlacement="bottom"/>
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl >
                    <TextField
                        required={true}
                        type="number"
                        defaultValue={votesToSkip}
                        inputProps={{
                            min: 1,
                            style: {
                                textAlign: 'center',
                            }
                        }}
                        onChange={handleVotesChanged}
                    />
                    <FormHelperText>
                        <div align="center">Votes Required To Skip Song</div>
                    </FormHelperText>
                </FormControl>
            </Grid>
            {renderButtons()}
            <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" to="/" component={Link}>
                    Back
                </Button>
            </Grid>
        </Grid>
    )
}

CreateRoomPage.defaultProps = {
    guestCanPause: true,
    votesToSkip: 2,
    update: false,
    roomCode: null,
    updateCallBack: () => {}
}
