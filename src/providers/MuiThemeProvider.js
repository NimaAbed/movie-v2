"use client"

import { ThemeProvider, createTheme } from '@mui/material';
import React from 'react';

const theme = createTheme({
    typography: {
        fontFamily: "inherit"
    },
    direction: "rtl"
})

const MuiThemeProvider = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
};

export default MuiThemeProvider;