import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

interface Props {
  webhookEventTypes: string[];
  setEventTypesValid: Dispatch<SetStateAction<boolean>>;
  setSelectedEventData: Dispatch<SetStateAction<any>>;
  subscribedEventsFromWebhooksById: any;
}

const CheckboxTree = (props: Props) => {
  const {
    webhookEventTypes,
    setEventTypesValid,
    setSelectedEventData,
    subscribedEventsFromWebhooksById,
  } = props;
  let eventData = webhookEventTypes.map((str: any) => ({ name: str }));
  let eventDataForEdit = subscribedEventsFromWebhooksById?.map((str: any) => ({
    name: str,
  }));

  console.log("eventDataForEdit", eventDataForEdit)
  const [events, setEvents] = useState<any>(eventData);

  const handleChange = (e: any) => {
    const { name, checked } = e.target;

    if (name === "allSelected") {
      let tempEvents = events.map((event: any) => {
        return { ...event, isChecked: checked };
      });
      setEvents(tempEvents);
    } else if (name === "selected") {
      let tempEvents = events.map((event: any) =>
        event.name === name ? { ...event, isChecked: checked } : event
      );
      setEvents(tempEvents);
    } else {
      let tempEvents = events.map((event: any) =>
        event.name === name ? { ...event, isChecked: checked } : event
      );
      setEvents(tempEvents);
    }
  };

  useEffect(() => {
    events.filter((event: any) => event.isChecked === true).length > 0
      ? setEventTypesValid(true)
      : setEventTypesValid(false);
    const selectedArray = events.filter((event: any) => {
      return event.isChecked === true;
    });
    setSelectedEventData(selectedArray);
  }, [events]);

  return (
    <>
      <FormControl>
        <Typography variant="subtitle1" mt={1.5}>
          Trigger Events
        </Typography>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
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
              events?.filter((event: any) => event?.isChecked !== true).length <
              1
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
            checked={
              events.filter((event: any) => event?.isChecked === true)
                ?.length !== events.length
            }
            onChange={handleChange}
          />
        </RadioGroup>
      </FormControl>
      <form style={{ marginLeft: "25px" }}>
        {events.map((event: any, index: number) => (
          <div key={index}>
            <input
              type="checkbox"
              style={{ height: "13px", width: "13px", marginBottom: "15px" }}
              name={event.name}
              checked={event?.isChecked || false }
              onChange={handleChange}
            />
            <label
              style={{
                fontSize: 16,
                marginLeft: "3px",
                fontFamily: "Roboto,Helvetica,Arial,sans-serif",
              }}
            >
              {event.name}
            </label>
          </div>
        ))}
      </form>
    </>
  );
};

export default CheckboxTree;
