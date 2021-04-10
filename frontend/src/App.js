import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navigation from './components/Navigation'
import ApplicationList from './components/Applications/ApplicationList'
import Application from './components/Applications/Application'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router>
        <Navigation />
        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Switch>
            <Route path='/' exact component={ApplicationList}></Route>
            <Route path="/applications/:id" component={Application} />
            <Route render={() => (
              <h1>404 not found</h1>
            )}></Route>
          </Switch>

        </main>
      </Router>
    </div>
  );
}

export default App;
