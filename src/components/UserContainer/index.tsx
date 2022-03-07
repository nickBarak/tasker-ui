import React, { useEffect, useState } from "react";
import "./UserContainer.css";
import { editPassword } from "../../resources/ajax";
import { User as UserType } from "../../resources/types";
import User from "../User";

function UserContainer({ data }: { data: UserType }) {
  const [editing, setEditing] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword)
      return setError("Passwords must match");
    editPassword(data.id, { username: data.username, password: newPassword })
      .then(() => {
        setError("");
        setSuccess("Password changed successfully");
      })
      .catch(() => {
        setSuccess("");
        setError("Error changing password");
      })
      .finally(() => {
        setNewPassword("");
        setConfirmNewPassword("");
      });
  };

  useEffect(() => {
    setNewPassword("");
    setConfirmNewPassword("");
    setError("");
    setSuccess("");
  }, [editing]);

  return (
    <div className="UserContainer">
      <User data={data} toggleEditing={() => setEditing(!editing)} />
      <div className="change-password">
        {editing && (
          <form onSubmit={onSubmit}>
            <input
              required
              type="text"
              placeholder="new password"
              value={newPassword}
              onChange={({ target: { value } }) => setNewPassword(value)}
            />
            <input
              required
              type="text"
              placeholder="confirm new password"
              value={confirmNewPassword}
              onChange={({ target: { value } }) => setConfirmNewPassword(value)}
            />
            <button>Submit</button>
          </form>
        )}
        <div className="change-password-message">
          <span className="change-password-error">{error}</span>
          <span className="change-password-success">{success}</span>
        </div>
      </div>
    </div>
  );
}

export default UserContainer;
