import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Input from '@material-ui/core/Input';
import { useState } from 'react';
import httpClient from '../../client/httpClient';


export default function LoanForm(props) {
    const [amount, setAmount] = useState([])

    const handleSubmit = async (event) => {
        event.preventDefault();
        await httpClient.post('loans', { amount });
        props.history.push('/loans');
    }

    return (
        <>
            <Typography variant='h2' align='center' gutterBottom>Request loan</Typography>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <form action="#" onSubmit={e => { handleSubmit(e) }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h5" component="h2">
                                Amount
                                </Typography>
                            <Input type="number" name="amount" value={amount} onChange={e => setAmount(e.target.value)} required min="1" />
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Request
                        </Button>
                    </Grid>
                </form>
            </Container>
        </>
    );
}
