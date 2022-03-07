import React from "react";
import "./Home.css";

import NewButton from "../../components/NewButton";
import CardHolder from "../../components/CardHolder";
import { useSelector } from "react-redux";
import { Store, User } from "../../resources/types";
import { logout } from "../../resources/ajax";
import { routes } from "../../resources";
import { Link } from "react-router-dom";

function Home() {
  const user = useSelector<Store, User | null>(({ user }) => user);

  const logOut = () => {
    logout();
    window.location.reload();
  };

  return (
    <div className="Home">
      <header className="App-header">
        <div className="title">Tasker</div>
        <div className="user">
          <span>{user?.username}</span>
        </div>
      </header>
      <div className="buttons">
        <button onClick={logOut}>Log Out</button>
        {user?.role === "ADMIN" && (
          <Link to={routes.ADMIN}>
            <button className="manage-users">Manage Users</button>
          </Link>
        )}
      </div>
      <div className="home-content">
        <NewButton />
        <CardHolder />
      </div>
    </div>
  );
}

export default Home;
