import React, { useState } from "react";
import "./User.css";
import { deleteUser } from "../../resources/ajax";
import { User as UserType } from "../../resources/types";

function User({
  data: { id, username, role },
  toggleEditing,
}: {
  data: UserType;
  toggleEditing: Function;
}) {
  const [deleted, setDeleted] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);

  const removeUser = () => {
    if (role === "ADMIN") return;
    deleteUser(id)
      .then(() => setDeleted(true))
      .catch(console.log);
  };

  return deleted ? (
    <></>
  ) : (
    <div className="User">
      <span>
        <strong>username: </strong>
        <span>{username}</span>
      </span>
      <span>
        <strong>role: </strong>
        <span>{role[0] + role.slice(1).toLowerCase()}</span>
      </span>
      <span>
        <strong>id: </strong>
        <span>{id}</span>
      </span>
      <span className="user-button">
        <button
          onClick={() => {
            role !== "ADMIN" && toggleEditing();
            setEditing(!editing);
          }}
        >
          {role === "ADMIN" ? "Immune" : editing ? "Close" : "Edit"}
        </button>
      </span>
      <span className="user-button">
        <button onClick={removeUser}>
          {role === "ADMIN" ? "Immune" : "Delete"}
        </button>
      </span>
    </div>
  );
}

export default User;
