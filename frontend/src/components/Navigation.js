import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import CheckIcon from '@material-ui/icons/Check';
import EcoIcon from '@material-ui/icons/Eco';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from "react-router-dom";
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import GroupIcon from '@material-ui/icons/Group';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function Navigation() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        EasyLend
          </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {[{ title: 'Home', link: '/' }, { title: 'Apply', link: '/apply' }, { title: 'Loans', link: '/loans'}].map((navItem, index) => (
                        <Link key={navItem.title} to={navItem.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItem button>
                            <ListItemIcon>{index === 0 ? <HomeIcon /> : index === 1 ? <CheckIcon /> : <LocalAtmIcon />}
                            
                            </ListItemIcon>
                                <ListItemText primary={navItem.title} />
                            </ListItem>
                        </Link>
                    ))}
                </List>
                <Divider />
                <List>
                    {[{ title: 'Applications', link: "/applications"}, { title: 'Risk groups', link: '/riskgroups' } ].map((navItem, index) => (
                        <Link key={navItem.title} to={navItem.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItem button>
                                <ListItemIcon>{index === 0 ? <InboxIcon /> : <GroupIcon />}</ListItemIcon>
                                <ListItemText primary={navItem.title} />
                            </ListItem>
                        </Link>
                    ))}
                </List>
                <Divider />
                <List>
                    {[{ title: 'Goals', link: "/goals" }].map((navItem) => (
                        <Link key={navItem.title} to={navItem.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItem button>
                                <ListItemIcon><EcoIcon/></ListItemIcon>
                                <ListItemText primary={navItem.title} />
                            </ListItem>
                        </Link>
                    ))}
                </List>
                <Divider /> 
                <List>
                    {[{ title: 'Settings', link: "/settings" }].map((navItem) => (
                        <Link key={navItem.title} to={navItem.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItem button>
                                <ListItemIcon><SettingsIcon/></ListItemIcon>
                                <ListItemText primary={navItem.title} />
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </Drawer>
        </>
    );
}