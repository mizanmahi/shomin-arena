import React from 'react';
import { Grid, Paper, Rating, Typography } from '@mui/material';
import { Box } from '@mui/system';
import './review.css';

const Review = ({ name, company, description, rating, createdAt }) => {
   return (
      // <Grid item xs={12} sm={6} md={4}>
      <Paper
         data-aos='zoom-in'
         sx={{
            // maxWidth: '250px',
            mx: 1,
            my: 2,
            px: 2,
            py: 3,
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            minHeight: '10rem',
            bgcolor: '#f4f5f8',
            boxShadow:
               'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px',
         }}
      >
         <Typography
            variant='body1'
            sx={{ mb: 3, color: '#2f333d', fontWeight: 'bold' }}
            color='gray'
            className='review-description'
         >
            {description}
         </Typography>
         <Box>
            <Typography
               variant='body1'
               sx={{ color: '#ff7004', fontWeight: 600 }}
            >
               {name}
            </Typography>
            <Typography variant='body2' color='gray'>
               {company}
            </Typography>
            <Typography
               variant='body1'
               gutterBottom
               sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 1,
                  color: '#fdcc0d',
                  fontSize: '1.2rem',
               }}
            >
               <Rating name='read-only' value={rating} readOnly />
            </Typography>
         </Box>
      </Paper>
      //  {/* </Grid> */}
   );
};

export default Review;
