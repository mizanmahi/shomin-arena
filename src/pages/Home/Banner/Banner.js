import { Button, Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import bannerImage from '../../../images/bannerImage.jpg';

const Banner = () => {
   return (
      <Box component='section' sx={{ background: '#e7e7e7', py: 5 }}>
         <Container>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
               <Grid item md={6} sx={{ textAlign: 'left' }}>
                  <Box>
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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ea blanditiis est, sapiente repudiandae eligendi quo!
                     </Typography>
                     <Button
                        variant='contained'
                        color='primary'
                        sx={{
                           borderRadius: 0,
                           background: '#ff7004',
                           px: 2.5,
                           py: 1,
                           mt: 5,
                        }}
                     >
                        Shop Now
                     </Button>
                  </Box>
               </Grid>
               <Grid item md={6}>
                  <img
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
