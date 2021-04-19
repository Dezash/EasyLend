import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Input from '@material-ui/core/Input';
import { useState } from 'react';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function ApplyForm(props) {
    const [files, setFiles] = useState([])

    const classes = useStyles();

    const handleSubmit = (event) => {
        event.preventDefault();
        createApplication(files)
    }

    const uploadFile = (event, name) => {
        const newFiles = { ...files, [name]: event.target.files[0] }
        setFiles(newFiles)
    }

    const createApplication = async (files) => {
        //console.log(files)
        const formData = new FormData();

        formData.append(
            "file",
            files.passport,
            files.passport.name
        );

        formData.append(
            "file",
            files.statement,
            files.statement.name
        );

        const response = axios.post(`${process.env.REACT_APP_API_URL}applications`, formData);
        await response.data

        props.history.push('/');
    }

    return (
        <>
            <Typography variant='h2' align='center' gutterBottom>Borrower application</Typography>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <form action="#" onSubmit={e => { handleSubmit(e) }} className={classes.form}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h5" component="h2">
                                    Photo of passport or ID card
                            </Typography>
                                <Input type="file" name="file" onChange={(e) => uploadFile(e, "passport")} required inputProps={{ accept: "image/jpeg,image/gif,image/png,application/pdf,image/x-eps" }} />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5" component="h2">
                                    Bank statement
                            </Typography>
                                <Input type="file" name="file" onChange={(e) => uploadFile(e, "statement")} required inputProps={{ accept: "application/pdf" }} />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Apply
          </Button>
                    </form>
                </div>
            </Container>
        </>
    );
}