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
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from '@material-ui/core';


export default function Settings() {
    const { push } = useHistory();
    const [riskGroups, setRiskGroups] = useState([]);
    const [group, setGroup] = React.useState('');
    const [user, setUser] = useState([]);

    const fetchRiskGroups = async () => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}RiskGroup`);
        const data = await res.json();
        return data;
      }

    const fetchUser = async() => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}User/1`);
        const data = await res.json();
        return data;
    }


    const handleChange = (event) => {
      setGroup(event.target.value);
    };
    
    useEffect(() => {
        const getRiskGroups = async () => {
            const riskGroupList = await fetchRiskGroups();
            setRiskGroups(riskGroupList);
            console.log(riskGroupList);
        }

        const getUsers = async() => {
            const user = await fetchUser();
            setUser(user);
            console.log(user);
        }

        getRiskGroups();
        getUsers();
    }, [push])

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
                    <ListItemText secondary={user.name} />
                </ListItem>
                <ListItem key="lastName">
                    <Box style={{ paddingRight: 5 }}>
                        Last name:
                    </Box>
                    <ListItemText secondary={user.lastName} />
                </ListItem>
                <ListItem key="birthdate">
                    <Box style={{ paddingRight: 5 }}>
                        Birth date:
                    </Box>
                    <ListItemText secondary={user.birthDate} />
                </ListItem>
                <ListItem key="phoneNumber">
                    <Box style={{ paddingRight: 5 }}>
                        Phone number:
                    </Box>
                    <ListItemText secondary={user.phoneNumber} />
                </ListItem>
                <ListItem key="address">
                    <Box style={{ paddingRight: 5 }}>
                        Address:
                    </Box>
                    <ListItemText secondary={user.address} />
                </ListItem>
                <ListItem key="email">
                    <Box style={{ paddingRight: 5 }}>
                        Email:
                    </Box>
                    <ListItemText secondary={user.email} />
                </ListItem>
                <ListItem key="personalCode">
                    <Box style={{ paddingRight: 5 }}>
                        Personal code:
                    </Box>
                    <ListItemText secondary={user.personalCode} />
                </ListItem>
                <ListItem key="minInterestRate">
                    <Box style={{ paddingRight: 5 }}>
                        Minimal interest rate:
                    </Box>
                    <ListItemText secondary={user.minInterestRate + "%"} />
                </ListItem>
                <ListItem key="riskGroup">
                    <FormControl style={{minWidth: 120}}>
                        <InputLabel id="groupLabelId">Risk group</InputLabel>
                        <Select labelId="groupLabelId" id="groupId"
                            value={group}
                            onChange={handleChange}
                        >
                            {riskGroups.map((group) => (
                                <MenuItem value={group.name}>{group.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </ListItem>
            </List>
            <Divider style={{ margin: '20px 0px' }} />
            <Typography variant="h5" component="h2">Actions:</Typography>
            <Button style={{marginRight: "5px"}} variant="contained" color="primary">Change password</Button>
            <Button style={{marginRight: "5px"}} variant="contained" color="primary">Change risk group</Button>
            <Button variant="contained" color="primary">Change personal info</Button>
        </>
    );
}
