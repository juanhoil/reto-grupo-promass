import { Search, Visibility, VisibilityOff } from "@mui/icons-material";

interface InputAdornment {
  search: boolean;
  onSearch: () => void;
  password: boolean;
  isVisible: boolean;
  onChangeVisibility: (value: boolean) => void;
}

export const EndAdornment: React.FC<InputAdornment> = ({
  search,
  onSearch,
  password,
  isVisible,
  onChangeVisibility,
}) => {
  if (search) {
    return (
      <Search className="cursor-pointer icon text-2xl" onClick={onSearch} />
    );
  }

  if (password) {
    if (isVisible) {
      return (
        <VisibilityOff
          className="mr-2 cursor-pointer icon text-2xl fill-neutral-500"
          onClick={() => onChangeVisibility(false)}
        />
      );
    }
    return (
      <Visibility
        className="mr-2 cursor-pointer icon text-2xl fill-neutral-500"
        onClick={() => onChangeVisibility(true)}
      />
    );
  }

  return null;
};
