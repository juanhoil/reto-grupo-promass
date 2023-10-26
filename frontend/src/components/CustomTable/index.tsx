import {
  DataGrid,
  GridColDef,
  GridRowHeightParams,
  esES,
} from "@mui/x-data-grid";
import { Toolbar } from "./Toolbar";
import { tableStyles } from "./tableStyles";

interface TableProps {
  rows: any[];
  columns: GridColDef[];
  showToolbar?: boolean;
  showSearch?: boolean;
}

export const CustomTable: React.FC<TableProps> = ({
  rows,
  columns,
  showToolbar = true,
}) => {
  return (
    <DataGrid
      hideFooter
      disableColumnMenu
      rows={rows}
      columns={columns}
      getRowHeight={({ id, densityFactor }: GridRowHeightParams) => {
        if ((id as number) % 2 === 0) {
          return 100 * densityFactor;
        }

        return null;
      }}
      sx={{
        ...tableStyles,
        "&.MuiDataGrid-root .MuiDataGrid-columnHeaders": {
          color: "white",
          backgroundColor: (theme) => theme.palette.primary.main,
          width: "100%",
        },
      }}
      slots={{
        toolbar: showToolbar ? Toolbar : null,
      }}
      localeText={esES.components.MuiDataGrid.defaultProps.localeText}
    />
  );
};
