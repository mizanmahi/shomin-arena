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

const ManageAllOrders = () => {
   const [orders, setOrders] = useState([]);
   const { user } = useAuth();
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      axiosInstance.get(`/orders`).then(({ data }) => {
         setOrders(data);
         setLoading(false);
      });
   }, [user.email]);

   // const handleChange = (event) => {
   //    setStatus(event.target.value);
   //    console.log('changing the status');
   // };

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

   const handleStatus = async (id) => {
      const { data } = await axiosInstance.put(`/orders/${id}`);
      if (data.modifiedCount) {
         setOrders((prevOrders) =>
            prevOrders.map((order) => {
               if (order._id === id) {
                  order.status = 'shipped';
                  return order;
               }
               return order;
            })
         );

         toast.success('Order Approved!');
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
                           Customer Details
                        </TableCell>
                        <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                           Headphone Name
                        </TableCell>
                        <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                           Price
                        </TableCell>
                        <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                           Payment
                        </TableCell>
                        <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                           Status
                        </TableCell>
                        <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                           Action
                        </TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {orders?.map(
                        ({
                           _id,
                           orderItem,
                           status,
                           userName,
                           email,
                           payment,
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
                                 {userName}
                                 <br />
                                 {email}
                              </TableCell>
                              <TableCell align='center'>
                                 {orderItem?.name.slice(0, 20)}
                              </TableCell>
                              <TableCell align='center'>
                                 {orderItem.price} tk
                              </TableCell>
                              <TableCell align='center'>
                                 {payment?.status === 'succeeded' ? (
                                    <Chip
                                       size='small'
                                       label={'Paid'}
                                       sx={{
                                          bgcolor: '#c2fbd7',
                                          borderRadius: 2,
                                          color: 'green',
                                       }}
                                    />
                                 ) : (
                                    <Chip
                                       label='Not Paid'
                                       sx={{
                                          bgcolor: 'rgb(228, 106, 118)',
                                          color: '#ffffff',
                                          borderRadius: 2,
                                       }}
                                       size='small'
                                    >
                                       Pay
                                    </Chip>
                                 )}
                              </TableCell>
                              <TableCell align='center'>
                                 <Box
                                    sx={{
                                       display: 'flex',
                                       alignItems: 'center',
                                       justifyContent: 'center',
                                       flexDirection: 'column',
                                    }}
                                 >
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
                                    <Box sx={{ mt: 2 }}>
                                       {status === 'shipped' ? (
                                          <Button
                                             //  onClick={() => handleStatus(_id)}
                                             size='small'
                                             variant='contained'
                                             color='success'
                                             disabled
                                             sx={{
                                                fontSize: '.7rem',
                                             }}
                                          >
                                             Approve
                                          </Button>
                                       ) : (
                                          <Button
                                             size='small'
                                             onClick={() => handleStatus(_id)}
                                             variant='contained'
                                             color='success'
                                             sx={{
                                                fontSize: '.7rem',
                                             }}
                                          >
                                             Approve
                                          </Button>
                                       )}
                                       {/* <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={test}
          label="Status"
          onChange={handleChange}
        >
          <MenuItem value='ten'>Ten</MenuItem>
          <MenuItem value='twenty'>Twenty</MenuItem>
          <MenuItem value='thirty'>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box> */}
                                    </Box>
                                 </Box>
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
                        )
                     )}
                  </TableBody>
               </Table>
            </TableContainer>
            {orders?.length === 0 && !loading && (
               <Typography variant='h5' sx={{ textAlign: 'center', mt: 5 }}>
                  No Orders Found
               </Typography>
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

export default ManageAllOrders;
