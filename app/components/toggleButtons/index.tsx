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
            color: "#13182d",
            "&:hover": {
              background: "#cfcfcf",
              color: "#13182d",
            },
            "&.Mui-selected": {
              color: " #13182d",
              background: "#f0b90b",
              "&:hover": {
                color: " #13182d",
                background: "#fcd535",
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
