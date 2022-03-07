import React, { useEffect, useState } from "react";
import "./Admin.css";
import { Link, useNavigate } from "react-router-dom";
import { getUsers, logout } from "../../resources/ajax";
import { routes } from "../../resources";
import { Store, User, User as UserType } from "../../resources/types";
import UserContainer from "../../components/UserContainer";
import { useSelector } from "react-redux";

function Admin() {
  const user = useSelector<Store, User>(
    ({ user }) => user || { id: -1, username: "Unkown", role: "Unkown" }
  );
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserType[]>([user]);

  const logOut = () => {
    logout();
    navigate(routes.LOG_IN);
    window.location.reload();
  };

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(console.log)
      .finally(() => {
        if (!user) {
          logOut();
        } else if (!users.length) {
          setUsers([user]);
        }
      });
  }, []);

  return (
    <div className="Admin">
      <div className="heading">Manage Users</div>
      <div className="buttons">
        <button onClick={logOut}>Log Out</button>
        <Link to={routes.HOME}>
          <button>See Tasks</button>
        </Link>
      </div>

      <ul>
        {users
          .sort((a, b) =>
            [a.username, b.username].sort()[0] === a.username ? -1 : 1
          )
          .map((data) => (
            <UserContainer key={data.id} data={data} />
          ))}
      </ul>
    </div>
  );
}

export default Admin;
