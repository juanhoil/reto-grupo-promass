import { useLocation } from "react-router-dom";
import { AccordionItem } from "./AccordionItem";
import { CustomListItem } from "./CustomListItem";

export const SidebarItem: React.FC<SidebarItemProps> = (props) => {
  const { item, onClick } = props;

  // routes
  const location = useLocation();
  const { pathname } = location;

  return item.children.length === 0 ? (
    <CustomListItem {...props} active={pathname === item.route} />
  ) : (
    <AccordionItem {...props}>
      {item.children.map((child, index) => (
        <CustomListItem
          key={`${child.label}_${index}`}
          item={child}
          onClick={onClick}
          active={pathname === child.route}
        />
      ))}
    </AccordionItem>
  );
};
