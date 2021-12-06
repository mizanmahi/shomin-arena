import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import googlePlay from '../../images/google-play-badge.svg';
import { Link } from 'react-router-dom';

const Footer = () => {
   return (
      <Box component='section' sx={{ bgcolor: '#2f333a', py: 8 }}>
         <Container>
            <Grid container spacing={1} sx={{ color: '#ffffff' }}>
               <Grid item sm={12} md={6} lg={4}>
                  <Typography variant='h6' sx={{ mb: 1 }}>
                     About us
                  </Typography>
                  <Typography variant='body2'>
                     We are a team of designers and developers that create high
                     quality React app for selling cool headphones.
                  </Typography>
                  <Box sx={{ mt: 3 }}>
                     <FacebookIcon sx={{ mr: 1, cursor: 'pointer' }} />
                     <TwitterIcon sx={{ mr: 1, cursor: 'pointer' }} />
                     <LinkedInIcon sx={{ mr: 1, cursor: 'pointer' }} />
                     <PinterestIcon sx={{ mr: 1, cursor: 'pointer' }} />
                  </Box>
               </Grid>
               <Grid item sm={12} md={6} lg={3} sx={{ textAlign: 'left' }}>
                  <Typography variant='h6' sx={{ mb: 1 }}>
                     Information
                  </Typography>
                  <Box>
                     <Typography variant='body2' sx={{ mb: 1 }}>
                        About us
                     </Typography>
                     <Typography variant='body2' sx={{ mb: 1 }}>
                        Privacy and policy
                     </Typography>
                     <Typography variant='body2' sx={{ mb: 1 }}>
                        Manufacturer
                     </Typography>
                     <Typography variant='body2' sx={{ mb: 1 }}>
                        Tracking Orders
                     </Typography>
                     <Typography variant='body2' sx={{ mb: 1 }}>
                        Terms and condition
                     </Typography>
                  </Box>
               </Grid>
               <Grid item sm={12} md={6} lg={3} sx={{ textAlign: 'left' }}>
                  <Typography variant='h6' sx={{ mb: 1 }}>
                     My Account
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                     <Typography
                        component={Link}
                        to='/login'
                        variant='body2'
                        sx={{
                           mb: 1,
                           color: '#fff',
                           textDecoration: 'none',
                           display: 'inline-block',
                        }}
                     >
                        Login
                     </Typography>
                     <Typography
                        component={Link}
                        to='/register'
                        variant='body2'
                        sx={{
                           mb: 1,
                           color: '#fff',
                           textDecoration: 'none',
                           display: 'inline-block',
                        }}
                     >
                        Register
                     </Typography>
                     <Typography variant='body2' sx={{ mb: 1 }}>
                        My Account
                     </Typography>
                  </Box>
               </Grid>
               <Grid item sm={12} md={6} lg={2}>
                  <Typography variant='h6' sx={{ color: '#ff7004' }}>
                     SHOMIN ARENA
                  </Typography>
                  <Typography variant='body2' sx={{ mb: 1, color: '#ffffff' }}>
                    Native App is coming for faster solution!
                  </Typography>
                  <img src={googlePlay} alt='' />
               </Grid>
            </Grid>
         </Container>
      </Box>
   );
};

export default Footer;
