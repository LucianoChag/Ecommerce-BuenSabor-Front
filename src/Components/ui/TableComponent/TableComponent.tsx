// TableComponent.tsx

import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel, TablePagination, Box } from '@mui/material';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import Row from '../../../types/Row';
import Column from '../../../types/Column';
import { useAuth } from '../../../contexts/AuthContext';

interface Props {
  data: Row[];
  columns: Column[];
  keyField: string;
  pagination: boolean;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
}

const TableComponent: React.FC<Props> = ({ data, columns, keyField, pagination, onEdit, onDelete }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [orderBy, setOrderBy] = React.useState<keyof Row>('');
  const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');
  const { userRole } = useAuth();

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property: keyof Row) => () => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedData = React.useMemo(() => {
    return orderBy
      ? [...data].sort((a, b) => {
          const aValue = a[orderBy];
          const bValue = b[orderBy];
          return (order === 'asc' ? aValue > bValue : aValue < bValue) ? 1 : -1;
        })
      : data;
  }, [data, orderBy, order]);

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={orderBy === column.id ? order : 'asc'}
                  onClick={handleRequestSort(column.id)}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            ))}
            {/* Render actions cell only if onEdit or onDelete functions are provided */}
            {(onEdit || onDelete) && <TableCell>Acciones</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow key={row[keyField]}>
                {columns.map((column) => (
                  <TableCell key={`${row[keyField]}-${column.id}`}>
                    {column.renderCell ? column.renderCell(row) : row[column.id]}
                  </TableCell>
                ))}
                {(onEdit || onDelete) && (
                  <TableCell>
                    <Box sx={{ display: 'flex' }}>
                      {onEdit && <EditButton onClick={() => onEdit(row)} />}
                      {onDelete && userRole === 'ADMIN' && <DeleteButton onClick={() => onDelete(row)} />}
                    </Box>
                  </TableCell>
                )}
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
