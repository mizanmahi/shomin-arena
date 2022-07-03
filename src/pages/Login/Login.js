import {
   Breadcrumbs,
   CircularProgress,
   Container,
   Grid,
   TextField,
   Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box } from '@mui/system';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory, useLocation } from 'react-router-dom';
import LightTextField from '../../components/Custom/LightTextField';
import { useAuth } from '../../hooks/useAuth';
// import { toast, ToastContainer } from 'react-toastify';

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
                        borderRadius: 2,
                     }}
                  >
                     <Typography variant='h5' align='center' sx={{ mb: 2 }}>
                        Sign In
                     </Typography>

                     <LightTextField
                        {...register('email', {
                           required: {
                              value: true,
                              message: 'Email is required',
                           },
                           pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                              message: 'Invalid email address',
                           },
                        })}
                        sx={{ width: '60%', my: 2 }}
                        placeholder='Email'
                        type='email'
                        error={errors.email ? true : false}
                        helperText={errors.email ? errors?.email.message : ''}
                        required
                     />
                     <LightTextField
                        {...register('password', {
                           required: {
                              value: true,
                              message: 'Password is required',
                           },
                           minLength: {
                              value: 6,
                              message:
                                 'Password must be at least 6 characters long',
                           },
                        })}
                        sx={{ width: '60%', mb: 2 }}
                        type='password'
                        placeholder='Type Your password'
                        error={errors?.password ? true : false}
                        helperText={errors?.password?.message}
                     />

                     <LoadingButton
                        type='submit'
                        variant='contained'
                        sx={{
                           background: '#ff7004',
                           width: '60%',
                           mt: 1,
                           py: 1.5,
                        }}
                        loading={userLoading}
                     >
                        Sign In
                     </LoadingButton>
                     <Typography sx={{ mt: 1 }}>
                        Need an account? <Link to='register'>Register</Link>
                     </Typography>
                     <Typography sx={{ mt: 3, color: 'red' }}>
                        {authError ? authError : ''}
                     </Typography>
                  </Box>
               </Grid>
            </Grid>
         </Container>
      </Box>
   );
};

export default Login;
