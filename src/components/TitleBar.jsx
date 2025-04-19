import React, { useEffect, useState } from "react";
import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";

function TitleBar() 
{

    const navigate = useNavigate()
    const [auth, setAuth] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null)    

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setAnchorEl(null)
        localStorage.removeItem('auth')
        setAuth(false)
        navigate("/")
    }

    useEffect(() =>
    {
        const authFromLocalStorage = JSON.parse(localStorage.getItem('auth'))
        if(authFromLocalStorage)
        {
            setAuth(true)
        }
    }, [])

    return(
        <Box sx={{flexGrow:1}}>
            <AppBar position ="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Week Long Puzzle
                    </Typography>
                    {auth && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >                        
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                )}            
                </Toolbar>        
            </AppBar>
        </Box>
    )
}

export default TitleBar