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
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';

const Register = () => {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm();

   const history = useHistory();
   const { registerWithEmailAndPassword, userLoading, authError } = useAuth();

   const [confirmPasswordError, setConfirmPasswordError] = useState('');

   const handleRegister = async ({
      userName,
      email,
      password,
      confirmPassword,
   }) => {
      setConfirmPasswordError('');
      if (password !== confirmPassword) {
         setConfirmPasswordError('Confirm password did not match!');
         return;
      }

      await registerWithEmailAndPassword(userName, email, password, history);
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
                        Register
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
                     onSubmit={handleSubmit(handleRegister)}
                     sx={{
                        bgcolor: '#f4f5f8',
                        px: 1,
                        py: 8,
                        maxWidth: '30rem',
                        textAlign: 'center',
                        borderRadius: 2,
                     }}
                  >
                     <Typography variant='h5' align='center'>
                        Register
                     </Typography>
                     <Typography sx={{ my: 3, color: 'red' }}>
                        {authError ? authError : ''}
                     </Typography>
                     <TextField
                        {...register('userName', { required: true })}
                        variant='standard'
                        sx={{ width: '60%', mb: 2 }}
                        label='User name'
                        required
                     />
                     <TextField
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
                        variant='standard'
                        sx={{ width: '60%', mb: 2 }}
                        label='Email'
                        type='email'
                        error={errors.email ? true : false}
                        helperText={errors.email ? errors.email.message : ''}
                     />
                     <TextField
                        {...register('password', {
                           required: {
                              value: true,
                              message: 'Password is required',
                           },
                           minLength: {
                              value: 6,
                              message:
                                 'Password must be at least 6 characters long ',
                           },
                        })}
                        variant='standard'
                        sx={{ width: '60%', mb: 2 }}
                        label='Password'
                        type='password'
                        error={errors.password ? true : false}
                        helperText={
                           errors.password ? errors.password.message : ''
                        }
                     />
                     <TextField
                        {...register('confirmPassword', {
                           required: {
                              value: true,
                              message: 'Please re enter the password',
                           },
                        })}
                        variant='standard'
                        sx={{ width: '60%', mb: 2 }}
                        label='Confirm password'
                        type='password'
                        error={errors.confirmPassword ? true : false}
                        helperText={
                           errors?.confirmPassword
                              ? errors?.confirmPassword?.message
                              : confirmPasswordError
                        }
                     />
                     <Button
                        type='submit'
                        variant='contained'
                        sx={{ background: '#ff7004', width: '60%', mt: 3 }}
                     >
                        {userLoading ? (
                           <CircularProgress color='common' size='1.5rem' />
                        ) : (
                           'Register'
                        )}
                     </Button>
                     <Typography sx={{ mt: 1 }}>
                        Have an account? <Link to='signin'>Sign In</Link>
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

export default Register;
