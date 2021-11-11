import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Button, Container, Drawer, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = () => {
   const theme = useTheme();
   const matches = useMediaQuery(theme?.breakpoints.down('md'));

   const { user, logoutUser } = useAuth();

   const handleLogout = () => {
      logoutUser();
   };

   return (
      <Box component='section' style={{ background: '#2F333A' }}>
         <Container>
            <Box
               sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  color: '#ffffff',
                  minHeight: '5rem',
               }}
            >
               <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                  SHOMIN ARENA
               </Typography>
               <nav
                  sx={{
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                  }}
               >
                  <Link to='/headphones' style={{ textDecoration: 'none' }}>
                     <Button sx={{ color: '#ffffff' }}>Explore</Button>
                  </Link>
                  {user ? (
                     <>
                        <Link to='/myOrders' style={{ textDecoration: 'none' }}>
                           <Button sx={{ color: '#ffffff' }}>My Orders</Button>
                        </Link>
                        <Link
                           to='/dashboard'
                           style={{ textDecoration: 'none' }}
                        >
                           <Button sx={{ color: '#ffffff' }}>Dashboard</Button>
                        </Link>
                        <Link to='/pay' style={{ textDecoration: 'none' }}>
                           <Button sx={{ color: '#ffffff' }}>Pay</Button>
                        </Link>
                        <Link to='/review' style={{ textDecoration: 'none' }}>
                           <Button sx={{ color: '#ffffff' }}>review</Button>
                        </Link>
                        <Typography
                           variant='body1'
                           component='a'
                           sx={{ color: '#ff7004', px: 1, py: 1,  textTransform: 'capitalize' }}
                        >
                           {user.displayName}
                        </Typography>

                        <Button
                           sx={{ color: '#ffffff' }}
                           onClick={handleLogout}
                        >
                           <LogoutIcon />
                        </Button>
                     </>
                  ) : (
                     <Link to='/signin' style={{ textDecoration: 'none' }}>
                        <Button sx={{ color: '#ffffff' }}>Sign in</Button>
                     </Link>
                  )}
               </nav>
            </Box>
         </Container>

         {/* ============================== drawer ============================== */}
         <Drawer
            anchor='left'
            open={matches}
            //    onClose={() => setOpenDrawer(false)}
         >
            <Box
               sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '1rem',
                  alignItems: 'flex-start',
                  background: theme.palette.primary.main,
                  color: '#fff',
                  height: '100vh',
               }}
            ></Box>
         </Drawer>
      </Box>
   );
};

export default Header;
