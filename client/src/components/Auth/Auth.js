import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

import { signIn, signUp } from '../../actions/auth.js'
import useStyles from './styles.js';
import Input from './Input.js';
import Icon from './Icon.js';

const initalState = { firstname: '', lastname: '', email: '', password: '', confirmPassword: '' }
function Auth() {
    const [showPass, setShowPass] = useState(false);
    const [formData, setFormData] = useState(initalState);
    const [isSignUp, setIsSignUp] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    gapi.load('client:auth2', () => {
        gapi.client.init({
            // Enter your client id here
            clientId: "***********************************cvm.apps.googleusercontent.com",
            scope: 'email',
        })
    });

    const handleShowPassword = () => {
        setShowPass((prevShowPass) => !prevShowPass);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignUp) {
            dispatch(signUp(formData, navigate));
        } else {
            dispatch(signIn(formData, navigate));
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const switchMode = () => {
        setIsSignUp(!isSignUp);
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: "AUTH", data: { result, token } });

            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }

    const googleFailure = (error) => {
        console.log(error)
        console.log("Google Sign In was Unsuccessful");
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5" component="h1">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignUp && (
                            <>
                                <Input name="firstname" label="First Name" handleChange={handleChange} autoFocus half></Input>
                                <Input name="lastname" label="Last Name" handleChange={handleChange} half></Input>
                            </>
                        )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPass ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignUp && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />}
                    </Grid>

                    <Button className={classes.submit} type="submit" fullWidth variant="contained" color="primary">{isSignUp ? 'Sign Up' : 'Sign In'}</Button>

                            // Enter your client id here
                    <GoogleLogin clientId="***********************************cvm.apps.googleusercontent.com" render={(renderProps) => (
                        <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">Google Sign In</Button>
                    )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />

                    <Grid container justify='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? 'Sign In' : 'Sign Up'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
