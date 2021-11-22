import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const NotFound = () => {
    return (
        <div>
            <Typography>404 | Not Found</Typography>
            <Box>
                <Button>Back To home</Button>
            </Box>
        </div>
    )
}

export default NotFound