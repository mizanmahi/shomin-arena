import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Box } from '@mui/system';

const Review = ({ name, company, description, rating, createdAt }) => {
   return (
      <Grid item xs={12} sm={6} md={4}>
         <Paper
            sx={{
               px: 2,
               py: 3,
               display: 'flex',
               justifyContent: 'space-between',
               flexDirection: 'column',
               minHeight: '10rem',
            }}
         >
            <Typography variant='body1' sx={{ mb: 3 }} color='gray'>
               {description}
            </Typography>
            <Box>
               <Typography variant='body1' sx={{ color: '#ff7004' }}>
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
                  {rating} <StarIcon />
               </Typography>
            </Box>
         </Paper>
      </Grid>
   );
};

export default Review;
