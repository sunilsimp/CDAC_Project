import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Auth from './components/Auth'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import UserDashboard from './components/Dashboard/UserDashboard'
import AgentDashboard from './components/Dashboard/AgentDashboard'


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={SignUp} />
          <Route exact path="/SignIn" component={SignIn} />
          <Route exact path="/AdminDashboard" component={AdminDashboard} />
          <Route exact path="/UserDashboard"   component={UserDashboard} />
          <Route exact path="/AgentDashboard" component={AgentDashboard}/>
        
0        </Switch>
      </Router>
    </div>
  )
}

export default App
