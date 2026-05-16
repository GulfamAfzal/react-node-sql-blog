import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { 
    Grid, 
    Typography, 
    Box, 
    Card, 
    CardContent, 
    CardMedia, 
    CardActionArea,
    Paper
} from "@material-ui/core";

function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);
    const { authState } = useContext(AuthContext);
    let navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";

    useEffect(() => {
        axios.get(`${apiUrl}/posts`, {
            headers: { accessToken: localStorage.getItem("accessToken") },
        }).then((response) => {
            setListOfPosts(response.data.listOfPosts);
        });
    }, []);

    return (
        <Box>
            {/* Attractive Hero Section */}
            <Paper elevation={0} className="heroSection">
                <Typography variant="h2" gutterBottom>Welcome to DevOps Blog</Typography>
                <Typography variant="h5">
                    Exploring Cloud Architecture, CI/CD, and DevSecOps
                </Typography>
            </Paper>

            {/* Aesthetic Post Grid */}
            <Grid container spacing={4}>
                {listOfPosts.map((value, key) => (
                    <Grid item xs={12} sm={6} md={4} key={key}>
                        <Card className="modernCard">
                            <CardActionArea onClick={() => navigate(`/post/${value.id}`)}>
                                <CardMedia
                                    component="img"
                                    alt="Post Image"
                                    height="200"
                                    image={`${apiUrl}/${value.image}`}
                                    title={value.title}
                                    style={{ objectFit: 'cover' }}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2" className="cardTitle">
                                        {value.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Posted by: <Link to={`/profile/${value.UserId}`} style={{ color: '#2196F3', textDecoration: 'none' }}>
                                            {value.username}
                                        </Link>
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default Home;