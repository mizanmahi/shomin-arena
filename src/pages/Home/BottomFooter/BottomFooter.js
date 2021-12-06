import { Container, Typography, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import EmailIcon from '@mui/icons-material/Email';
import { useTheme } from '@mui/material/styles';
import CopyrightIcon from '@mui/icons-material/Copyright';

const BottomFooter = () => {
   const theme = useTheme();
   const matches = useMediaQuery(theme?.breakpoints?.down('sm'));

   const centerVertically = {
      display: 'flex',
      alignItems: 'center',
   };

   return (
      <Box component='section' bgcolor='#2f333a' borderTop={1} borderColor='#484c53'>
         <Container>
            <Box
               display='flex'
               alignItems='center'
               justifyContent='center'
               flexWrap='wrap'
               px={2}
               py={1}
            >
               <Box mr={2} sx={{ ...centerVertically }}>
                  <CopyrightIcon sx={{ fontSize: '1.3rem', color: '#ffffff' , mr: 1 }} />
                  <Typography
                     sx={{
                        fontSize: '.8rem',
                        color: '#ffffff'
                     }}
                  >
                     Copyright 2021 Shomin Arena, a concern of Shomin Bangladesh
                     Ltd.
                  </Typography>
               </Box>
            </Box>
         </Container>
      </Box>
   );
};

export default BottomFooter;
