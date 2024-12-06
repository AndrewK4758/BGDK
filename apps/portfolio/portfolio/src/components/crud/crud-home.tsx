import { Text } from '@bgdk/shared-react-components';
import { type SxProps } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Outlet, useLocation } from 'react-router-dom';
import Paper from '@mui/material/Paper';
// import Theme from '../../styles/theme';

export const baseCrudDisplayStyleSxProps: SxProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 1,
};

export const inverseColors: SxProps = {
  backgroundColor: '#FFFFFF',
  color: '#1f1f1f',
};

const crudHomeContainerSxProps: SxProps = {
  ...baseCrudDisplayStyleSxProps,
  flex: '1 0 100%',
};

const crudPaperSxProps: SxProps = {
  ...baseCrudDisplayStyleSxProps,
  flexDirection: 'row',
  flex: '1 0 100%',
};

const crudDataGridGridsSxProps: SxProps = {
  width: '100%',
  margin: 2,
};

export const dataGridStyleUpdate: SxProps = {
  color: '#1f1f1f',
  fontSize: '.875rem',
  fontFamily: 'monospace',
  '& .MuiDataGrid-columnHeader': {
    backgroundColor: '#FFFFFF',
  },
  '& .MuiDataGrid-scrollbarFiller--header': {
    backgroundColor: 'white',
  },
  '& .MuiToolbar-root': {
    color: '#1f1f1f',
  },
  '& .MuiTablePagination-selectLabel': {
    fontSize: '1rem',
    fontFamily: 'Mono',
  },
  '& .MuiTablePagination-displayedRows': {
    fontSize: '1rem',
    fontFamily: 'Mono',
  },
};

const CrudHome = () => {
  const { pathname } = useLocation();

  return (
    <Box component={'div'} id="crud-home-container" sx={crudHomeContainerSxProps}>
      <Paper key={'crud-outlet-wrapper'} id="crud-outlet-wrapper" sx={crudPaperSxProps}>
        <Box
          component={'div'}
          key={'data-grid-grids-wrapper'}
          id="data-grid-grids-wrapper"
          sx={crudDataGridGridsSxProps}
        >
          {pathname === '/crud' && (
            <Box
              component={'div'}
              key={'data-grid-grids-home-title'}
              id="data-grid-grids-home-title"
              sx={{ flex: '1 0 100%' }}
            >
              <Text
                titleText={'Make A Selection Above'}
                titleVariant="h2"
                sx={{
                  ...baseCrudDisplayStyleSxProps,
                  flex: 1,
                  color: '#1f1f1f',
                  backgroundColor: '#FFFFFF',
                }}
              />
            </Box>
          )}
          <Box sx={{ paddingX: 2, width: '100%' }}>
            <Outlet />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default CrudHome;
