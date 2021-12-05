import {
   Button,
   Chip,
   CircularProgress,
   Container,
   Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { axiosInstance } from '../../../helpers/axiosInstance';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import { useAuth } from '../../../hooks/useAuth';
import { useHistory, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

const MyOrder = () => {
   const [orders, setOrders] = useState([]);
   const [loading, setLoading] = useState(true);
   const { user } = useAuth();
   const history = useHistory();

   useEffect(() => {
      axiosInstance.get(`/myOrders/?email=${user?.email}`).then(({ data }) => {
         setOrders(data);
         setLoading(false);
      });
   }, [user.email]);

   const deleteHandler = async (id) => {
      const response = await Swal.fire({
         title: 'Cancelling Order',
         text: `Are you sure you want to cancel?`,
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
         const { data } = await axiosInstance.delete(`/orders/${id}`);
         if (data.deletedId) {
            setOrders((prev) => prev.filter((order) => order._id !== id));
            toast.warning(data?.message, {
               className: 'Toastify_theme',
            });
         }
      }
   };

   const { url } = useRouteMatch();

   const handlePay = (id) => {
      history.push(`${url}/pay/${id}`);
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
                           Headphone Name
                        </TableCell>
                        <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                           Price
                        </TableCell>
                        <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                           Status
                        </TableCell>
                        <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                           Payment
                        </TableCell>
                        <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                           Action
                        </TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {orders?.map(({ _id, orderItem, status, payment }, i) => (
                        <TableRow
                           data-aos={i % 2 === 0 ? 'fade-left' : 'fade-right'}
                           data-aos-offset='300'
                           data-aos-easing='ease-in-sine'
                           key={_id}
                           sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                              bgcolor: '#f4f5f8',
                           }}
                        >
                           <TableCell component='th' scope='row'>
                              <img
                                 src={
                                    orderItem?.imageUrl.includes('http')
                                       ? orderItem?.imageUrl
                                       : `data:image/jpeg;base64,${orderItem?.imageUrl}`
                                 }
                                 alt='product'
                                 style={{ maxWidth: '5rem' }}
                              />
                           </TableCell>
                           <TableCell align='center'>
                              {orderItem?.name}
                           </TableCell>
                           <TableCell align='center'>
                              {orderItem.price} tk
                           </TableCell>
                           <TableCell align='center'>
                              <Chip
                                 label={status}
                                 sx={{
                                    bgcolor: `${
                                       status === 'shipped'
                                          ? 'green'
                                          : 'rgb(228, 106, 118)'
                                    }`,
                                    color: '#ffffff',
                                 }}
                              />
                           </TableCell>
                           <TableCell
                              align='center'
                              onClick={() => handlePay(_id)}
                           >
                              {payment?.status === 'succeeded' ? (
                                 <Chip
                                    label={'Paid'}
                                    sx={{
                                       bgcolor: '#c2fbd7',

                                       color: 'green',
                                    }}
                                 />
                              ) : (
                                 <Button color='warning' variant='outlined'>
                                    Pay
                                 </Button>
                              )}
                           </TableCell>
                           <TableCell
                              align='center'
                              onClick={() => deleteHandler(_id)}
                           >
                              <HighlightOffIcon
                                 sx={{
                                    cursor: 'pointer',
                                    '&:hover': { color: 'red' },
                                 }}
                              />
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </TableContainer>
            {orders?.length === 0 && !loading && (
               <Typography variant='h5' sx={{textAlign: 'center', mt: 5}}>No Orders <Link to='/headphones'>Buy some</Link></Typography>
            )}
            {loading && (
               <CircularProgress
                  sx={{
                     mx: 'auto',
                     display: 'block',
                     mt: 5,
                     '& .MuiCircularProgress-circle': { stroke: '#2f333a' },
                  }}
               />
            )}
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

export default MyOrder;
