import { Route, Routes } from "react-router";
import { authRoutes, authenticatedRoutes } from "./routes";
export const Router = () => {
  return (
    <>
      <Routes>
        {authRoutes.map((item, index) => {
          return (
            <Route path={item.path} key={index} element={item.component} />
          );
        })}
        {authenticatedRoutes.map((item, index) => {
          return (
            <Route path={item.path} key={index} element={item.component} />
          );
        })}
      </Routes>
    </>
  );
};
