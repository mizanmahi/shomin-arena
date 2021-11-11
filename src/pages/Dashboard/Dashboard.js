import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ReviewsIcon from '@mui/icons-material/Reviews';
import { Route, useHistory, useRouteMatch, Switch } from 'react-router';
import MyOrder from './MyOrder/MyOrder';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';


const drawerWidth = 240;

const Dashboard = (props) => {
   const { window } = props;
   const [mobileOpen, setMobileOpen] = React.useState(false);

   let { path, url } = useRouteMatch();
   const history = useHistory();

   const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
   };

   const userMenu = [
      {
         menu: 'My Orders',
         icon: ShoppingBasketIcon,
         onClick: () => {
            history.push(`${url}`);
         },
      },
      {
         menu: 'Pay',
         icon: CreditCardIcon,
         onClick: () => {
            history.push(`${url}/pay`);
         },
      },
      {
         menu: 'Review',
         icon: ReviewsIcon,
         onClick: () => {
            history.push(`${url}/review`);
         },
      },
   ];

   const drawer = (
      <Box sx={{}}>
         <List>
            {userMenu.map((menu, index) => (
               <ListItem button key={index} onClick={menu?.onClick}>
                  <ListItemIcon>
                     <menu.icon sx={{ color: '#ffffff' }} />
                  </ListItemIcon>
                  <ListItemText primary={menu.menu} />
               </ListItem>
            ))}
         </List>
      </Box>
   );

   const container =
      window !== undefined ? () => window().document.body : undefined;

   return (
      <Box sx={{ display: 'flex' }}>
         <CssBaseline />
         <AppBar
            position='fixed'
            sx={{
               width: { sm: `calc(100% - ${drawerWidth}px)` },
               ml: { sm: `${drawerWidth}px` },
            }}
         >
            <Toolbar sx={{bgcolor: '#2f333a'}}>
               <IconButton
                  color='inherit'
                  aria-label='open drawer'
                  edge='start'
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: 'none' } }}
               >
                  <MenuIcon />
               </IconButton>
               <Typography variant='h6' noWrap component='div'>
                  Dashboard
               </Typography>
            </Toolbar>
         </AppBar>
         <Box
            component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label='mailbox folders'
         >
            {/* {===================== drawer =====================} */}
            <Drawer
               container={container}
               variant='temporary'
               open={mobileOpen}
               onClose={handleDrawerToggle}
               ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
               }}
               sx={{
                  display: { xs: 'block', sm: 'none' },
                  '& .MuiDrawer-paper': {
                     boxSizing: 'border-box',
                     width: drawerWidth,
                  },
               }}
            >
                <Box
                  sx={{
                     bgcolor: '#ff7004',
                     color: '#fff',
                     display: 'flex',
                     height: '100vh',
                     flexDirection: 'column',
                     justifyContent: 'space-between',
                     alignItems: 'center',
                     pt: 8
                  }}
               >
                  {drawer}{' '}
                  <Box sx={{mb: 2}}>
                     <Button sx={{color: '#fff'}}>Sign out <LogoutIcon sx={{ml: 2}} /> </Button>
                  </Box>{' '}
               </Box>
            </Drawer>

            {/* {===================== drawer for desktop =====================} */}

            <Drawer
               variant='permanent'
               sx={{
                  display: { xs: 'none', sm: 'block' },
                  '& .MuiDrawer-paper': {
                     boxSizing: 'border-box',
                     width: drawerWidth,
                  },
                  border: 0
               }}
               open
            >
               <Box
                  sx={{
                     bgcolor: '#ff7004',
                     color: '#fff',
                     display: 'flex',
                     height: '100vh',
                     flexDirection: 'column',
                     justifyContent: 'space-between',
                     alignItems: 'center',
                     pt: 8
                  }}
               >
                  {drawer}{' '}
                  <Box sx={{mb: 2}}>
                     <Button sx={{color: '#fff'}}>Sign out <LogoutIcon sx={{ml: 2}} /> </Button>
                  </Box>{' '}
               </Box>
            </Drawer>
         </Box>
         <Box
            component='main'
            sx={{
               flexGrow: 1,
               p: 3,
               width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
         >
            <Toolbar />
            <Box>
               <Switch>
                  <Route exact path={path}>
                     <MyOrder />
                  </Route>
                  <Route path={`${path}/pay`}>
                     <h2>Pay</h2>
                  </Route>
                  <Route path={`${path}/review`}>
                     <h2>Review</h2>
                  </Route>
               </Switch>
            </Box>
         </Box>
      </Box>
   );
};

export default Dashboard;
