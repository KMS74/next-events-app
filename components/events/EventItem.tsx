import Link from "next/link";
import React from "react";
import Image from "next/image";
import classes from "@/styles/event-item.module.css";
import Button from "../ui/Button";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
import { EventType } from "@/types/event";

type Props = {
  event: EventType;
};

const EventItem: React.FC<Props> = ({ event }) => {
  const { id, title, image, location, date, description, isFeatured } = event;
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAddress = location.replace(", ", " \n");
  const exploreLink = `/events/${id}`;
  return (
    <li className={classes.item}>
      <Image
        src={"/" + image}
        width={450}
        height={450}
        alt={event.title}
      />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <address>{formattedAddress}</address>
            <AddressIcon />
          </div>
        </div>

        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
