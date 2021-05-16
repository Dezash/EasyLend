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
import VisibilityIcon from '@material-ui/icons/Visibility';
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import httpClient from '../../client/httpClient';
import { useToasts } from 'react-toast-notifications';


export default function LoanList() {
    const { push } = useHistory();
    const [loans, setLoans] = useState([]);
    const { addToast } = useToasts();

    useEffect(() => {
        const getLoans = async () => {
            try {
                const loanList = await httpClient.get('loans');
                console.log(loanList);
                setLoans(loanList);
            } catch {
                addToast('Could not retrieve data', { appearance: 'error', autoDismiss: true });
            }
        }

        getLoans();
    }, [push])

    return (
        <>
            <Typography variant='h2' align='center' gutterBottom>My loans</Typography>
            <Button color="primary" variant="contained" style={{ float: 'right' }}><Link style={{ textDecoration: 'none', color: 'inherit' }} to={`requestloan`}>Request loan</Link></Button>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Amount</TableCell>
                            <TableCell>Interest rate</TableCell>
                            <TableCell>Amount to pay</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Deadline</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loans.map((loan) => (
                            <TableRow key={loan.id}>
                                <TableCell>{loan.amount}</TableCell>
                                <TableCell>{loan.interestToPay}</TableCell>
                                <TableCell>{loan.amountToPay}</TableCell>
                                <TableCell>{loan.startDate}</TableCell>
                                <TableCell>{loan.endDate}</TableCell>
                                <TableCell><Link to={`loans/${loan.id}`}><VisibilityIcon/></Link></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
