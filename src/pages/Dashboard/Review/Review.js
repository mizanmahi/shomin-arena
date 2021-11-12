import { Button, Container, Rating, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import Spinner from '../../../components/Spinner/Spinner';
import { axiosInstance } from '../../../helpers/axiosInstance';
import { useAuth } from '../../../hooks/useAuth';

const Review = () => {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm();

   const { user, userLoading } = useAuth();
   const [rating, setRating] = useState(0);

   const handleReviewSubmit = async (formData) => {
      const review = {
         ...formData,
         rating,
         createdAt: new Date().toLocaleDateString(),
      };
      const { data } = await axiosInstance.post('/reviews', review);
      if (data.reviewId) {
         reset();
         toast.success('Review submitted successfully');
      }
   };

   if (userLoading) return <Spinner />;

   return (
      <Box component='section'>
         <Container>
            <Box>
               <Box
                  component='form'
                  onSubmit={handleSubmit(handleReviewSubmit)}
                  sx={{
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'flex-start',
                  }}
               >
                  <TextField
                     {...register('name', {
                        required: {
                           value: true,
                           message: 'Name is required',
                        },
                     })}
                     variant='outlined'
                     sx={{ maxWidth: '60%', minWidth: '28rem', mb: 2 }}
                     label='Your Name'
                     type='text'
                     defaultValue={user?.displayName}
                     required
                  />
                  <TextField
                     {...register('company')}
                     variant='outlined'
                     sx={{ maxWidth: '60%', minWidth: '28rem', mb: 2 }}
                     label='Company Name'
                     type='text'
                     required
                  />
                  <TextField
                     {...register('description')}
                     variant='outlined'
                     sx={{ maxWidth: '60%', minWidth: '28rem', mb: 2 }}
                     label='Description'
                     type='text'
                     required
                     multiline
                     maxRows={4}
                  />
                  <Rating
                     name='simple-controlled'
                     value={rating}
                     onChange={(event, newValue) => {
                        setRating(newValue);
                     }}
                  />
                  <Button
                     type='submit'
                     variant='contained'
                     sx={{ background: '#ff7004', mt: 2 }}
                  >
                     Submit
                  </Button>
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
      </Box>
   );
};

export default Review;
