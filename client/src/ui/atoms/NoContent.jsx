import no_content from '../../assets/no_content.png';
import { Box, Typography } from '@mui/material';

export const NoContent = (error) => {
  return (
    <Box
      sx={{
        mr: '6px',
        mt: '1px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        typography: {
          color: 'rgba(51, 51, 51, 0.5)',
          ml: '0px',
          mt: '202px',
        },
      }}
    >
      <img src={no_content} alt="unknown error" width="202px" height="202px" />

      <Typography width="269px" height="29px">
        Brak danych do wyświetlenia
      </Typography>
    </Box>
  );
};
