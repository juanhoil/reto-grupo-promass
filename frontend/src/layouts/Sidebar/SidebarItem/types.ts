interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  children: SidebarItem[];
  route?: string;
}

interface SidebarItemProps {
  item: SidebarItem;
  onClick: (route: string) => void;
  disabled?: boolean;
}
