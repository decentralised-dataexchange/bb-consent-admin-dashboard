import * as React from "react";

import {
  FormControl,
  Select,
  OutlinedInput,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

interface Props {
    displayValue: string,
    selectWidth?: string
}

const OrganisationSubscriptionMethod = ["Value 1", "Value 2"];

const Dropdown = (props: Props) => {
    const { displayValue, selectWidth } = props
  const [subscriptionMethodValue, setSubscriptionMethodValue] = React.useState<
    string[]
  >([]);

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
    <FormControl sx={{width:selectWidth ? selectWidth :"250px"}}>
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
        {OrganisationSubscriptionMethod.map(
          (OrganisationSubscriptionMethod) => (
            <MenuItem
              key={OrganisationSubscriptionMethod}
              value={OrganisationSubscriptionMethod}
            >
              {OrganisationSubscriptionMethod}
            </MenuItem>
          )
        )}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
