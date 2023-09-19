import ErrorAlert from "@/components/ui/error-alert/error-alert";
import EventList from "@/components/events/EventList";
import ResultsTitle from "@/components/results-title/results-title";
import Button from "@/components/ui/Button";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getFilteredEvents } from "@/helpers/api-utils";
import { EventType } from "@/types/event";

const FilteredEventsPage = ({
  events,
  date,
  hasError,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log({ events, date, hasError });

  const filterDate = new Date(date.year, date.month - 1);

  if (hasError) {
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
      {events && events.length > 0 ? (
        <>
          <ResultsTitle date={filterDate} />
          <EventList events={events} />
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

export const getServerSideProps: GetServerSideProps<{
  events: EventType[];
  hasError: boolean;
  date: {
    year: number;
    month: number;
  };
}> = async (context) => {
  const filterData = context.params?.slug as string[];
  const [year, month] = filterData;
  const filterDate = { year: +year, month: +month };

  let hasError = false;

  if (
    isNaN(filterDate.year) ||
    isNaN(filterDate.month) ||
    filterDate.year > 2030 ||
    filterDate.year < 2021 ||
    filterDate.month > 12 ||
    filterDate.month < 1
  ) {
    hasError = true;
  }

  const filteredEvents = await getFilteredEvents(filterDate);

  return {
    props: {
      events: filteredEvents,
      hasError,
      date: filterDate,
    },
  };
};
