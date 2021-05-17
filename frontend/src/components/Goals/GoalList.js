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
import {
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemText,
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

export default function GoalList(props) {
    const { push } = useHistory();
    const [goals, setGoals] = useState([]);
    const types = ["BigPurchase", "Retirement", "ExtraIncome", "Travel", "RainyDay", "ChildsFuture"];
    const [selectGoal, setSelectGoal] = useState('');

    const classes = useStyles();

    const [name, setName] = useState('');
    const [startingAmount, setStartingAmount] = useState('');
    const [yearLimit, setYearLimit] = useState('');
    const [monthlyAmount, setMonthlyAmount] = useState('');
    const [type, setType] = useState('');

    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);

    useEffect(() => {
    const getGoals = async () => {
        const goalList = await httpClient.get('goal');
        setGoals(goalList)

    }
    getGoals()
    }, [push])



    const handleName = (event) => {
        setName(event.target.value);
    }

    const handleYearLimit = (event) => {
        setYearLimit(event.target.value);
    };

    const handleMonthlyAmount = (event) => {
        setMonthlyAmount(event.target.value);
    };

    const handleStartingAmount = (event) => {
        setStartingAmount(event.target.value);
    };


    const handleType = (event) => {
        const typeId = event.target.value;
        setType(typeId);

    };

    const clickCreate = () => {
        setOpen(true);
    }

    const closeCreate = () => {
        setOpen(false);
    }


    const openEdit = () => {
        setOpen1(true);
    }

    const closeEdit = () => {
        setOpen1(false);
    }

    const clickUpdate = (goal) => {
        setSelectGoal(goal);
        setName(goal.name);
        setYearLimit(goal.yearLimit);
        setMonthlyAmount(goal.monthlyAmount);
        setType(goal.type);
        openEdit();
    }

    const submitForm = (event) => {
        event.preventDefault();
        createGoal();
    }

    const submitEditForm = (event) => {
        event.preventDefault();
        editGoal();
    }

    const createGoal = async() => {
        const newGoal = {startingAmount: parseFloat(startingAmount), name: name, yearLimit: parseInt(yearLimit), monthlyAmount: parseFloat(monthlyAmount), goalType: type.toString()};
        await httpClient.post('Goal', newGoal);
        window.location.reload();
        
    }

    const editGoal = async() => {
        const goal = {...selectGoal, name: name, yearLimit: parseFloat(yearLimit), monthlyAmount: parseInt(monthlyAmount), goalType: type.toString()};
        setGoals(goals.map((x) => {
            if (x.id === goal.id) {
                goal.goalType = types[parseInt(goal.goalType)];
                return goal;
            }
            else {
                return x;
            }
        }))
        await httpClient.put(`Goal/${goal.id}`, goal);
        closeEdit();
    }

    const deleteGoal = async(id) => {
        await httpClient.delete(`Goal/${id}`);
        setGoals(goals.filter((x => x.id !== id)));
    }

    

    return (
        <>
            <Typography variant='h2' align='center' gutterBottom>My goals</Typography>
            <Button variant="contained" style={{ float: 'right' }} color="primary" onClick={clickCreate}>Add goal</Button> 
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Starting Amount</TableCell>
                            <TableCell>Monthly Amount</TableCell>
                            <TableCell>Year Limit</TableCell>
                            <TableCell>Goal Type</TableCell>
                            <TableCell>Balance</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {goals?.map((goal) => (
                            <TableRow key={goal.id}>
                                <TableCell component="th" scope="row">{goal.name}</TableCell>
                                <TableCell>{goal.startingAmount}</TableCell>
                                <TableCell>{goal.monthlyAmount}</TableCell>
                                <TableCell>{goal.yearLimit}</TableCell>
                                <TableCell>{goal.goalType}</TableCell>
                                <TableCell>{goal.balance}</TableCell>
                                <TableCell>
                                    <Button style={{marginRight: "20px"}}color="primary" onClick={() => {clickUpdate(goal)}} variant="contained">Modify</Button>
                                    <Button color="secondary" onClick={() => {deleteGoal(goal.id)}} variant="contained">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            className={classes.modal}
            open={open}
            onClose={closeCreate}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
            >
                <Fade in={open}>
                <div className={classes.paper}>
                    <h2 id="modal-title">Add new goal</h2>
                    <form className={classes.form} onSubmit={submitForm}>
                        <FormControl style={{marginBottom: "10px"}}>
                            <TextField type="name" id="edit-name" label="Name" variant="outlined" value={name} onChange={handleName} required/>
                            <FormHelperText id="helper-name">Please enter new name.</FormHelperText>
                        </FormControl>


                        <FormControl style={{marginBottom: "10px"}}>
                            <TextField type="number" id="edit-monthly" label="Monthly amount" variant="outlined" value={monthlyAmount} onChange={handleMonthlyAmount} required/>
                            <FormHelperText id="helper-monthly">Please enter new monthly amount.</FormHelperText>
                        </FormControl>


                        <FormControl style={{marginBottom: "10px"}}>
                            <TextField type="number" id="edit-yearlimit" label="Year limit" variant="outlined" value={yearLimit} onChange={handleYearLimit} required/>
                            <FormHelperText id="helper-yearlimit">Please enter new year limit.</FormHelperText>
                        </FormControl>

                        <FormControl style={{marginBottom: "10px"}}>
                            <TextField type="number" id="edit-start" label="Starting amount" variant="outlined" value={startingAmount} onChange={handleStartingAmount} required/>
                            <FormHelperText id="helper-amount">Please enter new year starting amount.</FormHelperText>
                        </FormControl>

                        <FormControl style={{minWidth: 120, marginBottom: "20px"}}>
                            <InputLabel id="goalId">Goal type</InputLabel>
                            <Select labelId="goalId" id="goalType"
                                value={type}
                                onChange={handleType}
                            >
                                {types.map((type, index) => (<MenuItem value={index}>{type}</MenuItem>))}
                            </Select>
                        </FormControl>
                        <Button type="submit" style={{alignSelf: "center"}} variant="contained" color="primary">Add</Button>
                    </form>
                </div>
                </Fade>
            </Modal>




            <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            className={classes.modal}
            open={open1}
            onClose={closeEdit}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
            >
                <Fade in={open1}>
                <div className={classes.paper}>
                    <h2 id="modal-title">Modify goal</h2>
                    <form className={classes.form} onSubmit={submitEditForm}>
                        <FormControl style={{marginBottom: "10px"}}>
                            <TextField type="name" id="edit-name" label="Name" variant="outlined" value={name} onChange={handleName} required/>
                            <FormHelperText id="helper-name">Please enter new name.</FormHelperText>
                        </FormControl>


                        <FormControl style={{marginBottom: "10px"}}>
                            <TextField type="number" id="edit-monthly" label="Monthly amount" variant="outlined" value={monthlyAmount} onChange={handleMonthlyAmount} required/>
                            <FormHelperText id="helper-monthly">Please enter new monthly amount.</FormHelperText>
                        </FormControl>


                        <FormControl style={{marginBottom: "10px"}}>
                            <TextField type="number" id="edit-yearlimit" label="Year limit" variant="outlined" value={yearLimit} onChange={handleYearLimit} required/>
                            <FormHelperText id="helper-yearlimit">Please enter new year limit.</FormHelperText>
                        </FormControl>

                        <FormControl style={{minWidth: 120, marginBottom: "20px"}}>
                            <InputLabel id="goalId">Goal type</InputLabel>
                            <Select labelId="goalId" id="goalType"
                                value={type}
                                onChange={handleType}
                            >
                                {types.map((type, index) => (<MenuItem value={index}>{type}</MenuItem>))}
                            </Select>
                        </FormControl>
                        <Button type="submit" style={{alignSelf: "center"}} variant="contained" color="primary">Modify</Button>
                    </form>
                </div>
                </Fade>
            </Modal>

        </>
    );
}
