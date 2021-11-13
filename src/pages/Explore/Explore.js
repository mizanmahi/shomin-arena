import {
   Breadcrumbs,
   Container,
   Grid,
   TextField,
   Typography,
} from '@mui/material';
import { bgcolor, Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import { axiosInstance } from '../../helpers/axiosInstance';
import Product from '../Home/Product/Product';

const Explore = () => {
   const [headphones, setHeadphones] = useState([]);
   const [loading, setLoading] = useState(true);
   const [searchTerm, setSearchTerm] = useState('');
   const [displayHeadphones, setDisplayHeadphones] = useState([]);

   useEffect(() => {
      axiosInstance
         .get('/headphones')
         .then(({ data }) => {
            console.log(data);
            setHeadphones(data);
            setDisplayHeadphones(data);
            setLoading(false);
         })
         .catch((err) => console.log(err.message));
   }, []);

   const changeHandler = (e) => {
      setSearchTerm(e.target.value);
      const filteredHeadphones = headphones.filter((headphone) => {
         return headphone.name
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
      });
      setDisplayHeadphones(filteredHeadphones);
   };

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
                  <Typography variant='h4' sx={{ mb: 2, color: '#2f333a' }}>
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
            <Box
               sx={{
                  px: 2,
                  py: 3,
                  bgcolor: '#f4f5f8',
                  my: 2,
                  borderRadius: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: { xs: 'column', md: 'row' },
               }}
            >
               <TextField
                  label='Search Headphone'
                  sx={{ minWidth: '300px' }}
                  onChange={changeHandler}
               />
               <Typography variant='body2' color='gray'>
                  Total: {displayHeadphones.length} found
               </Typography>
            </Box>
            <Box>
               <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                  {loading ? (
                     <Spinner />
                  ) : (
                     displayHeadphones.map((headphone) => (
                        <Product key={headphone._id} {...headphone} />
                     ))
                  )}
               </Grid>
            </Box>
         </Container>
      </Box>
   );
};

export default Explore;
