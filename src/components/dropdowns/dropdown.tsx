import * as React from "react";

import {
  FormControl,
  Select,
  OutlinedInput,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

interface Props {
  displayValue: string;
  selectWidth?: string;
  dropdownValues: {
    value: string;
  }[];
}

const Dropdown = (props: Props) => {
  const { displayValue, selectWidth, dropdownValues } = props;
  const [subscriptionMethodValue, setSubscriptionMethodValue] = React.useState<
    string[]
  >([]);

  console.log("dp values", dropdownValues)

  const handleChange = (
    event: SelectChangeEvent<typeof subscriptionMethodValue>
  ) => {
    const {
      target: { value },
    } = event;
    setSubscriptionMethodValue(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <FormControl sx={{ width: selectWidth ? {xs:"250px", sm:selectWidth,} : "250px" }}>
      <Select
        displayEmpty
        value={subscriptionMethodValue}
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <em>{displayValue}</em>;
          }

          return selected.join(", ");
        }}
        inputProps={{ "aria-label": "Without label" }}
      >
        {dropdownValues.map((dropdownValues) => (
          <MenuItem key={dropdownValues.value} value={dropdownValues.value}>
            {dropdownValues.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
