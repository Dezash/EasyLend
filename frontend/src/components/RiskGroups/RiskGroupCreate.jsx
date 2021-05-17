import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Input from '@material-ui/core/Input';
import { useState, useEffect } from 'react';
import httpClient from '../../client/httpClient';
import { useToasts } from 'react-toast-notifications';


export default function RiskGroupEdit(props) {
    const [riskGroup, setRiskGroup] = useState([]);
    const { addToast } = useToasts();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await httpClient.post('riskgroup', riskGroup);
            addToast('Risk group created', { appearance: 'success', autoDismiss: true });
        } catch {
            addToast('Failed to create risk group', { appearance: 'error', autoDismiss: true });
        }
    }

    return (
        <>
            <Typography variant='h2' align='center' gutterBottom>New group</Typography>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <form action="#" onSubmit={e => { handleSubmit(e) }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h5" component="h2">
                                Name
                            </Typography>
                            <Input type="text" name="name" value={riskGroup.name} onChange={e => setRiskGroup({...riskGroup, name: e.target.value})} required />

                            <Typography variant="h5" component="h2">
                                Max loan amount
                            </Typography>
                            <Input type="number" name="maxLoanAmount" value={riskGroup.maxLoanAmount} onChange={e => setRiskGroup({...riskGroup, maxLoanAmount: parseInt(e.target.value)})} required min="0" />
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Create
                        </Button>
                    </Grid>
                </form>
            </Container>
        </>
    );
}
