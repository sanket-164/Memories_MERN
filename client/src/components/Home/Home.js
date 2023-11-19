import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { Container, Grow, Grid, Paper } from "@material-ui/core"

import { getPosts } from "../../actions/posts.js";
import Pagination from '../Pagination.js';
import Posts from "../Posts/Posts.js"
import Form from "../Form/Form.js"

function Home() {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return (
        <Grow in>
            <Container>
                <Grid container justifyContent="space-between" alignItems="stretch">
                    <Grid items xs={12} sm={7}>
                        <Posts currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid items xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        <Paper elevation={6}>
                            <Pagination />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
