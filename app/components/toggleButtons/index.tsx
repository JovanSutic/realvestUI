import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { DropdownOptions } from "../dropdown";

const ToggleButtons = ({
  options,
  onChange,
  value,
}: {
  options: DropdownOptions[];
  onChange: (value: string) => void;
  value: string;
}) => {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={(event, value) => {
        onChange(value);
      }}
      aria-label="Platform"
    >
      {options.map((option) => (
        <ToggleButton
          disableRipple={true}
          key={option.value}
          value={option.value}
          sx={{
            padding: "4px 8px",
            background: "#eeeeee",
            color: "#161b2f",
            "&:hover": {
              background: "#cfcfcf",
              color: "#161b2f",
            },
            "&.Mui-selected": {
              color: " #eeeeee",
              background: "#161b2f",
              "&:hover": {
                color: " #eeeeee",
                background: "#31343f",
              },
            },
          }}
        >
          {option.text}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default ToggleButtons;
