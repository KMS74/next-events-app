import React from "react";
import classes from "./logistics-item.module.css";

function LogisticsItem(props: {
  children: React.ReactNode;
  icon: JSX.ElementType;
}) {
  const { icon: Icon } = props;

  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <Icon />
      </span>
      <span className={classes.content}>{props.children}</span>
    </li>
  );
}

export default LogisticsItem;
