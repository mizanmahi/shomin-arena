import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Shipping from './pages/Shipping/Shipping';
import Login from './pages/Login/Login';
import AuthContextProvider from './context/AuthContextProvider';
import Register from './pages/Register/Register';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
   return (
      <AuthContextProvider>
         <div className='App'>
            <Router>
               <Switch>
                  <Route exact path='/home'>
                     <Home />
                  </Route>
                  <Route exact path='/'>
                     <Home />
                  </Route>
                  <ProtectedRoute exact path='/shipping/:id'>
                     <Shipping />
                  </ProtectedRoute>
                  <Route exact path='/signin'>
                     <Login />
                  </Route>
                  <Route exact path='/register'>
                     <Register />
                  </Route>
                  <Route  path='/dashboard'>
                     <Dashboard />
                  </Route>
               </Switch>
            </Router>
         </div>
      </AuthContextProvider>
   );
}

export default App;
