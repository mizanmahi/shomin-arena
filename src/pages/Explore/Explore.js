import { Breadcrumbs, Container, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import { axiosInstance } from '../../helpers/axiosInstance';
import Product from '../Home/Product/Product';

const Explore = () => {

    const [headphones, setHeadphones] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      axiosInstance
         .get('/headphones')
         .then(({ data }) => {
            console.log(data);
            setHeadphones(data);
            setLoading(false);
         })
         .catch((err) => console.log(err.message));
   }, []);


    // styles --------------------------------
   const registerHeaderStyles = {
    textAlign: 'center',
    height: '20vh',
    bgcolor: '#f4f5f8',
    '& .MuiBreadcrumbs-ol': { justifyContent: 'center' },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
 };
    return (
        <Box component='section'>
            <Box sx={registerHeaderStyles}>
            <Container>
               <Box>
                  <Typography variant='h5' sx={{ mb: 2 }}>
                     Explore Our Headphones
                  </Typography>
                  <Breadcrumbs
                     aria-label='breadcrumb'
                     sx={{
                        justifyContent: 'center',
                        width: '10rem',
                        mx: 'auto',
                     }}
                  >
                     <Link
                        to='/'
                        style={{ textDecoration: 'none', color: '#000000' }}
                     >
                        Home
                     </Link>
                     <Typography
                        style={{ textDecoration: 'none', color: '#000000' }}
                     >
                        Explore
                     </Typography>
                  </Breadcrumbs>
               </Box>
            </Container>
         </Box>
            <Container>
                     <Box>
                         Products
                     </Box>
                     <Box>
               <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                  {loading ? (
                     <Spinner />
                  ) : (
                     headphones.map((headphone) => (
                        <Product key={headphone._id} {...headphone} />
                     ))
                  )}
               </Grid>
            </Box>
            </Container>
        </Box>
    )
}

export default Explore