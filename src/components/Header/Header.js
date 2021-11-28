import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
   Button,
   Chip,
   Container,
   Drawer,
   Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';

const Header = () => {
   const theme = useTheme();
   const matches = useMediaQuery(theme?.breakpoints.down('sm'));
   const { user, logoutUser } = useAuth();
   const [openDrawer, setOpenDrawer] = useState(false);
   const [open, setOpen] = useState(false);

   const handleClose = () => {
      setOpen(false);
   };

   const handleLogout = () => {
      logoutUser();
   };

   useEffect(() => {
      setOpenDrawer(false);
   }, [matches]);

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
               <Link to='/' style={{ textDecoration: 'none' }}>
                  <Typography
                     variant='h6'
                     sx={{ fontWeight: 'bold', color: '#ffffff' }}
                  >
                     SHOMIN ARENA
                  </Typography>
               </Link>
               {matches ? (
                  <MenuIcon onClick={() => setOpenDrawer(!openDrawer)} />
               ) : (
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
                           <Link
                              to='/dashboard'
                              style={{ textDecoration: 'none' }}
                           >
                              <Button sx={{ color: '#ffffff' }}>
                                 Dashboard
                              </Button>
                           </Link>

                           <Chip
                              sx={{ ml: 1, bgcolor: '#ff7004', color: '#fff', fontSize: '1rem' }}
                              // color='primary'
                              icon={<PersonIcon sx={{fill: '#fff'}} />}
                              label={user.displayName}
                           />
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
               )}
            </Box>
         </Container>

         {/* ============================== drawer ============================== */}
         <Drawer
            anchor='left'
            open={openDrawer && matches}
            onClose={() => setOpenDrawer(false)}
         >
            <Box
               sx={{
                  bgcolor: '#2F333A',
                  height: '100vh',
                  minWidth: '180px',
                  px: 2,
                  py: 5,
               }}
            >
               <Box
                  component='nav'
                  sx={{
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'flex-start',
                  }}
               >
                  <Link to='/headphones' style={{ textDecoration: 'none' }}>
                     <Button sx={{ color: '#ffffff' }}>Explore</Button>
                  </Link>
                  {user ? (
                     <>
                        <Link
                           to='/dashboard'
                           style={{ textDecoration: 'none' }}
                        >
                           <Button sx={{ color: '#ffffff', mb: 2 }}>Dashboard</Button>
                        </Link>

                        <Chip
                           sx={{ ml: 1, mb: 2 }}
                           color='error'
                           icon={<PersonIcon />}
                           label={user.displayName}
                        />

                        <Button
                           sx={{ color: '#ffffff' }}
                           onClick={handleLogout}
                        >
                           Signout <LogoutIcon sx={{ ml: 2 }} />
                        </Button>
                     </>
                  ) : (
                     <Link to='/signin' style={{ textDecoration: 'none' }}>
                        <Button sx={{ color: '#ffffff' }}>Sign in</Button>
                     </Link>
                  )}
               </Box>
            </Box>
         </Drawer>
      </Box>
   );
};

export default Header;
