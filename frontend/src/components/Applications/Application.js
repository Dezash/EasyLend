import {
    Avatar,
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

import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import LocationOnIcon from '@material-ui/icons/LocationOn'
import PersonIcon from '@material-ui/icons/Person';
import EventNoteIcon from '@material-ui/icons/EventNote';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import React from 'react';
import DocumentItem from './DocumentItem';
import axios from 'axios';


const theme = createMuiTheme({
    palette: {
        primary: {
            main: green[500],
        },
        secondary: {
            main: red[500],
        },
    },
});


const Application = (props) => {
    const appId = props.match.params.id
    const headers = {
        'Content-Type': 'application/json'
    }
    const [application, setApplication] = useState([])

    const fetchApplication = async (id) => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}applications/${id}`)
        const data = await res.data
        return data
    }

    const setApplicationStatus = async (newStatus) => {
        setApplication({ ...application, status: newStatus })
        application.status = newStatus

        const res = await axios.put(`${process.env.REACT_APP_API_URL}applications/${appId}`, application, {
            headers: headers,
        })
        const data = await res.data
        return data
    }

    const deleteApplication = async () => {
        axios.delete(`${process.env.REACT_APP_API_URL}applications/${appId}`);
        props.history.push('/');
    }

    const openDeleteDialog = () => {
        confirmAlert({
            title: 'Delete application',
            message: 'Are you sure you want to do this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deleteApplication()
                },
                {
                    label: 'No'
                }
            ]
        });
    }

    useEffect(() => {
        const getApplication = async (id) => {
            const application = await fetchApplication(id)
            console.log(application)
            setApplication(application)
        }

        getApplication(appId)
    }, [appId])

    return (
        <ThemeProvider theme={theme}>
            <div className="User">
                <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                    <Avatar src={application.user && `https://eu.ui-avatars.com/api/?name=${application.user.name}+${application.user.lastName}`} alt={application.user && ((application.user.name) + ' ' + (application.user.lastName))} style={{ margin: '10px', width: '80px', height: '80px' }} />
                    <div>
                        <Typography variant="h4" component="h2">
                            {application.user && application.user.name} {application.user && application.user.lastName}
                        </Typography>
                        <Typography component="p">
                            {application.user && application.user.birthDate}
                        </Typography>
                    </div>
                    <div style={{ position: 'absolute', right: 30 }}>
                        <Typography component="p">
                            Status: {application.status}
                        </Typography>
                        <ButtonGroup
                            variant="contained"
                            color="primary"
                            aria-label="full-width contained primary button group"
                        >
                            {application.status === "Pending" && (
                                <>
                                    <Button color="primary" onClick={() => { setApplicationStatus('Approved') }}>Approve</Button>
                                    <Button color="secondary" onClick={() => { setApplicationStatus('Rejected') }}>Reject</Button>
                                </>

                            )}
                            <Button color="secondary" onClick={() => { openDeleteDialog() }}>Delete</Button>
                        </ButtonGroup>
                    </div>
                </div>
                <Divider />
                <Typography variant="h5" component="h2" style={{ margin: '20px' }}>
                    Contact info
        </Typography>
                <Divider style={{ margin: '0 20px' }} />
                <Grid container spacing={2}>
                    <Grid item xs>
                        <List>
                            <ListItem key="phone">
                                <ListItemIcon>
                                    <PhoneIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Phone number"
                                    secondary={application.user && application.user.phone}
                                />
                            </ListItem>
                            <ListItem key="email">
                                <ListItemIcon>
                                    <EmailIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Email address"
                                    secondary={application.user && application.user.email}
                                />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs>
                        <List>
                            <ListItem key="address">
                                <ListItemIcon>
                                    <LocationOnIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Address"
                                    secondary={application.user && application.user.address}
                                />
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
                <Typography variant="h5" component="h2" style={{ margin: '20px' }}>
                    Personal info
        </Typography>
                <Divider style={{ margin: '0 20px' }} />
                <Grid container spacing={2}>
                    <Grid item xs>
                        <List>
                            <ListItem key="personalCode">
                                <ListItemIcon>
                                    <PersonIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Personal code"
                                    secondary={application.user && application.user.personalCode}
                                />
                            </ListItem>
                            <ListItem key="dateRegistered">
                                <ListItemIcon>
                                    <EventNoteIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Date registered"
                                    secondary={application.user && application.user.dateRegistered}
                                />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs>
                        <List>
                            <ListItem key="dateSubmitted">
                                <ListItemIcon>
                                    <EventAvailableIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Date submitted"
                                    secondary={application.dateSubmitted}
                                />
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
                <Typography variant="h5" component="h2" style={{ margin: '20px' }}>
                    Documents
        </Typography>
                <Divider style={{ margin: '0 20px' }} />

                <List>
                    {application.documents &&
                        application.documents.map((doc) => (
                            <DocumentItem file={doc} key={doc.name} />
                        ))
                    }
                </List>

                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', padding: '15px 10px' }}>
                </div>
            </div>
        </ThemeProvider>

    );
}

export default Application;