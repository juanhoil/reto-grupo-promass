import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import { PropsWithChildren, useState } from "react";

interface SidebarAccordionProps extends PropsWithChildren, SidebarItemProps {
  id?: string;
}

export const AccordionItem: React.FC<SidebarAccordionProps> = ({
  item,
  id = "",
  children,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <Accordion
        sx={{
          background: "none",
          boxShadow: "none",
        }}
        className="w-full"
        onChange={(_, value) => setExpanded(value)}
      >
        <AccordionSummary
          id={id}
          className="flex items-center w-full group rounded-lg cursor-pointer"
          sx={{
            "&.Mui-disabled": {
              opacity: 100,
            },
            background: expanded ? (theme) => theme.palette.sidebar.dark : "",
            ":hover": {
              bgcolor: (theme) =>
                !expanded ? theme.palette.primary.light : "",
              color: "white",
              transition: "all ease 300ms",
            },
          }}
          expandIcon={
            <GridExpandMoreIcon
              sx={{ color: (theme) => theme.palette.text.primary }}
              className={`${!expanded ? "group-hover:text-white" : ""}`}
            />
          }
        >
          <ListItemIcon
            sx={{
              color: (theme) => theme.palette.text.primary,
              display: "flex",
              alignItems: "center",
            }}
            className={`${!expanded ? "group-hover:text-white" : ""}`}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText
            primary={item.label}
            sx={{
              color: (theme) => theme.palette.text.primary,
            }}
            className={`${!expanded ? "group-hover:text-white" : ""}`}
            disableTypography
          />
        </AccordionSummary>
        <AccordionDetails sx={{ padding: "2px 10px" }}>
          {children}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
