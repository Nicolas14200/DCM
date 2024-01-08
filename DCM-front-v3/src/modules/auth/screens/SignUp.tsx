import { Box, Button, Grid, Paper } from "@mui/material";
import { TextFields } from "../components/TextField";
import { signUpViewModel } from "../viewModel/SignUpViewModel";
import { User } from "../../../core/domains/types/User";
import { useNavigate } from "react-router";
import { Header } from "../../components/Header";

export const SignUp = () => {
  const navigate = useNavigate();

  const handleSubmitSignUp = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const data: FormData = new FormData(event.currentTarget);
    const apiResult: User = await signUpViewModel.signUp({
      email: data.get("email") as string,
      password: data.get("password") as string,
      name: data.get("name") as string,
    });
    if(apiResult.token){
      navigate("/plots")
    }
  };
  const handleReturn = () => {
    navigate("/")
  }
  return (
    <div className="flex items-center justify-center h-screen flex-col">
    <Header />
    <div className="flex items-center justify-center h-screen flex-col">
   
      <Grid container component="main">
        <Grid item component={Paper}>
          <Box component="form" onSubmit={handleSubmitSignUp}>
            <TextFields name="name" />
            <TextFields name="email" />
            <TextFields name="password" />
            <Button type="submit" fullWidth variant="contained">
              Sign Up
            </Button>
          </Box>
        </Grid>
      </Grid>
      <p onClick={handleReturn} className="hover:cursor-pointer hover:text-slate-400">retour</p>
    </div>
    
    </div>
  );
};
