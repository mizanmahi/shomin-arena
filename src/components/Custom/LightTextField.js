import { styled, TextField } from '@mui/material';
import React, { forwardRef } from 'react';

const StyledTextField = styled(TextField)(({ theme }) => ({
   '& .MuiOutlinedInput-input': {
      fontWeight: 500,
      color: theme.palette.text.primary,
   },
   '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: '4px',
      border: '2px solid',
      borderColor:
         theme.palette.mode === 'light'
            ? theme.palette.secondary[300]
            : theme.palette.divider,
   },
   '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.secondary[300],
   },
   '& .MuiOutlinedInput-root': {
      '& fieldset': {
         borderColor: '#cccccc',
         borderWidth: '2px',
      },
      '&:hover fieldset': {
         borderColor: '#ff7004',
      },
      '&.Mui-focused fieldset': {
         borderColor: '#ff7004',
      },
   },
}));

const LightTextField = (props, ref) => {
   return <StyledTextField {...props} inputRef={ref} />;
};

export default forwardRef(LightTextField);
