import { ButtonHTMLAttributes, ForwardedRef, forwardRef } from "react";
import classes from "./Button.module.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLButtonElement>) => {
    const className = `${classes.button} ${props.className ?? ""}`;

    return <button {...props} className={className} ref={ref} />;
  },
);
