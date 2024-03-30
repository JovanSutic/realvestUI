import {
  MenuItem,
  FormControl,
  Select as MuiSelect,
  SelectChangeEvent,
} from "@mui/material";
import { DropdownOptions } from "../dropdown";

export default function Select({
  value,
  options,
  setValue,
}: {
  value: string;
  options: DropdownOptions[];
  setValue: (value: string) => void;
}) {
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  return (
    <FormControl
      sx={{
        margin: "2px",
        verticalAlign: "super",
        minWidth: 120,
      }}
      size="small"
    >
      <MuiSelect
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={value}
        variant="outlined"
        onChange={handleChange}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.text}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}
