import React from 'react';
import {
   Button,
   Card,
   CardContent,
   CardMedia,
   Chip,
   Grid,
   Rating,
   Typography,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useHistory } from 'react-router';
import { Box } from '@mui/system';


const Product = ({
   _id,
   name,
   price,
   discountedPrice,
   description,
   imageUrl,
}) => {
   const history = useHistory();
   const handleClick = (id) => {
      history.push(`/shipping/${id}`);
   };

   return (
      <Grid
         item
         xs={12}
         sm={6}
         md={3}
         sx={{ display: 'flex', justifyContent: 'center' }}
      >
         <Card
            sx={{
               maxWidth: '100%',
               minWidth: '275px',
               position: 'relative',
               boxShadow: 0,
               bgcolor: '#f4f5f8',
               borderRadius: 3,
               boxShadow:
                  'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px',
            }}
            data-aos='fade-up'
            data-aos-duration='1000'
         >
            {/* <Chip
               label={
                  -Math.round(((price - discountedPrice) / price) * 100) + '%'
               }
               size='small'
               color='primary'
               sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  borderRadius: 0,
                  background: '#c2fbd7',
                  color: 'green',
               }}
            /> */}
            <CardMedia
               component='img'
               alt='green iguana'
               height='270'
               image={
                  imageUrl.includes('http')
                     ? imageUrl
                     : `data:image/jpeg;base64,${imageUrl}`
               }
            />
            <CardContent sx={{ textAlign: 'center' }} sx={{ mt: 1.5 }}>
               <Typography
                  gutterBottom
                  variant='body1'
                  component='h2'
                  textAlign='left'
                  sx={{ fontWeight: 600, mb: 0 }}
               >
                  {name?.slice(0, 23)}
               </Typography>
               <Typography variant='body2' color='text.secondary'>
                  {description?.slice(0, 15)}
               </Typography>
               <Box
                  sx={{
                     display: 'flex',
                     justifyContent: 'space-between',
                     mt: 2,
                  }}
               >
                  <Typography
                     gutterBottom
                     variant='body1'
                     component='div'
                     sx={{ fontWeight: 600 }}
                  >
                     {/* <span
                        style={{
                           color: 'gray',
                           textDecoration: 'line-through',
                        }}
                     >
                        Tk {price}
                     </span>{' '} */}
                     {discountedPrice}tk
                  </Typography>
                  <Rating name='read-only' value={4} size='small' readOnly />
               </Box>
               <Button
                  onClick={() => handleClick(_id)}
                  variant='contained'
                  disableElevation
                  sx={{
                     background: '#fff',
                     color: '#000',
                     fontSize: '.7rem',
                     width: '100%',
                     mx: 'auto',
                     display: 'flex',
                     alignItems: 'center',
                     mt: 1,
                     '&:hover': {
                        bgcolor: '#2f333a',
                        color: '#fff',
                     },
                  }}
               >
                  <ShoppingCartIcon sx={{ mr: '1rem' }} />
                  Buy Now
               </Button>
            </CardContent>
         </Card>
      </Grid>
   );
};

export default Product;
