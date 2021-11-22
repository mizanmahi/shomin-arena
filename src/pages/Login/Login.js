import {
   Breadcrumbs,
   Button,
   CircularProgress,
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
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm();

   const history = useHistory();
   const location = useLocation();
   const { loginWithEmailAndPassword, authError, userLoading } = useAuth();

   const handleLogin = async ({ email, password }) => {
      loginWithEmailAndPassword(email, password, location, history);

      if (authError) {
         toast.error(authError);
      }

      reset();
   };

   console.log(errors);

   // styles --------------------
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
                  <Typography variant='h5' sx={{ mb: 2, color: '#2f333a' }}>
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
         {/* ===================== */}
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
                        textAlign: 'center',
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
                        {userLoading ? (
                           <CircularProgress color='common' size='1.5rem' />
                        ) : (
                           'Sign in'
                        )}
                     </Button>
                     <Typography sx={{ mt: 1 }}>
                        Need an account? <Link to='register'>Register</Link>
                     </Typography>
                  </Box>
               </Grid>
            </Grid>
         </Container>
         <ToastContainer
            position='top-left'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
         />
      </Box>
   );
};

export default Login;
