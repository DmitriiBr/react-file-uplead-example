import { ForwardedRef, forwardRef, LabelHTMLAttributes } from "react";
import classes from "./Label.module.css";

type Props = LabelHTMLAttributes<HTMLLabelElement> & {
  title?: string;
};

export const Label = forwardRef(
  (
    { title, children, ...props }: Props,
    ref: ForwardedRef<HTMLLabelElement>,
  ) => {
    return (
      <div className={classes.labelContainer}>
        <label {...props} ref={ref}>
          {title}
        </label>
        {children}
      </div>
    );
  },
);
