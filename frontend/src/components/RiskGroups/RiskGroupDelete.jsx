import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { useState, useEffect } from 'react';
import httpClient from '../../client/httpClient';
import { useToasts } from 'react-toast-notifications';


export default function RiskGroupEdit(props) {
    const riskGroupId = props.match.params.id;
    const [riskGroups, setRiskGroups] = useState([]);
    const [transferGroupId, setTransferGroupId] = useState();
    const { addToast } = useToasts();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await httpClient.delete(`riskgroup/${riskGroupId}`, {transferGroupId});
            addToast('Risk group deleted', { appearance: 'success', autoDismiss: true });
        } catch {
            addToast('Failed to delete risk group', { appearance: 'error', autoDismiss: true });
        }
    }

    useEffect(() => {
        const getRiskGroups = async (id) => {
            const response = await httpClient.get(`riskgroup`);
            const filtered = response.filter((group) => group.id !== id);
            console.log(filtered, id);
            setTransferGroupId(filtered[0].id);
            setRiskGroups(filtered);
        }

        getRiskGroups(parseInt(riskGroupId))
    }, [riskGroupId])

    return (
        <>
            <Typography variant='h2' align='center' gutterBottom>Group deletion</Typography>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <form action="#" onSubmit={e => { handleSubmit(e) }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <InputLabel id="transferGroupId">Risk group</InputLabel>
                            {riskGroups.length !== 0 &&
                            <Select labelId="lblTransferGroupId" id="transferGroupId"
                                value={transferGroupId}
                                onChange={e => { setTransferGroupId(e.target.value) }}
                            >
                                {riskGroups.map((group) => (<MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>))}
                            </Select>
                            }
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Delete
                        </Button>
                    </Grid>
                </form>
            </Container>
        </>
    );
}
