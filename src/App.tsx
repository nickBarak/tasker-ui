import React, { useEffect, useState } from "react";

import LoginManager from "./pages/LoginManager";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Redirect from "./components/util/Redirect";
import NotFound from "./components/util/NotFound";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Store, User } from "./resources/types";
import { routes } from "./resources";
import { getTasks } from "./resources/ajax";
import { updateTasks, updateUser } from "./store/actions";

function App() {
  const user = useSelector<Store, User | null>(({ user }) => user);
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    if (!mounted) setMounted(true);

    const userString = localStorage.getItem("user");
    if (userString) {
      dispatch(updateUser(JSON.parse(userString)));
    }

    if (user) {
      getTasks().then((tasks) => dispatch(updateTasks(tasks)));
    }
  }, [mounted]);

  return !mounted ? (
    <h6> Loading...</h6>
  ) : (
    <BrowserRouter>
      <Routes>
        {user
          ? [
              <Route
                key={routes.LOG_IN}
                path={routes.LOG_IN}
                element={<Redirect to={routes.HOME} />}
              />,
              <Route key={routes.HOME} path={routes.HOME} element={<Home />} />,
            ]
          : [
              <Route
                key={routes.LOG_IN}
                path={routes.LOG_IN}
                element={<LoginManager />}
              />,
              <Route
                key={routes.HOME}
                path={routes.HOME}
                element={<Redirect to={routes.LOG_IN} />}
              />,
            ]}

        {user?.role === "ADMIN" && [
          <Route key={routes.ADMIN} path={routes.ADMIN} element={<Admin />} />,
        ]}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
