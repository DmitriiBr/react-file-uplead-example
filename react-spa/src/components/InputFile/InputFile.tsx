import { Input } from "$/Input/Input";
import { Label } from "$/Label/Label";
import { ChangeEventHandler, InputHTMLAttributes, useState } from "react";

type Props = {
  title?: string;
  id?: string;
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "id" | "type" | "tabIndex" | "accept"
  >;
};

export const InputFile = ({ id, title, inputProps }: Props) => {
  return (
    <Label htmlFor={id} title={title}>
      <Input id={id} type="file" tabIndex={0} {...inputProps} />
    </Label>
  );
};
