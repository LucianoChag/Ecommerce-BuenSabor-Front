import Row from "./Row";

export default interface Column {
  id: string;
  label: string;
  renderCell: (rowData: Row) => JSX.Element; 
}
