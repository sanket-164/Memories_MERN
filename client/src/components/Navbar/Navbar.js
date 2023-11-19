import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import decode from 'jwt-decode';

import useStyles from './styles.js'
import memories from '../../images/logo.png'
function Navbar() {

    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
        const token = user?.token;
        
        if(token){
            const decodedToken = decode(token);
            if((decodedToken.exp * 1000) < new Date().getTime()) {
                logout();
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const logout = () => {
        dispatch({ type: 'LOGOUT' });

        navigate('/auth');
    }

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" variant="h3" className={classes.heading} >Memories</Typography>
                <img className={classes.image} src={memories} alt="icon" height="60"></img>
            </div>
            <Toolbar className={classes.toolbar}>
                {user? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userNam} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" color="primary" variant='contained' >Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
