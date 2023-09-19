import { EventType } from "@/types/event";

const BASE_URL = "http://localhost:8000/events";

export async function getAllEvents() {
  const res = await fetch(BASE_URL);
  const data: EventType[] = await res.json();
  return data;
}

export async function getFeaturedEvents() {
  const res = await fetch(`${BASE_URL}?isFeatured=true`);
  const data: EventType[] = await res.json();
  return data;
}

export async function getEventById(id: string) {
  const res = await fetch(`${BASE_URL}/${id}`);
  const data: EventType = await res.json();
  return data;
}

export async function getFilteredEvents(dateFilter: {
  year: number;
  month: number;
}) {
  const { year, month } = dateFilter;
  let monthString = month.toString();
  if (month < 10) monthString = "0" + month;

  const res = await fetch(
    `${BASE_URL}?date_gte=${year}-${monthString}-01&date_lte=${year}-${monthString}-31`
  );

  const data: EventType[] = await res.json();
  return data;
}
