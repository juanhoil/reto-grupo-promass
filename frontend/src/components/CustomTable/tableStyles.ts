export const tableStyles = {
  border: 0,
  transition: "all ease 0.5s",
  "&.MuiDataGrid-root .MuiDataGrid-main": {
    border: "1px solid rgb(224, 224, 224)",
  },
  "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
    outline: "none !important",
  },
  "&.MuiDataGrid-columnHeader:last-child .MuiDataGrid-columnSeparator": {
    display: "none",
  },
  "& .MuiDataGrid-sortIcon": {
    opacity: 1,
    color: "white",
  },
};
