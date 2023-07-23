import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { LoginOutlined } from "@mui/icons-material";
import AuthService from "../../services/auth.service";
import { useState } from "react";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../features/auth/authSlice";
import { setUserLogin } from '../../features/auth/authSlice';


const defaultTheme = createTheme();

const LoginSchema = Yup.object().shape({
    password: Yup.string()
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
});
export default function Login({setLogin}) {
    const user = useSelector(state => state.auth.userLogin)
    const [errMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const changeRegister = () => {
        setLogin(false)
      }

    const formLogin = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: LoginSchema,
        onSubmit: values => {
            let data = {
                email: values.email,
                password: values.password
            }
            AuthService.login(data).then(res => {
                if (res.data.status == 'error') {
                    setErrorMessage(res.data.message)
                } else {
                    let token = res.data.accessToken;
                    localStorage.setItem('token', token);
                    dispatch(setAuth())
                    dispatch(setUserLogin(res.data.payload))
                    if(res.data.payload.role === "user"){
                        navigate('/mainpage')
                    }else{
                        navigate("/comicManager")
                    }
                }
            }).catch(err => {

            })
        }
    })

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        {errMessage && <Alert severity="error">{errMessage}</Alert>}
                        <Box component="form" noValidate onSubmit={formLogin.handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={formLogin.handleChange}
                                value={formLogin.values.email}
                                autoFocus
                                error={formLogin.errors.email && formLogin.touched.email}
                                helperText={formLogin.errors.email && formLogin.touched.email ? formLogin.errors.email : null}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={formLogin.handleChange}
                                value={formLogin.values.password}
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2" onClick={changeRegister}>
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            
                        </Box>
                    </Box>
                    </ThemeProvider>
    );
}