import React from 'react'
import { Link, useLocation } from 'react-router-dom';

// MUI
import { Box, Container } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// Assets
import { ReactComponent as Logo } from '../../assets/logos/logo.svg'
import { ReactComponent as ArrowGrey } from '../../assets/icons/icon-arrow-grey.svg'

interface AppLayoutProps {
    children?: React.ReactNode
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    const theme = useTheme()
    const { pathname } = useLocation()

    return (
        <Container
            maxWidth="lg"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                minHeight: '100vh',
                paddingBottom: theme.spacing(4)
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    paddingTop: theme.spacing(3),
                    paddingBottom: theme.spacing(1),
                }}
                width={1}
            >
                <Logo />
            </Box>
            {pathname.length > 1 && (
                <Link
                    to={'/'}
                    style={{
                        color: theme.palette.primary.main,
                        marginTop: theme.spacing(3.5)
                    }}
                >
                    <ArrowGrey />
                </Link>
            )}
            {children}
        </Container>
    )
}

export default AppLayout