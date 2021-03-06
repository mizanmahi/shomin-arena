import {
   Button,
   CircularProgress,
   Container,
   Grid,
   TextField,
   Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import Header from '../../components/Header/Header';
import { axiosInstance } from '../../helpers/axiosInstance';
import { useAuth } from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { ToastContainer } from 'react-toastify';
import Spinner from '../../components/Spinner/Spinner';
import Product from '../Home/Product/Product';

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
               history.push('/dashboard');
            } else {
               history.push('/headphones');
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

   const [headphones, setHeadphones] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      axiosInstance
         .get('/headphones')
         .then(({ data }) => {
            setHeadphones(
               data.filter(
                  (item) =>
                     item.name.includes(headphone.name.slice(0, 3)) &&
                     item._id !== headphone._id
               )
            );

            setLoading(false);
         })
         .catch((err) => console.log(err.message));
   }, [headphone.name, headphone._id]);

   return (
      <>
         <Header />
         <Box component='section' sx={{ background: '#f4f5f8', py: 5 }}>
            <Container>
               <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                  <Grid item md={7}>
                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {headphone?.imageUrl ? (
                           <img
                              src={
                                 headphone?.imageUrl?.includes('http')
                                    ? headphone?.imageUrl
                                    : `data:image/jpeg;base64,${headphone?.imageUrl}`
                              }
                              alt='headphone to order'
                              style={{
                                 marginRight: '1rem',
                                 width: '70%',
                                 maxWidth: '20rem',
                              }}
                           />
                        ) : (
                           <CircularProgress sx={{ mr: 5 }} />
                        )}
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
                           textAlign: 'center',
                           boxShadow: 1,
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
                           Place Order
                        </Button>
                     </Box>
                  </Grid>
               </Grid>
            </Container>
         </Box>
         <Container>
            <Box sx={{ mb: 10 }}>
               <Box sx={{ textAlign: 'center', py: 8 }}>
                  <Typography
                     variant='h4'
                     sx={{ fontWeight: 'bold', color: '#2f333a' }}
                     gutterBottom
                  >
                     Related Products
                  </Typography>
                  <Typography
                     variant='body2'
                     sx={{ maxWidth: '22rem', mx: 'auto', color: '#474747' }}
                  >
                     Related products are displayed for your convenience.
                  </Typography>
               </Box>
               <Box>
                  <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                     {loading && !headphone && !headphones ? (
                        <Spinner />
                     ) : (
                        headphones
                           .slice(0, 4)
                           .map((headphone) => (
                              <Product key={headphone._id} {...headphone} />
                           ))
                     )}
                  </Grid>
               </Box>
            </Box>
         </Container>
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
