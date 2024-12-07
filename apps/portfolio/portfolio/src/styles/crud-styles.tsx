import type { SxProps } from '@mui/material/styles';

export const inverseColors: SxProps = {
  backgroundColor: '#FFFFFF',
  color: '#1f1f1f',
};

export const baseCrudDisplayStyleSxProps: SxProps = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
};

export const crudPaperSxProps: SxProps = {
  ...baseCrudDisplayStyleSxProps,
  width: '100%',
};

export const crudHomeContainerSxProps: SxProps = {
  m: 2,
  flex: '0 1 100%',
};

export const crudDataGridGridsSxProps: SxProps = {
  flex: '0 1 100%',
};

export const crudHomeTextStyles: SxProps = {
  ...inverseColors,
  flex: 1,
  textAlign: 'center',
};

export const AddEntryModalStyle: SxProps = {
  ...inverseColors,
  minWidth: '50vw',
  maxWidth: '800px',
  minHeight: '50vh',
  maxHeight: 'fit-content',
  border: '7.5px solid purple',
  boxShadow: 24,
  borderRadius: 1,
};

export const crudAppWrapperStyles: SxProps = {
  width: '90vw',
  minHeight: '30vh',
  height: 'fit-content',
  borderRadius: 1,
};

export const crudAddButtonStyles: SxProps = { m: 1, flex: '1 0 30%', fontSize: '1rem' };

export const crudAddErrorTextStyles: SxProps = { fontSize: '1.25rem' };

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
