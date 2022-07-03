import { Button, Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Product from '../Product/Product';
import { axiosInstance } from '../../../helpers/axiosInstance';
import Spinner from '../../../components/Spinner/Spinner';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';

const Products = () => {
   const { data, isLoading, isError, error } = useQuery('headphones', () =>
      axiosInstance.get('/headphones')
   );

   if (isError) {
      return (
         <Typography sx={{ textAlign: 'center', my: 6 }} color='error'>
            {error.message}
         </Typography>
      );
   }

   return (
      <Box component='section'>
         <Container>
            <Box sx={{ textAlign: 'center', py: 10 }}>
               <Typography
                  variant='h4'
                  sx={{ fontWeight: 'bold', color: '#2f333a' }}
                  gutterBottom
               >
                  Our Latest Headphones
               </Typography>
               <Typography
                  variant='body2'
                  sx={{ maxWidth: '22rem', mx: 'auto', color: '#474747' }}
               >
                  Our latest cool headphones of the week
               </Typography>
            </Box>
            <Box>
               <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                  {isLoading ? (
                     <Spinner />
                  ) : (
                     data?.data
                        .slice(data?.data.length - 8, data?.data.length)
                        .map((headphone) => (
                           <Product key={headphone._id} {...headphone} />
                        ))
                  )}
               </Grid>
               <Link to='/headphones' style={{ textDecoration: 'none' }}>
                  <Button
                     variant='contained'
                     color='primary'
                     sx={{
                        borderRadius: 0,
                        background: '#ff7004',
                        display: 'block',
                        mx: 'auto',
                        '&:hover': {
                           bgcolor: '#ff7059',
                        },
                        px: 2.5,
                        py: 1,
                        mt: 5,
                     }}
                  >
                     View All
                  </Button>
               </Link>
            </Box>
         </Container>
      </Box>
   );
};

export default Products;
