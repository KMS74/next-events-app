import Link from "next/link";
import React from "react";
import classes from "@/styles/button.module.css";

type Props = {
  children: React.ReactNode;
  link?: string;
  onClick?: () => void;
};

const Button: React.FC<Props> = ({ children, link, onClick }) => {
  if (link)
    return (
      <Link href={link} legacyBehavior>
        <a className={classes.btn}>{children}</a>
      </Link>
    );

  return (
    <button className={classes.btn} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
