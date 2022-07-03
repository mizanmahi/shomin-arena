import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Shipping from './pages/Shipping/Shipping';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Dashboard from './pages/Dashboard/Dashboard';
import Explore from './pages/Explore/Explore';
import NotFound from './pages/NotFound/NotFound';
import { useAuth } from './hooks/useAuth';
import { QueryClient, QueryClientProvider } from 'react-query';

// const lazyDashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'));

const queryClient = new QueryClient();

function App() {
   const { user } = useAuth();

   return (
      <div className='App'>
         <QueryClientProvider client={queryClient}>
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
                     {user ? <Home /> : <Register />}
                  </Route>
                  <ProtectedRoute path='/dashboard'>
                     <Dashboard />
                  </ProtectedRoute>
                  <ProtectedRoute path='*'>
                     <NotFound />
                  </ProtectedRoute>
               </Switch>
            </Router>
         </QueryClientProvider>
      </div>
   );
}

export default App;
