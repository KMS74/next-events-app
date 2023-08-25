import { EventType } from "@/dummy-data";
import React from "react";
import EventItem from "./EventItem";
import classes from "@/styles/event-list.module.css";

type Props = {
  events: EventType[];
};

const EventList: React.FC<Props> = ({ events }) => {
  return (
    <ul className={classes.list}>
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </ul>
  );
};

export default EventList;
