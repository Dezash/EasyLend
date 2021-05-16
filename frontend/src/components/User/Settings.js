import { useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import {
    Avatar,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemText,
    Button,
    Box,
    Modal,
    makeStyles,
    Fade,
    Backdrop,
    FormHelperText,
    FormControl,
    TextField,
    Select,
    InputLabel,
    MenuItem,
    
} from '@material-ui/core';
import httpClient from '../../client/httpClient';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    
  }))

export default function Settings() {
    const { push } = useHistory();
    const [riskGroups, setRiskGroups] = useState([]);
    const [group, setGroup] = useState('');
    const [user, setUser] = useState([]);

    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [rate, setRate] = useState('');

    const handleGroupChange = (event) => {
        const groupId = event.target.value;
        setGroup({name: null, id: groupId});
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleRateChange = (event) => {
        setRate(event.target.value);
    };

    const submitForm = (event) => {
        event.preventDefault();
        editUser();
    }

    const editUser = async () => {
        const userData = { email: email, phoneNumber: phone, address: address, minInterestRate: parseFloat(rate), riskGroupId: parseInt(group.id) };
        await httpClient.put('User/1', userData);
        window.location.reload();
    }

    useEffect(() => {
        const getRiskGroups = async () => {
            const riskGroupList = await httpClient.get('riskgroup');
            setRiskGroups(riskGroupList);
        }

        const getUsers = async() => {
            const user = await httpClient.get('user/1');
            setUser(user);
            setFormData(user);
            setGroup({ id: user.riskGroupId, name: user.riskGroupName});
        }
        
        getRiskGroups();
        getUsers();
    }, [push])
      
    const openEdit = () => {
        setOpen(true);

    }
    const closeEdit = () => {
        setOpen(false);
    }

    const setFormData = (user) => {
        if (user !== undefined) {
            setEmail(user.email);
            setPhone(user.phoneNumber);
            setAddress(user.address);
            setRate(user.minInterestRate);
        }
    }

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <Avatar src={user && `https://eu.ui-avatars.com/api/?name=${user.name}+${user.lastName}`} alt={user && ((user.name) + ' ' + (user.lastName))} style={{ margin: '10px', width: '80px', height: '80px' }} />
                <div>
                    <Typography variant="h4" component="h2">
                        {user && user.name} {user && user.lastName}
                    </Typography>
                    <Typography component="p">
                        {user && user.birthDate}
                    </Typography>
                </div>
            </div>
            <Divider style={{ margin: '20px 0px' }} />
            <Typography variant="h5" component="h2">Profile information:</Typography>
            <List>
                <ListItem key="name">
                    <Box style={{ paddingRight: 5 }}>
                        First name:
                    </Box>
                    <ListItemText secondary={user && user.name} />
                </ListItem>
                <ListItem key="lastName">
                    <Box style={{ paddingRight: 5 }}>
                        Last name:
                    </Box>
                    <ListItemText secondary={user && user.lastName} />
                </ListItem>
                <ListItem key="birthdate">
                    <Box style={{ paddingRight: 5 }}>
                        Birth date:
                    </Box>
                    <ListItemText secondary={user && user.birthDate} />
                </ListItem>
                <ListItem key="phoneNumber">
                    <Box style={{ paddingRight: 5 }}>
                        Phone number:
                    </Box>
                    <ListItemText secondary={user && user.phoneNumber} />
                </ListItem>
                <ListItem key="address">
                    <Box style={{ paddingRight: 5 }}>
                        Address:
                    </Box>
                    <ListItemText secondary={user && user.address} />
                </ListItem>
                <ListItem key="email">
                    <Box style={{ paddingRight: 5 }}>
                        Email:
                    </Box>
                    <ListItemText secondary={user && user.email} />
                </ListItem>
                <ListItem key="personalCode">
                    <Box style={{ paddingRight: 5 }}>
                        Personal code:
                    </Box>
                    <ListItemText secondary={user && user.personalCode} />
                </ListItem>
                <ListItem key="minInterestRate">
                    <Box style={{ paddingRight: 5 }}>
                        Minimal interest rate:
                    </Box>
                    <ListItemText secondary={user && user.minInterestRate + "%"} />
                </ListItem>
                <ListItem key="riskGroup">
                    <Box style={{ paddingRight: 5 }}>
                        Risk group:
                    </Box>
                    <ListItemText secondary={user && user.riskGroupName} />
                </ListItem>
            </List>
            <Divider style={{ margin: "20px 0px" }} />
            <Typography style={{ marginBottom: "20px" }}variant="h5" component="h2">Actions:</Typography>
            <Button variant="contained" color="primary" onClick={openEdit}>Change personal info</Button> 

            <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            className={classes.modal}
            open={open}
            onClose={closeEdit}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
            >
                <Fade in={open}>
                <div className={classes.paper}>
                    <h2 id="modal-title">Change personal info</h2>
                    <form className={classes.form}>
                        <FormControl style={{marginBottom: "10px"}}>
                            <TextField type="email" id="edit-email" label="Email address" variant="outlined" value={email} onChange={handleEmailChange} required/>
                            <FormHelperText id="helper-email">Please enter your new email address.</FormHelperText>
                        </FormControl>
                        <FormControl style={{marginBottom: "10px"}}>
                            <TextField type="phone" id="edit-phone" label="Phone number" variant="outlined" value={phone} onChange={handlePhoneChange} required/>
                            <FormHelperText id="helper-phone">Please enter your new phone number.</FormHelperText>
                        </FormControl>  
                        <FormControl style={{marginBottom: "20px"}}>
                            <TextField id="edit-address" label="Address" variant="outlined" value={address} onChange={handleAddressChange} required/>
                            <FormHelperText id="helper-address">Please enter your new address.</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <TextField type="number" id="edit-rate" label="Interest rate" variant="outlined" value={rate} onChange={handleRateChange} required/>
                            <FormHelperText id="helper-rate">Please enter minimal interest rate.</FormHelperText>
                        </FormControl>
                        <FormControl style={{minWidth: 120, marginBottom: "20px"}}>
                            <InputLabel id="groupLabelId">Risk group</InputLabel>
                            <Select labelId="groupLabelId" id="groupId"
                                value={group.id}
                                onChange={handleGroupChange}
                            >
                                {riskGroups.map((group) => (<MenuItem value={group.id}>{group.name}</MenuItem>))}
                            </Select>
                        </FormControl>
                        <Button type="submit" style={{alignSelf: "center"}} variant="contained" color="primary" onClick={submitForm}>Change personal info</Button>
                    </form>
                </div>
                
                </Fade>
            </Modal>
        </>
    );
}
