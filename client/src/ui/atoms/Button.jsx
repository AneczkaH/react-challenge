import * as React from 'react';
import { Button as MuiButton } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material';
import { theme } from '../../theme.js';

let buttonTheme = createTheme(theme, {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          alginItems: 'center',
          fontStyle: 'normal',
          fontSize: '15px',
          lineHeight: '22px',
          padding: '8px 10px',
          margin: '5px',
          minWidth: '38px',
          minHeight: '38px',
          maxWidth: 'auto',
          maxHeight: '38px',
          possition: 'static',
        },

        outlinedPrimary: {
          backgroundColor: theme.palette.secondary.main,
          border: 'none',
          '&:disabled': {
            backgroundColor: 'rgba(51, 51, 51, 0.07)',
            color: 'rgba(51, 51, 51, 0.25)',
          },
          '&:active, &:hover': {
            backgroundColor: theme.palette.secondary.dark,
            color: theme.palette.primary.dark,
            border: 'none',
          },
        },

        outlinedError: {
          border: `1px solid ${theme.palette.error.main}`,
          '&:hover, &:active': { backgroundColor: theme.palette.error.light },
        },

        outlinedSuccess: {
          border: '1px solid #66BB6A',
          color: theme.palette.success.main,
          '&:hover, &:active': {
            backgroundColor: theme.palette.success.light,
            color: theme.palette.success.main,
          },
        },
        outlinedWarning: {
          border: `1px solid ${theme.palette.warning.main}`,
          '&:hover, &:active': { backgroundColor: theme.palette.warning.light },
        },

        containedPrimary: {
          '&:hover': { color: theme.palette.secondary.main },
        },

        containedError: {
          backgroundColor: theme.palette.error.light,
          border: 'none',
          color: theme.palette.error.main,
          '&:active': {
            backgroundColor: theme.palette.error.light,
            color: theme.palette.error.main,
          },
          '&:hover': {
            backgroundColor: theme.palette.error.main,
            color: '#FFFFFF',
          },
        },

        containedSuccess: {
          backgroundColor: theme.palette.success.light,
          border: 'none',
          color: theme.palette.success.main,
          '&:active': {
            backgroundColor: theme.palette.success.light,
            color: theme.palette.success.main,
          },
          '&:hover': {
            backgroundColor: theme.palette.success.main,
            color: '#FFFFFF',
          },
        },

        containedWarning: {
          backgroundColor: theme.palette.warning.light,
          border: 'none',
          color: theme.palette.warning.dark,
          '&:active': {
            backgroundColor: theme.palette.warning.light,
            color: theme.palette.warning.main,
          },
          '&:hover': {
            backgroundColor: theme.palette.warning.main,
            color: '#FFFFFF',
          },
        },

        contained: {
          '&:disabled': {
            backgroundColor: 'rgba(51, 51, 51, 0.07)',
            color: 'rgba(51, 51, 51, 0.25)',
            border: 'none',
          },
        },

        outlined: {
          '&:disabled': {
            border: '1px solid rgba(51, 51, 51, 0.07)',
            color: 'rgba(51, 51, 51, 0.25)',
          },
        },
      },
    },
  },
});

export function Button({ children, ...props }) {
  return (
    <ThemeProvider theme={buttonTheme}>
      <MuiButton onClick={props.onClick} {...props}>
        {children}
        {props.textbutton}
      </MuiButton>
    </ThemeProvider>
  );
}
