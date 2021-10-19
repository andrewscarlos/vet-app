import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { userAuthenticate, stateReducer } from '../../redux/actions';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignIn = ({userAuthenticate, stateReducer}) => {
    const classes = useStyles();
    const initialState = {
        email: "",
        password: "",
    };

    const { success, loading } = stateReducer;
    const history = useHistory();
    const [values, setValues] = useState(initialState);

    const onSubmit = async (ev) => {
        ev.preventDefault();
        await userAuthenticate(values)
    };

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                history.push('/dashboard')
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    const onChange = (ev) => {
        const { name, value } = ev.target;
        setValues({ ...values, [name]: value });
    };

    return (

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={onSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={onChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            onChange={onChange}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                       
                            <Button

                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                type="submit"
                            >
                                {loading ? ('loading'): ('SingIn')}
                            </Button>
                        
                    </form>
                </div>
                <ToastContainer/>
            </Container>
            
       
    );
};

const mapStateToProps = state => ({
    stateReducer: state.user
})

const mapDispatch = dispatch => bindActionCreators({
    userAuthenticate
}, dispatch)

export default connect(mapStateToProps, mapDispatch)(SignIn);