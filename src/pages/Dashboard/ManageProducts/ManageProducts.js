import {
   Container,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../../helpers/axiosInstance';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
import Paper from '@mui/material/Paper';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const ManageProducts = () => {
   const [headphones, setHeadphones] = useState([]);

   useEffect(() => {
      axiosInstance
         .get('/headphones')
         .then(({ data }) => {
            setHeadphones(data);
         })
         .catch((err) => console.log(err.message));
   }, []);

   const deleteHandler = async (id) => {
      const response = await Swal.fire({
         title: 'Deleting Products',
         text: `Are you sure you want to Delete?`,
         icon: 'warning',
         confirmButtonText: 'Yes',
         confirmButtonColor: '#c70000',
         showCancelButton: true,
         cancelButtonText: 'No',
         cancelButtonColor: '#ff7004',
         background: '#ffffff',
         width: '25rem',
         height: '10rem',
      });
      if (response.isConfirmed) {
         const { data } = await axiosInstance.delete(`/headphones/${id}`);
         if (data.deletedCount) {
            setHeadphones((prev) =>
               prev.filter((headphone) => headphone._id !== id)
            );
            toast.warning('Headphone deleted Successfully!');
         }
      }
   };

   return (
      <Box component='section'>
         <Container>
            <TableContainer component={Paper}>
               <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                     <TableRow sx={{ bgcolor: '#e7e7e7' }}>
                        <TableCell sx={{ fontWeight: 'bold' }}>Image</TableCell>
                        <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                           Created At
                        </TableCell>
                        <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                           Headphone Name
                        </TableCell>
                        <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                           Price(TK)
                        </TableCell>
                        <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                           Discounted Price(TK)
                        </TableCell>
                        <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                           Action
                        </TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {headphones?.map(
                        ({
                           _id,
                           imageUrl,
                           price,
                           discountedPrice,
                           createdAt,
                           createdBy,
                           name,
                        }) => (
                           <TableRow
                              key={_id}
                              sx={{
                                 '&:last-child td, &:last-child th': {
                                    border: 0,
                                 },
                                 bgcolor: '#f4f5f8',
                              }}
                           >
                              <TableCell component='th' scope='row'>
                                 <img
                                    src={imageUrl.includes('http') ? imageUrl : `data:image/jpeg;base64,${imageUrl}`}
                                    alt='product'
                                    style={{ maxWidth: '5rem' }}
                                 />
                              </TableCell>
                              <TableCell align='center'>
                                 {createdAt}{' '}
                                 <Typography variant='body2' color='gray'>Created by {createdBy}</Typography>
                              </TableCell>
                              <TableCell align='center'>{name}</TableCell>
                              <TableCell align='center'>{price}</TableCell>
                              <TableCell align='center'>
                                 {discountedPrice}
                              </TableCell>
                              <TableCell align='center'>
                                 <DeleteForeverIcon
                                    onClick={() => deleteHandler(_id)}
                                    sx={{
                                       cursor: 'pointer',
                                       '&:hover': { color: 'red' },
                                    }}
                                 />
                              </TableCell>
                           </TableRow>
                        )
                     )}
                  </TableBody>
               </Table>
            </TableContainer>
         </Container>
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
   );
};

export default ManageProducts;
