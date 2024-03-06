import { Box, Button, Grid, Paper } from "@mui/material";
import { TextFields } from "../components/TextField";
import { signUpViewModel } from "../viewModel/SignUpViewModel";
import { User } from "../../../core/domains/types/User";
import { useNavigate } from "react-router";
import { Header } from "../../components/Header";
import { useState } from "react";

export const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmitSignUp = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const apiResult: User = await signUpViewModel.signUp({
      email: email,
      password: password,
      name: name,
    });
    if (apiResult.token) {
      navigate("/plots");
    }
  };

  const handleReturn = () => {
    navigate("/");
  };

  const handleInputChangeName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const name = event.target.value;
    setName(name);
  };

  const handleInputChangeEmail = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const mail = event.target.value;
    setEmail(mail);
  };

  const handleInputChangePassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const passsword = event.target.value;
    setPassword(passsword);
  };

  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <Header />
      <div className="flex items-center justify-center h-screen flex-col">
        <Grid container component="main">
          <Grid item component={Paper}>
            <Box component="form" onSubmit={handleSubmitSignUp}>
              <TextFields name="name" onChange={handleInputChangeName} />
              <TextFields name="email" onChange={handleInputChangeEmail} />
              <TextFields
                name="password"
                onChange={handleInputChangePassword}
              />
              <Button type="submit" fullWidth variant="contained">
                Sign Up
              </Button>
            </Box>
          </Grid>
        </Grid>
        <p
          onClick={handleReturn}
          className="hover:cursor-pointer hover:text-slate-400"
        >
          retour
        </p>
      </div>
    </div>
  );
};
