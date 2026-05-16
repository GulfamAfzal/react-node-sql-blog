import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from 'axios';
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";

// MUI Components for a professional UI
import { AppBar, Toolbar, Typography, Button, Container, Box, Paper } from "@material-ui/core";

function App() {
    const [authState, setAuthState] = useState({ username: "", id: 0, status: false });

    useEffect(() => {
        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";
        axios.get(`${apiUrl}/auth/auth`, {
            headers: { accessToken: localStorage.getItem("accessToken") },
        }).then((response) => {
            if (response.data.error) {
                setAuthState({ ...authState, status: false });
            } else {
                setAuthState({ username: response.data.username, id: response.data.id, status: true });
            }
        });
    }, []);

    const logout = () => {
        localStorage.removeItem("accessToken");
        setAuthState({ username: "", id: 0, status: false });
    };

    return (
        <div className="App">
            <AuthContext.Provider value={{ authState, setAuthState }}>
                <Router>
                    <AppBar position="sticky" elevation={4} style={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}>
                        <Toolbar>
                            <Typography variant="h5" style={{ flexGrow: 1, fontWeight: 'bold', letterSpacing: '1px' }}>
                                DEVOPS BLOG
                            </Typography>
                            <Box className="links">
                                <Button component={Link} to="/" color="inherit">Home</Button>
                                {authState.status ? (
                                    <>
                                        <Button component={Link} to="/createpost" color="inherit">Create Post</Button>
                                        <Button onClick={logout} variant="outlined" color="inherit" style={{ marginLeft: '10px' }}>Logout</Button>
                                    </>
                                ) : (
                                    <>
                                        <Button component={Link} to="/login" color="inherit">Login</Button>
                                        <Button component={Link} to="/registration" variant="contained" color="secondary" style={{ marginLeft: '10px' }}>Register</Button>
                                    </>
                                )}
                            </Box>
                        </Toolbar>
                    </AppBar>

                    <Container maxWidth="lg" style={{ marginTop: '40px', paddingBottom: '40px' }}>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/createpost' element={<CreatePost />} />
                            <Route path="/post/:id" element={<Post />} />
                            <Route path="/registration" element={<Registration />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/profile/:id" element={<Profile />} />
                            <Route path="*" element={<PageNotFound />} />
                        </Routes>
                    </Container>
                </Router>
            </AuthContext.Provider>
        </div>
    );
}

export default App;