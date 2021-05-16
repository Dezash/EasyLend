import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import axios from 'axios';
import { EventBusy } from '@material-ui/icons';
import EuroIcon from '@material-ui/icons/Euro';
import httpClient from '../../client/httpClient';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useToasts } from 'react-toast-notifications';

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
    textfield: {
        margin: theme.spacing(1),
        width: '50ch',
    }
}));

export default function WithdrawForm(props) {
    const classes = useStyles();
    const [iban, setIban] = useState('');
    const [amount, setAmount] = useState('');
    const { addToast } = useToasts();

    const handleSubmit = (event) => {
        event.preventDefault();
        requestWithdraw()
    }

    const requestWithdraw = async () => {
        try{
            var result = await axios.put(`Bank/withdraw?amount=${amount}&iban=${iban}`);
            addToast('Withdrawal request sent!', { appearance: 'success' });
        }catch {
            addToast('Withdrawal request failed!', { appearance: 'error' });
        }
    }

    return (
        <>
            <Typography variant='h2' align='center' gutterBottom>Withdrawal form</Typography>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <form action="#" onSubmit={e => { handleSubmit(e) }} className={classes.form}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h5" component="h2">
                                    IBAN
                            </Typography>
                                <TextField
                                    required label="Enter your IBAN" variant="outlined" className={classes.textfield} value={iban} onInput={e=>setIban(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5" component="h2">
                                    Withdraw amount
                            </Typography>
                            
                            <TextField
                                    required label="Enter amount to withdraw" variant="outlined" className={classes.textfield} type="number" value={amount} onInput={e=>setAmount(e.target.value)} 
                                    InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <EuroIcon />
                                          </InputAdornment>
                                        ),
                                      }}
                            />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Withdraw
                        </Button>
                    </form>
                </div>
            </Container>
        </>
    );
}