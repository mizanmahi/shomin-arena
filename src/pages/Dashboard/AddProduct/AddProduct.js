import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../../helpers/axiosInstance';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../../../hooks/useAuth';

const AddProduct = () => {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm();

   console.log(errors);

   const { user } = useAuth();

   const handleAdd = async (formData) => {
      console.log(formData);
      
      const { data } = await axiosInstance.post('/headphones', {
         ...formData,
         createdAt: new Date().toLocaleDateString(),
         createdBy: user.displayName,
      });
      if (data.headphoneId) {
         toast.success(data.message);
         reset();
      }
   };
   
   

   return (
      <Box
         component='section'
         sx={{ bgcolor: '#f4f5f8', px: 3, py: 5, borderRadius: 2 }}
      >
         <Box
            component='form'
            onSubmit={handleSubmit(handleAdd)}
            sx={{
               bgcolor: '#ffffff',
               px: 1,
               py: 8,
               maxWidth: '30rem',
               textAlign: 'center',
               borderRadius: 2
            }}
         >
            <Typography variant='h5' align='center'>
               Product info
            </Typography>
            <TextField
               {...register('name', { required: true })}
               variant='standard'
               sx={{ width: '80%', mb: 2 }}
               label='Headphone Name'
               required
            />
            <TextField
               {...register('price', {
                  required: {
                     value: true,
                     message: 'Price is required',
                  },
               })}
               variant='standard'
               sx={{ width: '80%', mb: 2 }}
               label='Price'
               type='number'
               required
            />
            <TextField
               {...register('discountedPrice')}
               variant='standard'
               sx={{ width: '80%', mb: 2 }}
               label='Discount Price'
               type='number'
               required
            />
            <TextField
               {...register('description', {minLength: {value: 100, message: 'Description must be 100 characters long'}})}
               variant='standard'
               sx={{ width: '80%', mb: 2 }}
               label='Description'
               type='text'
               helperText='Must be minimum 100 characters long'
               multiline
               maxRows={4}
               required
            />
            <TextField
               {...register('imageUrl', { required: true })}
               variant='standard'
               sx={{ width: '80%', mb: 2 }}
               label='Image Url'
               type='text'
               required
            />

            <Button
               type='submit'
               variant='contained'
               sx={{ background: '#ff7004', width: '80%', mt: 3 }}
            >
               Add
            </Button>
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
      </Box>
   );
};

export default AddProduct;
