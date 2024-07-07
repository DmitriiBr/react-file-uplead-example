import { ForwardedRef, forwardRef, HTMLAttributes } from "react";
import classes from "./Container.module.css";

type Props = HTMLAttributes<HTMLDivElement>;

export const Container = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLDivElement>) => {
    const className = `${classes.container} ${props.className ?? ""}`;

    return <div {...props} className={className} ref={ref} />;
  },
);
