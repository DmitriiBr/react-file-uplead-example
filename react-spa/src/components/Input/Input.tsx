import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";
import classes from "./Input.module.css";

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef(
  ({ type, ...props }: Props, ref: ForwardedRef<HTMLInputElement>) => {
    const className = `${classes.input} ${props.className ?? ""}`;

    return <input {...props} className={className} type={type} ref={ref} />;
  },
);
