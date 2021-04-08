import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navigation from './components/Navigation'

function App() {
  return (
    <div className="App">
      <Navigation />
      <Router>
        <Switch>
          <Route path='/' exact render={() => (
            <h1>Hello</h1>
          )}></Route>
          <Route render={() => (
            <h1>404 not found</h1>
          )}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
