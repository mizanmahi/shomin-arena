import { useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Product from '../Product/Product';
import { axiosInstance } from '../../../helpers/axiosInstance';
import Spinner from '../../../components/Spinner/Spinner';

/* const products = [
   {
      id: '1',
      name: 'Shuer headset -SE5219',
      price: 855,
      discountedPrice: 455,
      imageUrl: 'https://i.ibb.co/wRxsWBs/shuer-green.jpg',
      description:
         'An amazing classsic wireless headphone with deep bass. Available in four colors',
   },
   {
      id: '2',
      name: 'Shuer headset -SE5222',
      price: 655,
      discountedPrice: 455,
      imageUrl: 'https://i.ibb.co/wRxsWBs/shuer-green.jpg',
      description:
         'An amazing classsic wireless headphone with deep bass. Available in four colors',
   },
   {
      id: '3',
      name: 'Shuer headset -SE5247',
      price: 655,
      discountedPrice: 455,
      imageUrl: 'https://i.ibb.co/wRxsWBs/shuer-green.jpg',
      description:
         'An amazing classsic wireless headphone with deep bass. Available in four colors',
   },
   {
      id: '4',
      name: 'QKZ DM10',
      price: 555,
      discountedPrice: 350,
      imageUrl: 'https://i.ibb.co/wRxsWBs/shuer-green.jpg',
      description:
         'An amazing classsic wireless headphone with deep bass. Available in four colors',
   },
   {
      id: '5',
      name: 'UISIi HM13 Gaming headphone',
      price: 550,
      discountedPrice: 335,
      imageUrl: 'https://i.ibb.co/wRxsWBs/shuer-green.jpg',
      description:
         'An amazing classsic wireless headphone with deep bass. Available in four colors',
   },
   {
      id: '6',
      name: 'JBL 881A',
      price: 1100,
      discountedPrice: 750,
      imageUrl: 'https://i.ibb.co/wRxsWBs/shuer-green.jpg',
      description:
         'An amazing classsic wireless headphone with deep bass. Available in four colors',
   },
]; */

const Products = () => {
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

   return (
      <Box component='section' sx={{}}>
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
                  quia necessitatibus.
               </Typography>
            </Box>
            <Box>
               <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                  {loading ? (
                     <Spinner />
                  ) : (
                     headphones.slice(0,6).map((headphone) => (
                        <Product key={headphone._id} {...headphone} />
                     ))
                  )}
               </Grid>
            </Box>
         </Container>
      </Box>
   );
};

export default Products;
