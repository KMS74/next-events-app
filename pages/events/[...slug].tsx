import ErrorAlert from "@/components/ui/error-alert/error-alert";
import EventList from "@/components/events/EventList";
import ResultsTitle from "@/components/results-title/results-title";
import Button from "@/components/ui/Button";
import { getFilteredEvents } from "@/dummy-data";
import { useRouter } from "next/router";
import React from "react";

const FilteredEventsPage = () => {
  const router = useRouter();
  const filterData = router.query.slug as string[];

  if (!filterData) return <ErrorAlert>Loading...</ErrorAlert>;

  const [year, month] = filterData;
  const filterDate = { year: +year, month: +month };
  const date = new Date(filterDate.year, filterDate.month - 1);
  const filteredEvents = getFilteredEvents(filterDate);

  if (
    isNaN(filterDate.year) ||
    isNaN(filterDate.month) ||
    filterDate.year > 2030 ||
    filterDate.year < 2021 ||
    filterDate.month > 12 ||
    filterDate.month < 1
  ) {
    return (
      <>
        <ErrorAlert>Invalid filter. Please adjust your values!</ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </>
    );
  }

  return (
    <>
      {filteredEvents && filteredEvents.length > 0 ? (
        <>
          <ResultsTitle date={date} />
          <EventList events={filteredEvents} />
        </>
      ) : (
        <>
          <ErrorAlert>No events founds for the chosen filter!</ErrorAlert>
          <div className="center">
            <Button link="/events">Show all events</Button>
          </div>
        </>
      )}
    </>
  );
};

export default FilteredEventsPage;
