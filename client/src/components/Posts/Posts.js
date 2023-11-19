import React from 'react'
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';

import Post from './Post/Post.js'
import useStyles from "./styles.js"

export default function Posts({ currentId, setCurrentId }) {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);

  // console.log(posts);

  return (
    !posts.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch">
        {posts.map((post) => (
          <Grid key={post.id} items xs={12} sm={6}>
            <Post post={post} currentId={currentId} setCurrentId={setCurrentId}/>
          </Grid>
        ))}
      </Grid>
    )
  )
}
