import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
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
import {
   Route,
   useHistory,
   useRouteMatch,
   useLocation,
   Switch,
   Link,
} from 'react-router-dom';
import MyOrder from './MyOrder/MyOrder';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Review from './Review/Review';
import { useAuth } from '../../hooks/useAuth';
import ManageAllOrders from './ManageAllOrders/ManageAllOrders';
import AddProduct from './AddProduct/AddProduct';
import ManageProducts from './ManageProducts/ManageProducts';
import MakeAdmin from './MakeAdmin/MakeAdmin';
import AddIcon from '@mui/icons-material/Add';
import BallotIcon from '@mui/icons-material/Ballot';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AdminRoute from '../../components/AdminRoute/AdminRoute';
import Payment from './Payment/Payment';

const drawerWidth = 240;

const Dashboard = (props) => {
   const { window } = props;
   const [mobileOpen, setMobileOpen] = React.useState(false);

   let { path, url } = useRouteMatch();
   const history = useHistory();
   const { user, logoutUser, admin } = useAuth();


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
         menu: 'Payment',
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

   const adminMenu = [
      {
         menu: 'Manage All Orders',
         icon: BallotIcon,
         onClick: () => {
            history.push(`${url}`);
         },
      },
      {
         menu: 'Add a product',
         icon: AddIcon,
         onClick: () => {
            history.push(`${url}/addProducts`);
         },
      },
      {
         menu: 'Manage products',
         icon: BorderAllIcon,
         onClick: () => {
            history.push(`${url}/manageProducts`);
         },
      },
      {
         menu: 'Make admin',
         icon: AdminPanelSettingsIcon,
         onClick: () => {
            history.push(`${url}/makeAdmin`);

         },
      },
   ];

   const drawer = (
      <Box sx={{}}>
         <List>
            {admin
               ? adminMenu.map((menu, index) => (
                    <ListItem button key={index} onClick={menu?.onClick}>
                       <ListItemIcon>
                          <menu.icon sx={{ color: '#ffffff' }} />
                       </ListItemIcon>
                       <ListItemText primary={menu.menu} />
                    </ListItem>
                 ))
               : userMenu.map((menu, index) => (
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
               bgcolor: '#f4f5f8',
               boxShadow: 0,
            }}
         >
            <Toolbar>
               <IconButton
                  color='inherit'
                  aria-label='open drawer'
                  edge='start'
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: 'none' } }}
               >
                  <MenuIcon sx={{ color: '#000' }} />
               </IconButton>
               <Box
                  sx={{
                     display: 'flex',
                     justifyContent: 'space-between',
                     alignItems: 'center',
                     width: 1,
                  }}
               >
                  <Typography
                     variant='h6'
                     noWrap
                     component='div'
                     sx={{ color: '#2f333a' }}
                  >
                     Dashboard
                  </Typography>
                  <Typography
                     variant='h6'
                     noWrap
                     component='div'
                     sx={{ color: '#2f333a' }}
                  >
                     {user?.displayName}
                  </Typography>
               </Box>
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
             <Link to='/' style={{ textDecoration: 'none' }}>
                  <Typography
                     variant='h6'
                     sx={{
                        fontWeight: 'bold',
                        color: '#ffffff',
                        bgcolor: '#2f333a',
                        textAlign: 'center',
                        pt: 2,
                     }}
                  >
                     SHOMIN ARENA
                  </Typography>
               </Link>
               <Box
                  sx={{
                     bgcolor: '#2f333a',
                     color: '#fff',
                     display: 'flex',
                     height: '100vh',
                     flexDirection: 'column',
                     justifyContent: 'space-between',
                     pt: 3,
                  }}
               >
                  {drawer}{' '}
                  <Box sx={{ mb: 2 }}>
                     <Button sx={{ color: '#fff' }} onClick={logoutUser}>
                        Sign out <LogoutIcon sx={{ ml: 2 }} />{' '}
                     </Button>
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
                  border: 0,
               }}
               open
            >
               <Link to='/' style={{ textDecoration: 'none' }}>
                  <Typography
                     variant='h6'
                     sx={{
                        fontWeight: 'bold',
                        color: '#ffffff',
                        bgcolor: '#2f333a',
                        textAlign: 'center',
                        pt: 2,
                     }}
                  >
                     SHOMIN ARENA
                  </Typography>
               </Link>
               <Box
                  sx={{
                     bgcolor: '#2f333a',
                     color: '#fff',
                     display: 'flex',
                     height: '100vh',
                     flexDirection: 'column',
                     justifyContent: 'space-between',
                     pt: 3,
                     textAlign: 'center',
                  }}
               >
                  {drawer}{' '}
                  <Box sx={{ mb: 2 }}>
                     <Button sx={{ color: '#fff' }} onClick={logoutUser}>
                        Sign out <LogoutIcon sx={{ ml: 2 }} />{' '}
                     </Button>
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
                     {admin ? <ManageAllOrders /> : <MyOrder />}
                  </Route>
               
                  <Route  path={`${path}/pay/:orderId`}>
                     {/* <Typography sx={{textAlign: 'center', mt: 10, color: '#2f333a'}} variant='h4' >Payment is under construction 🏗</Typography> */}
                    <Payment />
                  </Route>
                  <Route path={`${path}/review`}>
                     <Review />
                  </Route>
                  <AdminRoute path={`${path}/manageAllOrders`}>
                     {admin ? <ManageAllOrders /> : <MyOrder />}
                  </AdminRoute>
                  <AdminRoute path={`${path}/addProducts`}>
                     <AddProduct />
                  </AdminRoute>
                  <AdminRoute path={`${path}/manageProducts`}>
                     <ManageProducts />
                  </AdminRoute>
                  <AdminRoute path={`${path}/makeAdmin`}>
                     <MakeAdmin />
                  </AdminRoute>
               </Switch>
            </Box>
         </Box>
      </Box>
   );
};

export default Dashboard;
