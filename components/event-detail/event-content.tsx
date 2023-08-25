import classes from "./event-content.module.css";

type Props = {
  children: React.ReactNode;
};

function EventContent({ children }: Props) {
  return <section className={classes.content}>{children}</section>;
}

export default EventContent;
