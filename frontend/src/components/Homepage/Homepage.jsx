import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import httpClient from '../../client/httpClient';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function ApplicationList() {
    const classes = useStyles();

    const { push } = useHistory();
    const [balance, setBalance] = useState(0)
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const downloadReport = () => {
        httpClient.download(`${process.env.REACT_APP_API_URL}getreport?start=${startDate.toISOString().split('T')[0]}&end=${endDate.toISOString().split('T')[0]}`);
    };


    useEffect(() => {
        const getBalance = async () => {
            const user = await httpClient.get('user/1');
            console.log(user);
            setBalance(user.balance || 0);
        }

        getBalance()
    }, [push])

    return (
        <div className={classes.root}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Paper>
                    <TableContainer style={{ width: '30%' }}>
                        <Table aria-label="balance information">
                            <TableBody>
                                <TableRow key="currentBalance">
                                    <TableCell>
                                        <Grid container direction="row" alignItems="center">
                                            <Grid item>
                                                <AccountBalanceWalletIcon />
                                            </Grid>
                                            <Grid item>
                                                Balance
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                    <TableCell>€{balance}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <div class={classes.root}>
                        <Button variant="contained" color="primary">Deposit</Button>
                        <Button variant="contained" color="primary">Withdraw</Button>
                    </div>

                    <div class={classes.root}>
                        <Button variant="contained" color="primary" onClick={downloadReport}>Download report</Button>

                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="yyyy/MM/dd"
                            margin="normal"
                            id="date-picker-inline"
                            label="Start date"
                            value={startDate}
                            onChange={handleStartDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />

                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="yyyy/MM/dd"
                            margin="normal"
                            id="date-picker-inline"
                            label="End date"
                            value={endDate}
                            onChange={handleEndDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </div>
                </Paper>
            </MuiPickersUtilsProvider>
        </div>
    );
}
