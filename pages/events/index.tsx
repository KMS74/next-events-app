import EventList from "@/components/events/EventList";
import EventSearch from "@/components/events/EventSearch";
import { getAllEvents } from "@/dummy-data";
import { useRouter } from "next/router";
import React from "react";

const EventsPage = () => {
  const events = getAllEvents();
  const router = useRouter();

  const findEvents = (year: string, month: string) => {
    router.push(`/events/${year}/${month}`);
  };
  return (
    <>
      <EventSearch onSearch={findEvents} />
      <EventList events={events} />
    </>
  );
};

export default EventsPage;
