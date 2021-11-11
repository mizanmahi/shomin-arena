import { Chip, Container, Typography } from '@mui/material';
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

function createData(name, calories, fat, carbs, protein) {
   return { name, calories, fat, carbs, protein };
}

const rows = [
   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
   createData('Eclair', 262, 16.0, 24, 6.0),
   createData('Cupcake', 305, 3.7, 67, 4.3),
   createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const MyOrder = () => {
   const [orders, setOrders] = useState([]);

   useEffect(() => {
      axiosInstance.get('/orders').then(({ data }) => {
         setOrders(data);
         console.log(data);
      });
   }, []);

   const deleteHandler = async (id) => {
      const { data } = await axiosInstance.delete(`/orders/${id}`);
      if (data.deletedId) {
         setOrders((prev) => prev.filter((order) => order._id !== id));
         toast.warning(data?.message);
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
                           Headphone Name
                        </TableCell>
                        <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                           Price
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
                     {orders.map(({ _id, orderItem, status }) => (
                        <TableRow
                           key={_id}
                           sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                              bgcolor: '#f4f5f8',
                           }}
                        >
                           <TableCell component='th' scope='row'>
                              <img
                                 src={orderItem?.imageUrl}
                                 alt='product'
                                 style={{ maxWidth: '5rem' }}
                              />
                           </TableCell>
                           <TableCell align='center'>
                              {orderItem?.name}
                           </TableCell>
                           <TableCell align='center'>
                              {orderItem.price}
                           </TableCell>
                           <TableCell align='center'>
                              <Chip label={status} />
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
