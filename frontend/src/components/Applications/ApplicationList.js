import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';


export default function ApplicationList({ applications }) {
    return (
        <>
            <Typography variant='h2' align='center' gutterBottom>Applications</Typography>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Last name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Personal code</TableCell>
                            <TableCell>Birth date</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Phone number</TableCell>
                            <TableCell>Date submitted</TableCell>
                            <TableCell>Date registered</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {applications.map((application) => (
                            <TableRow key={application.id}>
                                <TableCell component="th" scope="row">
                                {application.name}
                                </TableCell>
                                <TableCell>{application.lastName}</TableCell>
                                <TableCell>{application.email}</TableCell>
                                <TableCell>{application.personalCode}</TableCell>
                                <TableCell>{application.birthDate}</TableCell>
                                <TableCell>{application.address}</TableCell>
                                <TableCell>{application.phone}</TableCell>
                                <TableCell>{application.dateSubmitted}</TableCell>
                                <TableCell>{application.dateRegistered}</TableCell>
                                <TableCell>{application.status}</TableCell>
                                <TableCell><Link to={`applications/${application.id}`}><VisibilityIcon/></Link></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
