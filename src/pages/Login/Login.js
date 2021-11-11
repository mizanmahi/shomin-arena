import {
   Breadcrumbs,
   Button,
   Container,
   Grid,
   TextField,
   Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm();

   const history = useHistory();
   const location = useLocation();
   const { loginWithEmailAndPassword, authError } = useAuth();

   const handleLogin = async ({ email, password }) => {
      await loginWithEmailAndPassword(email, password, location, history);
      reset();
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
      <Box component='section' sx={{}}>
         <Box sx={registerHeaderStyles}>
            <Container>
               <Box>
                  <Typography variant='h5' sx={{ mb: 2 }}>
                     CREATE ACCOUNT
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
                        Sign In
                     </Typography>
                  </Breadcrumbs>
               </Box>
            </Container>
         </Box>
         <Container>
            <Grid container>
               <Grid
                  item
                  xs={12}
                  sx={{ justifyContent: 'center', display: 'flex', mt: 5 }}
               >
                  <Box
                     component='form'
                     onSubmit={handleSubmit(handleLogin)}
                     sx={{
                        bgcolor: '#f4f5f8',
                        px: 1,
                        py: 8,
                        maxWidth: '30rem',
                     }}
                  >
                     <Typography variant='h5' align='center'>
                        Sign In
                     </Typography>

                     <TextField
                        {...register('email', {
                           required: {
                              value: true,
                              message: 'Email is required',
                           },
                        })}
                        variant='standard'
                        sx={{ width: '60%', mb: 2 }}
                        label='Email'
                        type='email'
                        error={errors.email ? true : false}
                        helperText={errors.email ? errors.email.message : ''}
                        required
                     />
                     <TextField
                        {...register('password')}
                        variant='standard'
                        sx={{ width: '60%', mb: 2 }}
                        label='Password'
                        type='password'
                        required
                     />

                     <Button
                        type='submit'
                        variant='contained'
                        sx={{ background: '#ff7004', width: '60%', mt: 3 }}
                     >
                        Sign In
                     </Button>
                     <Typography sx={{mt: 1}}>Need an account? <Link to='register'>Register</Link></Typography>
                  </Box>
               </Grid>
            </Grid>
         </Container>
      </Box>
   );
};

export default Login;
