import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Titulo",
    minWidth: 200,
    flex: 1,
    filterable: false,
  },
  {
    field: "author",
    headerName: "Author",
    minWidth: 100,
    flex: 1,
    filterable: false,
  },
  {
    field: "content",
    renderCell: (params) => params.value,
    headerName: "Contenido",
    minWidth: 350,
    flex: 1,
    filterable: false,
  },
  {
    field: "publicationDate",
    renderCell: (params) => params.value,
    headerName: "Fecha de publicación",
    minWidth: 300,
    flex: 1,
    filterable: false,
  },
  {
    field: "actions",
    renderCell: (params) => params.value,
    headerName: "Acciones",
    headerAlign: "center",
    align: "center",
    minWidth: 120,
    flex: 1,
    filterable: false,
    sortable: false,
  },
];
