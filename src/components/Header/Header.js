import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Button, Container, Drawer, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
   const theme = useTheme();
   const matches = useMediaQuery(theme?.breakpoints.down('md'));

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
               <nav>
                  <Link to='/headphones' style={{ textDecoration: 'none' }}>
                     <Button sx={{ color: '#ffffff' }}>Explore</Button>
                  </Link>
                  <Link to='/headphones' style={{ textDecoration: 'none' }}>
                     <Button sx={{ color: '#ffffff' }}>Sign in</Button>
                  </Link>
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
