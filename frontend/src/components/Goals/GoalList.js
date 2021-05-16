import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import httpClient from '../../client/httpClient';


export default function GoalList() {
    const { push } = useHistory();
    const [goals, setGoals] = useState([]);

    useEffect(() => {
    const getGoals = async () => {
        const goalList = await httpClient.get('goal');
        console.log(goalList)
        setGoals(goalList)
    }

    getGoals()
    }, [push])

    return (
        <>
            <Typography variant='h2' align='center' gutterBottom>Goals</Typography>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Starting Amount</TableCell>
                            <TableCell>Monthly Amount</TableCell>
                            <TableCell>Year Limit</TableCell>
                            <TableCell>Goal Type</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {goals.map((goal) => (
                            <TableRow key={goal.id}>
                                <TableCell component="th" scope="row">{goal.name}</TableCell>
                                <TableCell>{goal.startingAmount}</TableCell>
                                <TableCell>{goal.monthlyAmount}</TableCell>
                                <TableCell>{goal.yearLimit}</TableCell>
                                <TableCell>{goal.goalType}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
