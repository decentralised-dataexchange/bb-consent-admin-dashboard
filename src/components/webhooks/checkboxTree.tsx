import { useState } from "react";
import {
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const eventData: any = [
  { name: "event 1" },
  { name: "event 2" },
  { name: "event 3" },
  { name: "event 4" },
  { name: "event 5" },
];

const CheckboxTree = () => {
  const [events, setEvents] = useState(eventData);
  const [selected, setSelected] = useState(true);

  const handleChange = (e: any) => {
    const { name, checked } = e.target;

    console.log("name", name);
    console.log("selected", selected);

    if (name === "allSelected") {
      setSelected(false);
      let tempEvents = events.map((user: any) => {
        return { ...user, isChecked: checked };
      });
      setEvents(tempEvents);
    } else {
      setSelected(true);

      let tempEvents = events.map((user: any) =>
        user.name === name ? { ...user, isChecked: checked } : user
      );
      setEvents(tempEvents);
    }
  };

  return (
    <>
      <FormControl>
        <Typography variant="subtitle1" mt={1.5}>
          Trigger Events
        </Typography>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          // defaultValue="selected"
          name="radio-buttons-group"
        >
          <FormControlLabel
            value={false}
            name="allSelected"
            control={
              <Radio
                size="small"
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: 18,
                  },
                }}
              />
            }
            label="All User Requests"
            checked={
             events.filter((event: any) => event?.isChecked !== true).length < 1
            }
            onChange={handleChange}
          />
          <FormControlLabel
            value={true}
            name="selected"
            control={
              <Radio
                size="small"
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: 18,
                  },
                }}
              />
            }
            label="Selected User Requests"
            checked={selected === true}
            onChange={handleChange}
          />
        </RadioGroup>
      </FormControl>
      <form style={{marginLeft:"25px"}}>
        {events.map((event: any, index: number) => (
          <div key={index}>
            <input
              type="checkbox"
              name={event.name}
              checked={event?.isChecked || false}
              onChange={handleChange}
            />
            <label>{event.name}</label>
          </div>
        ))}
      </form>
    </>
  );
};

export default CheckboxTree;
