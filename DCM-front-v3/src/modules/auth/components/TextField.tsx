import React, { useState } from "react";
import { TextField } from "@mui/material";

interface TextFieldsProps {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; 
}

export const TextFields: React.FC<TextFieldsProps> = (props) => {
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    props.onChange(event);
  };

  return (
    <>
      <TextField
        margin="normal"
        required
        fullWidth
        name={props.name}
        label={props.name}
        type={props.name}
        id={props.name}
        autoComplete="current-password"
        value={value}
        onChange={handleChange}
      />
    </>
  );
};
