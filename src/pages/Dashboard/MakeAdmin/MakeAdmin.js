import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { axiAuth } from '../../../helpers/axiosInstance';
import { ToastContainer, toast } from 'react-toastify';


const MakeAdmin = () => {

    const [email, setEmail] = useState('');
   const [errorMessage, setErrorMessage] = useState('');
   


    const submitHandler = (e) => {
        e.preventDefault();

        if(email.trim().length === 0) return;
        
        axiAuth
        .put('/users/admin', { email })
        .then((res) => {
           setErrorMessage('')
           setEmail('');
           if (res.data.modifiedCount) {
               
               toast.success(`${email} is now an admin!`);
               
            }else{
               toast.error(`No such user to make admin!`);

           }
        })
        .catch((err) => {
           setErrorMessage('You are not allowed to make admin');
        });

        setEmail('')
    }

    return (
        <Box sx={{bgcolor: '#f4f5f8', px: 3, py: 5, borderRadius: 2}}>
            <Box component='form' onSubmit={submitHandler} >
                <TextField required variant='outlined' label='email' sx={{width:{md: 1, lg: '40%'} }} onChange={(e) => setEmail(e.target.value)} value={email} />
                <Button type='submit' variant='contained' sx={{bgcolor: '#ff7004', display: 'block', mt: 2}}>Make Admin</Button>
            </Box>
            <ToastContainer
            position='top-left'
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
         />
        </Box>
    )
}

export default MakeAdmin
