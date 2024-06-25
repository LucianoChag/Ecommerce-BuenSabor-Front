// TableComponent.tsx
import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TablePagination, useMediaQuery, useTheme } from '@mui/material';
import Row from '../../../types/Row';
import Column from '../../../types/Column';

interface Props {
  data: Row[];
  columns: Column[];
  keyField: string;
  pagination: boolean;
}

const TableComponent: React.FC<Props> = ({ data, columns, keyField, pagination }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredColumns = isMobile
    ? columns.filter((column) => ['imagen', 'denominacion', 'precioVenta', 'actions'].includes(column.id))
    : columns;

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            {filteredColumns.map((column) => (
              <TableCell key={column.id} sx={{ display: 'none' }}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row[keyField]}>
              {filteredColumns.map((column) => (
                <TableCell key={`${row[keyField]}-${column.id}`}>
                  {column.renderCell ? column.renderCell(row) : row[column.id]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {pagination && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </>
  );
};

export default TableComponent;