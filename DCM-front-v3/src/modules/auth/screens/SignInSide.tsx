import { Box, Button } from "@mui/material";
import { signInViewModel } from "../viewModel/SignInViewModel";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../config/Context";
import { User } from "../../../core/domains/types/User";
import { useNavigate } from "react-router";
import { TextFields } from "../components/TextField";
import { Header } from "../../components/Header";

export const SignInSide: React.FC = () => {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmitSignIn = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const apiResult: User = await signInViewModel.signIn(email, password);
    setUser(apiResult);
  };

  const handleSubmitSignUp = () => {
    navigate("/signup");
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

  useEffect(() => {
    if (user?.token) {
      navigate("/plots");
    }
  });

  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <Header />
      <div className="flex items-center justify-center h-screen flex-col">
        <Box
          component="form"
          onSubmit={handleSubmitSignIn}
          className="mb-[8px]"
        >
          <TextFields name="email" onChange={handleInputChangeEmail} />
          <TextFields name="password" onChange={handleInputChangePassword} />
          <div className="mb-[8px]">
            <Button type="submit" fullWidth variant="contained">
              Sign In
            </Button>
          </div>
          <Button
            type="submit"
            onClick={handleSubmitSignUp}
            fullWidth
            variant="contained"
          >
            Sign Up
          </Button>
        </Box>
      </div>
    </div>
  );
};
