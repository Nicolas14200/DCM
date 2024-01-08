import { SignInSide } from '../auth/screens/SignInSide';
import { SignUp } from '../auth/screens/SignUp';
import { PlotsDisplay } from '../plotsDisplay/screens/PlotsDisplay';

export const authRoutes = [
  {
    path: '/',
    component: <SignInSide/>,
  },
  {
    path: '/signup',
    component: <SignUp/>,
  },
]
export const authenticatedRoutes = [
  {
    path: "/plots",
    component: <PlotsDisplay />,
  },

]