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
 import { Link, useHistory } from 'react-router-dom';
 import { useAuth } from '../../hooks/useAuth';
 
 const Register = () => {
   
    const {
       register,
       handleSubmit,
       reset,
       formState: { errors },
    } = useForm();
 
    const history = useHistory()
    const { registerWithEmailAndPassword } = useAuth();
 
    const handleRegister = async ({
       userName,
       email,
       password,
       confirmPassword,
    }) => {
       console.log({ userName, email, password, confirmPassword });
 
       try {
         await registerWithEmailAndPassword(userName, email, password, history);
      } catch (error) {
         console.log(error.message);
      }
 
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
                        Register
                     </Typography>
                   </Breadcrumbs>
                </Box>
             </Container>
          </Box>
          <Container>
             <Grid container>
                <Grid item xs={12} sx={{ justifyContent: 'center', display: 'flex', mt: 5 }}>
                   <Box
                      component='form'
                      onSubmit={handleSubmit(handleRegister)}
                      sx={{
                         bgcolor: '#f4f5f8',
                         px: 1,
                         py: 8,
                         maxWidth: '30rem',
                      }}
                   >
                      <Typography variant='h5' align='center'>
                         Register
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
                      <TextField
                         {...register('confirmPassword')}
                         variant='standard'
                         sx={{ width: '60%', mb: 2 }}
                         label='Confirm password'
                         type='password'
                         required
                      />
                      <Button
                         type='submit'
                         variant='contained'
                         sx={{ background: '#ff7004', width: '60%', mt: 3 }}
                      >
                         Register
                      </Button>
                     <Typography sx={{mt: 1}}>Have an account? <Link to='signin'>Sign In</Link></Typography>

                   </Box>
                </Grid>
             </Grid>
          </Container>
       </Box>
    );
 };
 
 export default Register;
 