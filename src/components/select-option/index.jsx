import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function GroupedSelect() {
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth margin="normal"  variant="outlined">
        <InputLabel htmlFor="grouped-native-select">Xizmatlar nomi</InputLabel>
        <Select
          native
          defaultValue=""
          id="grouped-native-select"
          label="Xizmatlar nomi"
        >
          <option aria-label="None" value="" />
          <option value={1}>Option 1</option>
          <option value={2}>Option 2</option>
        </Select>
      </FormControl>
    </div>
  );
}
