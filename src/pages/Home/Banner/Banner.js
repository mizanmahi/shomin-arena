import { Button, Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import bannerImage from '../../../images/ppp.png';

const Banner = () => {
   return (
      <Box component='section' sx={{ background: '#e7e7e7', py: 5 }}>
         <Container>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
               <Grid item md={6} sx={{ textAlign: 'left' }}>
                  <Box data-aos='fade-right' data-aos-duration='1000'>
                     <Typography
                        variant='h6'
                        gutterBottom
                        sx={{ color: '#474747' }}
                     >
                        New Products
                     </Typography>
                     <Typography
                        variant='h3'
                        sx={{ fontWeight: 'bold' }}
                        gutterBottom
                     >
                        Classic Deep Bass
                     </Typography>
                     <Typography variant='body2' sx={{}} gutterBottom>
                        Shuer se-522 is a classic designed headphone with deep
                        bass. Build quality is worth the price. Purchase it now
                        before the price goes up.
                     </Typography>
                     <Link to='/headphones' style={{ textDecoration: 'none' }}>
                        <Button
                           variant='contained'
                           color='primary'
                           sx={{
                              background: '#ff7004',
                              px: 2.5,
                              py: 1,
                              mt: 5,
                           }}
                        >
                           Shop Now
                        </Button>
                     </Link>
                  </Box>
               </Grid>
               <Grid item md={6}>
                  <img
                     data-aos='fade-up'
                     data-aos-duration='1000'
                     data-aos-delay='700'
                     src={bannerImage}
                     alt='bannerImage'
                     style={{ width: '100%' }}
                  />
               </Grid>
            </Grid>
         </Container>
      </Box>
   );
};

export default Banner;
