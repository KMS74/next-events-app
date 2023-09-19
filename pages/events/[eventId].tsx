import React from "react";
import {
  getAllEvents,
  getEventById,
  getFeaturedEvents,
} from "@/helpers/api-utils";
import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";
import Button from "@/components/ui/Button";
import ErrorAlert from "@/components/ui/error-alert/error-alert";
import { EventType } from "@/types/event";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

const EventDetailsPage = ({
  event,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!event)
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );

  return (
    <>
      <EventSummary title={event?.title} />
      <EventLogistics
        image={event?.image}
        address={event?.location}
        date={event?.date}
        imageAlt={event?.title}
      />
      <EventContent>{event?.description}</EventContent>
    </>
  );
};

export default EventDetailsPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const featuredEvents = await getFeaturedEvents();
  // Get the paths we want to pre-render based on events
  const paths = featuredEvents?.map((event) => ({
    params: {
      eventId: event.id,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<{
  event: EventType;
}> = async (context) => {
  const eventId = context.params?.eventId as string;
  const event = (await getEventById(eventId)) as EventType;

  return {
    props: {
      event,
    },
    revalidate: 30,
  };
};
