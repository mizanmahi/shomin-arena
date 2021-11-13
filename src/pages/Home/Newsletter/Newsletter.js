import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import news from '../../../images/news.svg'

const Newsletter = () => {
   return (
      <Box sx={{ bgcolor: '#f4f5f8', py: 10 }}>
         <Container>
            <Grid container spacing={3} sx={{alignItems: 'center', justifyContent: 'center'}}>
               <Grid item xs={12} md={6}>
                  <Box>
                     <Typography variant='h6'>
                        Subscriber Our Newsletter
                     </Typography>
                     <Typography variant='body2' color='gray'>
                        Get all the latest update from Shomin Arena
                     </Typography>
                  </Box>
                  <Box component='form' sx={{mt: 3}}>
                     <TextField
                        type='email'
                        label='Email'

                        sx={{
                           color: '#fff',
                           '& fieldset': { borderColor: '#2f333a' },
                           '& label': { color: '#2f333a' },
                           '& input': { color: '#2f333a' },
                           width: '80%'
                        }}
                     />
                     <Button
                        variant='contained'
                        color='primary'
                        sx={{
                           borderRadius: 0,
                           background: '#2f333a',
                           px: 2.5,
                           py: 1,
                           mt: 2,
                           display: 'block',
                        }}
                     >
                        Submit
                     </Button>
                  </Box>
               </Grid>
               <Grid item xs={12} md={6}>
                   <img src={news} alt="news letter" style={{maxWidth: '100%'}} />
               </Grid>
            </Grid>
         </Container>
      </Box>
   );
};

export default Newsletter;
