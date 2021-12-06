import { Container, Typography, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import EmailIcon from '@mui/icons-material/Email';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import { useTheme } from '@mui/material/styles';

const Topbar = () => {
   const theme = useTheme();
   const matches = useMediaQuery(theme?.breakpoints?.down('sm'));

   const centerVertically = {
      display: 'flex',
      alignItems: 'center',
   };

   return (
      <Box component='section'>
         <Container>
            <Box
               display='flex'
               alignItems='center'
               justifyContent='space-between'
               flexWrap='wrap'
               px={2}
               py={1}
            >
               <Box mr={2} sx={{ ...centerVertically }}>
                  <PhoneEnabledIcon sx={{ fontSize: '1.3rem' }} />
                  <Typography
                     component='a'
                     href='tel:01620705755'
                     sx={{
                        color: '#2F333A',
                        textDecoration: 'none',
                        mx: 1,
                        fontSize: '.8rem',
                     }}
                  >
                     01620705755
                  </Typography>
                  <EmailIcon sx={{ fontSize: '1.3rem' }} />
                  <Typography
                     component='a'
                     href='mailto:mizanmahi24@gmail.com'
                     sx={{
                        color: '#2F333A',
                        textDecoration: 'none',
                        ml: 1,
                        fontSize: '.8rem',
                     }}
                  >
                     shominarena.com.bd
                  </Typography>
               </Box>
               {!matches && (
                  <Box sx={{ ...centerVertically }}>
                     <MobileFriendlyIcon sx={{ fontSize: '1.3rem' }} />
                     <Typography
                        sx={{
                           color: '#2F333A',
                           textDecoration: 'none',
                           ml: 1,
                           fontSize: '.8rem',
                        }}
                     >
                        App is coming soon!
                     </Typography>
                  </Box>
               )}
            </Box>
         </Container>
      </Box>
   );
};

export default Topbar;
