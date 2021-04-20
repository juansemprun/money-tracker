import React from 'react'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const Copyright = () => {
    return (
        <Box pt={4}>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                {'Juan Semprún '}
                {new Date().getFullYear()}
            </Typography>
        </Box>
    )
}

export default Copyright
