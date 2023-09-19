import EventList from "@/components/events/EventList";
import EventSearch from "@/components/events/EventSearch";
import { getAllEvents } from "@/helpers/api-utils";
import { EventType } from "@/types/event";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import React from "react";

const EventsPage = ({
  events,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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

export const getStaticProps: GetStaticProps<{
  events: EventType[];
}> = async () => {
  const events = await getAllEvents();
  return {
    props: {
      events,
    },
    revalidate: 60
  };
};
