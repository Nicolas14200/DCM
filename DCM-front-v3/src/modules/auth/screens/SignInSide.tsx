import { Box, Button } from "@mui/material";
import { signInViewModel } from "../viewModel/SignInViewModel";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../config/Context";
import { User } from "../../../core/domains/types/User";
import { useNavigate } from "react-router";
import { TextFields } from "../components/TextField";
import { Header } from "../../components/Header";

export const SignInSide: React.FC = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmitSignIn = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const data: FormData = new FormData(event.currentTarget);
    const apiResult: User = await signInViewModel.signIn(
      data.get("email") as string,
      data.get("password") as string
    );
    setUser(apiResult);
  };

  const handleSubmitSignUp = () => {
    navigate("/signup");
  };

  useEffect(() => {
    if (user?.token) {
      console.log("token", user?.token);
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
          <TextFields name="email" />
          <TextFields name="password" />
          <div className="mb-[8px]">
          <Button type="submit" fullWidth variant="contained" >
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
