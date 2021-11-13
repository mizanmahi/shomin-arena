import React from 'react';
import {
   Button,
   Card,
   CardContent,
   CardMedia,
   Chip,
   Grid,
   Typography,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useHistory } from 'react-router';


const Product = ({_id, name, price, discountedPrice, description, imageUrl }) => {

   const history = useHistory();
   const handleClick = (id) => {   
      history.push(`/shipping/${id}`)
   }

   return (
      <Grid
         item
         xs={12}
         sm={6}
         md={3}
         sx={{ display: 'flex', justifyContent: 'center' }}
      >
         <Card sx={{ maxWidth: 276, position: 'relative', boxShadow: 0 }}>
            <Chip
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
                  background: '#dc3545',
               }}
            />
            <CardMedia
               component='img'
               alt='green iguana'
               height='270'
               image={imageUrl}
            />
            <CardContent sx={{textAlign: 'center'}}>
               <Typography gutterBottom variant='body1' component='div'>
                  {name?.slice(0, 23)}
               </Typography>
               <Typography gutterBottom variant='body1' component='div'>
                  <span
                     style={{
                        color: 'gray',
                        textDecoration: 'line-through',
                     }}
                  >
                     Tk{price}
                  </span>{' '}
                  &nbsp; Tk{discountedPrice}
               </Typography>
               <Button
                  onClick={() => handleClick(_id)}
                  variant='outlined'
                  sx={{
                     background: '#fff',
                     color: '#000',
                     fontSize: '.7rem',
                     width: '80%',
                     mx: 'auto',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     borderColor: '#000',
                     mb: 1
                  }}
                
               >
                  <ShoppingCartIcon />
                  Buy Now
               </Button>
               <Typography variant='body2' color='text.secondary'>
                  {description?.slice(0, 50)}
               </Typography>
            </CardContent>
         </Card>
      </Grid>
   );
};

export default Product;
