import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "@material-ui/core";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {

    return (
        <BrowserRouter>
            <Container maxWidth="lg">
                <Navbar />
                <Routes>
                    <Route path='/' exact element={<Home />}/>
                    <Route path='/posts' exact element={<Auth />} />
                    <Route path='/posts/search' exact element={<Home />} />
                    <Route path='/posts/:id' exact element={<PostDetails />} />
                    <Route path='/auth' exact element={<Auth />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;