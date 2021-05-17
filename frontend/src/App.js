import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navigation from './components/Navigation'
import ApplicationList from './components/Applications/ApplicationList'
import Application from './components/Applications/Application'
import ApplyForm from './components/Applications/ApplyForm'
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import GoalList from './components/Goals/GoalList';
import Settings from './components/User/Settings';
import Homepage from './components/Homepage/Homepage';
import WithdrawForm from './components/Homepage/WithdrawForm';
import Loan from './components/Loans/Loan';
import LoanForm from './components/Loans/LoanForm';
import LoanList from './components/Loans/LoanList';
import RiskGroupList from './components/RiskGroups/RiskGroupList';
import RiskGroupEdit from './components/RiskGroups/RiskGroupEdit';
import RiskGroupDelete from './components/RiskGroups/RiskGroupDelete';
import RiskGroupCreate from './components/RiskGroups/RiskGroupCreate';
import { ToastProvider } from 'react-toast-notifications';

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
          <ToastProvider>
            <Switch>
              <Route path='/' exact component={Homepage}></Route>
              <Route path='/applications' exact component={ApplicationList}></Route>
              <Route path="/apply" component={ApplyForm} />
              <Route path="/applications/:id" component={Application} />
              <Route path="/goals" component={GoalList} />
              <Route path="/settings" component={Settings} />
              <Route path="/withdraw" component={WithdrawForm} />
              <Route path="/loans" exact component={LoanList} />
              <Route path="/loans/:id" component={Loan} />
              <Route path="/requestloan" component={LoanForm} />
              <Route path="/riskgroups" exact component={RiskGroupList} />
              <Route path="/riskgroups/:id/edit" component={RiskGroupEdit} />
              <Route path="/riskgroups/:id/delete" component={RiskGroupDelete} />
              <Route path="/riskgroups/create" component={RiskGroupCreate} />
              <Route render={() => (
                <h1>404 not found</h1>
              )}></Route>
            </Switch>
          </ToastProvider>
        </main>
      </Router>
    </div>

  );
}

export default App;
