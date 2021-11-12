import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Shipping from './pages/Shipping/Shipping';
import Login from './pages/Login/Login';
import AuthContextProvider from './context/AuthContextProvider';
import Register from './pages/Register/Register';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Dashboard from './pages/Dashboard/Dashboard';
import Explore from './pages/Explore/Explore';

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
                  <Route exact path='/headphones'>
                     <Explore />
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
                  <ProtectedRoute  path='/dashboard'>
                     <Dashboard />
                  </ProtectedRoute>
               </Switch>
            </Router>
         </div>
      </AuthContextProvider>
   );
}

export default App;
