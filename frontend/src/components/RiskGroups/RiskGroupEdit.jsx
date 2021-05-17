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
    const riskGroupId = props.match.params.id;
    const [riskGroup, setRiskGroup] = useState([]);
    const { addToast } = useToasts();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await httpClient.put(`riskgroup/${riskGroupId}`, riskGroup);
            addToast('Risk group updated', { appearance: 'success', autoDismiss: true });
        } catch {
            addToast('Failed to update risk group', { appearance: 'error', autoDismiss: true });
        }
    }

    useEffect(() => {
        const getRiskGroup = async (id) => {
            const riskGroup = await httpClient.get(`riskgroup/${id}`);
            console.log(riskGroup);
            setRiskGroup(riskGroup);
        }

        getRiskGroup(riskGroupId)
    }, [riskGroupId])

    return (
        <>
            <Typography variant='h2' align='center' gutterBottom>Edit group</Typography>
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
                            Update
                        </Button>
                    </Grid>
                </form>
            </Container>
        </>
    );
}
