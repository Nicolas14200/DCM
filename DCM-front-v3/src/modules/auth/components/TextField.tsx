import { TextField } from "@mui/material";

interface TextFieldsProps {
  name: string;
}

export const TextFields: React.FC<TextFieldsProps> = (props) => {

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
        
      />
    </>
  );
};
