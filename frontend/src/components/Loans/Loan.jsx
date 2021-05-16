import {
    Typography,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button,
    ButtonGroup,
} from '@material-ui/core';


import { ThemeProvider } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import 'react-confirm-alert/src/react-confirm-alert.css';
import React from 'react';
import httpClient from '../../client/httpClient';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PaymentIcon from '@material-ui/icons/Payment';
import TollIcon from '@material-ui/icons/Toll';
import EventIcon from '@material-ui/icons/Event';
import EventBusyIcon from '@material-ui/icons/EventBusy';


const Loan = (props) => {
    const loanId = props.match.params.id;
    const [loan, setLoan] = useState({});
    const { addToast } = useToasts();

    useEffect(() => {
        const getLoan = async (id) => {
            const loan = await httpClient.get(`loans/${id}`);
            console.log(loan);
            setLoan(loan);
        }

        getLoan(loanId)
    }, [loanId])

    const returnLoan = async () => {
        const status = await httpClient.get(`returnloan/${loan.id}`);
        if (status.errorMessage) {
            addToast(status.errorMessage, { appearance: 'error', autoDismiss: true });
        }
        else {
            addToast('Loan returned', { appearance: 'success' });
            props.history.push('/loans');
        }
    }

    return (
        <ThemeProvider>
            <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', right: 30 }}>
                    <ButtonGroup
                        variant="contained"
                        color="primary"
                        aria-label="full-width contained primary button group"
                    >
                        <Button color="primary" onClick={() => { returnLoan() }}>Return loan</Button>
                    </ButtonGroup>
                </div>
            </div>
            <Divider />
            <Typography variant="h5" component="h2" style={{ margin: '20px' }}>
                Loan info
                </Typography>
            <Divider style={{ margin: '0 20px' }} />
            <Grid container spacing={2}>
                <Grid item xs>
                    <List>
                        <ListItem key="amount">
                            <ListItemIcon>
                                <MonetizationOnIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                                primary="Amount"
                                secondary={loan.amount}
                            />
                        </ListItem>
                        <ListItem key="interestRate">
                            <ListItemIcon>
                                <TollIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                                primary="Interst rate"
                                secondary={`%${loan.interestRate}`}
                            />
                        </ListItem>
                        <ListItem key="amountToPay">
                            <ListItemIcon>
                                <PaymentIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                                primary="Amount to pay"
                                secondary={`%${loan.amountToPay}`}
                            />
                        </ListItem>
                        <ListItem key="startDate">
                            <ListItemIcon>
                                <EventIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                                primary="Start date"
                                secondary={`%${loan.startDate}`}
                            />
                        </ListItem>
                        <ListItem key="endDate">
                            <ListItemIcon>
                                <EventBusyIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                                primary="Deadline"
                                secondary={`%${loan.endDate}`}
                            />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </ThemeProvider>

    );
}

export default Loan;