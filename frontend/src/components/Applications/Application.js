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
    ButtonGroup
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
        const res = await fetch(`${process.env.REACT_APP_API_URL}/${id}`)
        const data = await res.json()
        return data
    }

    const setApplicationStatus = async(newStatus) => {
        setApplication({...application, status: newStatus})
        application.status = newStatus

        const res = await fetch(`${process.env.REACT_APP_API_URL}/${appId}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(application)
        })
        const data = await res.json()
        return data
    }

    const deleteApplication = async() => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/${appId}`, {
            method: 'DELETE',
            headers: headers
        })
        await res.json()
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
                    <Avatar src={`https://eu.ui-avatars.com/api/?name=${application.name}+${application.lastName}`} alt={application.name + ' ' + application.lastName} style={{ margin: '10px', width: '80px', height: '80px' }} />
                    <div>
                        <Typography variant="h4" component="h2">
                            {application.name} {application.lastName}
                        </Typography>
                        <Typography component="p">
                            {application.birthDate}
                        </Typography>
                    </div>
                    <div style={{ position: 'absolute', right: 30 }}>
                        <Typography component="p">
                            Status: {application.status}
                        </Typography>
                        {application.status === "Pending" && (
                            <ButtonGroup
                                variant="contained"
                                color="primary"
                                aria-label="full-width contained primary button group"
                            >

                                <Button color="primary" onClick={() => {setApplicationStatus('Approved')}}>Approve</Button>
                                <Button color="secondary" onClick={() => {setApplicationStatus('Rejected')}}>Reject</Button>
                                <Button color="secondary" onClick={() => {openDeleteDialog()}}>Delete</Button>
                            </ButtonGroup>
                        )}
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
                            <ListItem>
                                <ListItemIcon>
                                    <PhoneIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Phone number"
                                    secondary={application.phone}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <EmailIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Email address"
                                    secondary={application.email}
                                />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <LocationOnIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Address"
                                    secondary={application.address}
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
                            <ListItem>
                                <ListItemIcon>
                                    <PersonIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Personal code"
                                    secondary={application.personalCode}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <EventNoteIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Date registered"
                                    secondary={application.dateRegistered}
                                />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs>
                        <List>
                            <ListItem>
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
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', padding: '15px 10px' }}>
                </div>
            </div>
        </ThemeProvider>

    );
}

export default Application;