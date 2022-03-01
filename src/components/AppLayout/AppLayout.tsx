import React from 'react'

import { Container } from '@mui/material'
import { useTheme } from '@mui/material/styles'

interface AppLayoutProps {
    children?: React.ReactNode
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    const theme = useTheme()

    return (
        <Container
            maxWidth="lg"
            sx={{
                background: theme.palette.primary.dark,
                height: '100%',
                minHeight: '100vh',
                paddingBottom: theme.spacing(4)
            }}
        >
            {children}
        </Container>
    )
}

export default AppLayout