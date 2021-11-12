import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import StarIcon from '@mui/icons-material/Star';
import { axiosInstance } from '../../../helpers/axiosInstance';
import Review from '../Review/Review';

const Reviews = () => {
   const [reviews, setReviews] = useState([]);

   useEffect(() => {
      axiosInstance.get('/reviews').then(({ data }) => {
         setReviews(data);
      });
   }, []);

   return (
      <Box component='section' sx={{mb: 5}}>
         <Container>
            <Box sx={{ textAlign: 'center', py: 8 }}>
               <Typography
                  variant='h5'
                  sx={{ fontWeight: 'bold' }}
                  gutterBottom
               >
                  What our customer says
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
               <Grid container spacing={3}>
                  {reviews.map((review) => (
                     <Review key={review._id} {...review} />
                  ))}
               </Grid>
            </Box>
         </Container>
      </Box>
   );
};

export default Reviews;