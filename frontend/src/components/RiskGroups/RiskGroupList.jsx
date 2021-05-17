import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import httpClient from '../../client/httpClient';
import { useToasts } from 'react-toast-notifications';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


export default function LoanList() {
    const { push } = useHistory();
    const [riskGroups, setRiskGroups] = useState([]);
    const { addToast } = useToasts();

    useEffect(() => {
        const getRiskGroups = async () => {
            try {
                const riskGroups = await httpClient.get('riskgroup');
                console.log(riskGroups);
                setRiskGroups(riskGroups);
            } catch {
                addToast('Could not retrieve data', { appearance: 'error', autoDismiss: true });
            }
        }

        getRiskGroups();
    }, [push])

    return (
        <>
            <Typography variant='h2' align='center' gutterBottom>Risk groups</Typography>
            <Button color="primary" variant="contained" style={{ float: 'right' }}><Link style={{ textDecoration: 'none', color: 'inherit' }} to={`riskgroups/create`}>Create group</Link></Button>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Max loan amount</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {riskGroups.map((riskGroup) => (
                            <TableRow key={riskGroup.id}>
                                <TableCell>{riskGroup.name}</TableCell>
                                <TableCell>{`€${riskGroup.maxLoanAmount}`}</TableCell>
                                <TableCell>
                                    <Link to={`riskgroups/${riskGroup.id}/edit`}><EditIcon/></Link>
                                    <Link to={`riskgroups/${riskGroup.id}/delete`}><DeleteIcon/></Link>
                                    </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
