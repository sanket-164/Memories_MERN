import React from 'react'
import { useState, useEffect } from 'react';
import useStyles from "./styles.js"
import { useSelector, useDispatch } from "react-redux";

import { createPost, updatePost } from '../../actions/posts.js';

import FileBase from "react-file-base64";
import { Paper, Button, Typography, TextField } from "@material-ui/core";

export default function Form({ currentId, setCurrentId }) {
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
        }
    }

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h4" align="center"> Please Sign In to create memories and like others</Typography>
            </Paper>
        )
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({ title: '', message: '', tags: '', selectedFile: '' });
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
                <TextField name="title" variant='outlined' label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField name="tags" variant='outlined' label="Tags (Comma Separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}></FileBase></div>
                <Button variant="contained" color="secondary" size="medium" onClick={clear} fullWidth style={{ margin: '5px' }}>Clear</Button>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth style={{ margin: '5px' }}>Submit</Button>
            </form>
        </Paper>
    )
}
