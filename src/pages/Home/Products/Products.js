import {
   Card,
   CardContent,
   CardMedia,
   Container,
   Grid,
   Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const products = [
   {
      id: '1',
      name: 'Shuer wired headset -SE5219',
      price: '455',
      imageUrl: 'https://i.ibb.co/wRxsWBs/shuer-green.jpg',
      description:
         'An amazing classsic wireless headphone with deep bass. Available in four colors',
   },
   {
      id: '2',
      name: 'Shuer wired headset -SE5219',
      price: '455',
      imageUrl: 'https://i.ibb.co/wRxsWBs/shuer-green.jpg',
      description:
         'An amazing classsic wireless headphone with deep bass. Available in four colors',
   },
   {
      id: '3',
      name: 'Shuer wired headset -SE5219',
      price: '455',
      imageUrl: 'https://i.ibb.co/wRxsWBs/shuer-green.jpg',
      description:
         'An amazing classsic wireless headphone with deep bass. Available in four colors',
   },
   {
      id: '3',
      name: 'Shuer wired headset -SE5219',
      price: '455',
      imageUrl: 'https://i.ibb.co/wRxsWBs/shuer-green.jpg',
      description:
         'An amazing classsic wireless headphone with deep bass. Available in four colors',
   },
   {
      id: '3',
      name: 'Shuer wired headset -SE5219',
      price: '455',
      imageUrl: 'https://i.ibb.co/wRxsWBs/shuer-green.jpg',
      description:
         'An amazing classsic wireless headphone with deep bass. Available in four colors',
   },
   {
      id: '3',
      name: 'Shuer wired headset -SE5219',
      price: '455',
      imageUrl: 'https://i.ibb.co/wRxsWBs/shuer-green.jpg',
      description:
         'An amazing classsic wireless headphone with deep bass. Available in four colors',
   },
];

const Products = () => {
   return (
      <Box component='section' sx={{}}>
         <Container>
            <Box sx={{ textAlign: 'center', py: 10 }}>
               <Typography
                  variant='h5'
                  sx={{ fontWeight: 'bold' }}
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
                  {products.map((product) => (
                     <Grid
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        key={product.id}
                        sx={{ display: 'flex', justifyContent: 'center' }}
                     >
                        <Card sx={{ maxWidth: 276 }}>
                           <CardMedia
                              component='img'
                              alt='green iguana'
                              height='270'
                              image={product.imageUrl}
                           />
                           <CardContent>
                              <Typography
                                 gutterBottom
                                 variant='body1'
                                 component='div'
                              >
                                 {product?.name.slice(0, 23)}
                              </Typography>
                              <Typography
                                 gutterBottom
                                 variant='body1'
                                 component='div'
                              >
                                 <span
                                    style={{
                                       color: 'gray',
                                       textDecoration: 'line-through',
                                    }}
                                 >
                                    Tk{product.price * 1.4}
                                 </span>{' '}
                                 &nbsp; Tk{product?.price}
                              </Typography>
                              <Typography
                                 variant='body2'
                                 color='text.secondary'
                              >
                                 {product.description.slice(0, 50)}
                              </Typography>
                           </CardContent>
                        </Card>
                     </Grid>
                  ))}
               </Grid>
            </Box>
         </Container>
      </Box>
   );
};

export default Products;
