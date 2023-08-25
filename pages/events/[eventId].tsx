import React from "react";
import { useRouter } from "next/router";
import { EventType, getEventById } from "@/dummy-data";
import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";
import Button from "@/components/ui/Button";
import ErrorAlert from "@/components/ui/error-alert/error-alert";

const EventDetailsPage = () => {
  const router = useRouter();
  const eventId = router.query.eventId;
  const event = getEventById(eventId as string);

  if (!event)
    return (
      <>
        <ErrorAlert>No event found!</ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </>
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
