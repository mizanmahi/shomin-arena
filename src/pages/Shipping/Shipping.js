import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import Header from '../../components/Header/Header';
import { axiosInstance } from '../../helpers/axiosInstance';
import { useAuth } from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';

const Shipping = () => {
   const { id } = useParams();
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm();

   const history = useHistory();

   const { user } = useAuth();
   const [headphone, setHeadphone] = useState({});

   const handleProceed = async (data) => {
      const d = new Date();
      const order = {
         ...data,
         orderItem: headphone,
         status: 'pending',
         orderDate: d.toLocaleDateString(),
      };

      try {
         const { data } = await axiosInstance.post('/orders', order);
         if (data.orderId) {
             toast.success('order is');
             
            const response = await Swal.fire({
               title: 'Thanks for your Order',
               text: `${headphone.name} was added to your order list`,
               icon: 'success',
               confirmButtonText: 'Track Your Orders',
               confirmButtonColor: '#ff7004',
               showCancelButton: true,
               cancelButtonText: 'See other headphones',
               cancelButtonColor: '#ff7004',
               background: '#ffffff',
               width: '25rem',
            });


            reset();
            if (response.isConfirmed) {
               history.push('/myOrders');
            } else {
               history.push('/explore');
            }
         }
      } catch (error) {}
   };

   useEffect(() => {
      axiosInstance
         .get(`/headphones/${id}`)
         .then(({ data }) => {
            setHeadphone(data);
         })
         .catch((err) => {
            console.log(err);
         });
   }, [id]);

   return (
      <>
         <Header />
         <Box component='section' sx={{ background: '#f4f5f8', py: 5 }}>
            <Container>
               <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                  <Grid item md={7}>
                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img
                           src={headphone.imageUrl}
                           alt='headphone to order'
                           style={{
                              marginRight: '1rem',
                              width: '70%',
                              maxWidth: '20rem',
                           }}
                        />
                        <Box sx={{ textAlign: 'left' }}>
                           <Typography variant='body2'>
                              Availability: 9 in stock
                           </Typography>
                           <Typography
                              gutterBottom
                              variant='body1'
                              component='div'
                           >
                              {headphone.name}
                           </Typography>
                           <Typography
                              gutterBottom
                              variant='body1'
                              component='div'
                           >
                              <span
                                 style={{
                                    color: 'gray',
                                    textDecoration: 'line-through',
                                 }}
                              >
                                 Tk{headphone.price}
                              </span>{' '}
                              &nbsp; Tk{headphone.discountedPrice}
                           </Typography>
                           <Typography variant='body2' color='text.secondary'>
                              {headphone.description}
                           </Typography>
                        </Box>
                     </Box>
                  </Grid>
                  <Grid item md={5}>
                     {/* =========================== shipping form ======================== */}
                     <Box
                        component='form'
                        onSubmit={handleSubmit(handleProceed)}
                        sx={{
                           bgcolor: '#ffffff',
                           px: 1,
                           py: 5,
                           maxWidth: '30rem',
                           textAlign: 'center'
                        }}
                     >
                        <Typography variant='h5' align='center' sx={{ mb: 2 }}>
                           Fill Shipping Information
                        </Typography>

                        <TextField
                           {...register('userName')}
                           variant='standard'
                           sx={{ width: '70%', mb: 2 }}
                           label='User name'
                           required
                           defaultValue={user.displayName}
                        />

                        <TextField
                           {...register('email', {
                              required: {
                                 value: true,
                                 message: 'Email is required',
                              },
                           })}
                           variant='standard'
                           sx={{ width: '70%', mb: 2 }}
                           label='Email'
                           type='email'
                           defaultValue={user?.email}
                           required
                        />

                        <TextField
                           {...register('phone')}
                           variant='standard'
                           sx={{ width: '70%', mb: 2 }}
                           label='Phone'
                           type='number'
                           required
                        />
                        <TextField
                           {...register('city')}
                           variant='standard'
                           sx={{ width: '70%', mb: 2 }}
                           label='City'
                           type='text'
                           required
                        />
                        <TextField
                           {...register('address')}
                           variant='standard'
                           sx={{ width: '70%', mb: 2 }}
                           label='Address'
                           type='text'
                           required
                        />

                        <Button
                           type='submit'
                           variant='contained'
                           sx={{ background: '#ff7004', width: '60%', mt: 3 }}
                        >
                           Sign In
                        </Button>
                     </Box>
                  </Grid>
               </Grid>
            </Container>
         </Box>
         <ToastContainer
            position='top-left'
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
         />
      </>
   );
};

export default Shipping;
