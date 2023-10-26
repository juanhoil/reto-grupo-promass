import {
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";

export const Toolbar = () => {
  return (
    <GridToolbarContainer
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 16,
        padding: "5px 10px",
      }}
    >
      <GridToolbarFilterButton />
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
};
