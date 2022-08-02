import { Button, Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Product from '../Product/Product';
import { axiosInstance } from '../../../helpers/axiosInstance';
import Spinner from '../../../components/Spinner/Spinner';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';

/* 
   data => data is the data that is returned from the query
   isLoading => isLoading is a boolean that is true if the query is loading
   isError => isError is a boolean that is true if the query has an error
   error => error is the error that is returned from the query, it is undefined if there is no error, contains the error message if there is an error
   isFetching => isFetching is a boolean that is true if the query is fetching in the background to update the data
*/

const Products = () => {
   const { data, isLoading, isError, error, isFetching } = useQuery(
      'headphones',
      () => axiosInstance.get('/headphones'),
      {
         cacheTime: 5000, // cache the data for 5 seconds for the first time the data is fetched for this query
         // retry: false, // don't retry the query if it fails, default is 5 seconds
         staleTime: 20000, // within 10 seconds no new data will be fetched, the data will be used from the cache, isFetching and isLoading will be false, query will remain fresh for 10 seconds, default is 0 seconds
         refetchOnMount: true, // the data will be fetched when the component is mounted, possible values are true or false or always, default is false
      }
   );

   console.log({
      isLoading,
      isFetching,
   });

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
                        background: '#ff7004',
                        display: 'block',
                        mx: 'auto',
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
