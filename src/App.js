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
import { createTheme, ThemeProvider } from '@mui/material';
import { ReactQueryDevtools } from 'react-query/devtools';

// const lazyDashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'));

const queryClient = new QueryClient();

const theme = createTheme({
   components: {
      MuiButton: {
         styleOverrides: {
            root: {
               borderRadius: '4px',
               background: '#2f333a',
               '&:hover': {
                  background: '#4f5053',
               },
            },
         },
      },
   },
});

function App() {
   const { user } = useAuth();

   return (
      <ThemeProvider theme={theme}>
         <QueryClientProvider client={queryClient}>
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
            </div>
            <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
         </QueryClientProvider>
      </ThemeProvider>
   );
}

export default App;
