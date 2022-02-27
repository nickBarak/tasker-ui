import React, { useEffect, useState } from 'react';
import { deleteUser } from '../ajax';
import { User as UserType } from '../types';

function User({ data: { id, username, role }, toggleEditing }: { data: UserType; toggleEditing: Function; }) {
    const [deleted, setDeleted] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);

    const removeUser = () => {
        if (role === "ADMIN") return;
        deleteUser(id).then(() => setDeleted(true)).catch(console.log);
    };

  return deleted ? <></> : (
    <div className="User">
        <span className="card-date">
            <strong>username: </strong>
            <span>{username}</span>
        </span>
        <span className="card-date">
            <strong>role: </strong>
            <span>{role[0] + role.slice(1).toLowerCase()}</span>
        </span>
        <span className="card-date">
            <strong>id: </strong>
            <span>{id}</span>
        </span>
        <span className="user-button">
            <button onClick={() => { role !== "ADMIN" && toggleEditing(); setEditing(!editing); }}>{role === "ADMIN" ? "Immune" : editing ? "Close" : "Edit"}</button>
        </span>
        <span className="user-button">
            <button onClick={removeUser}>{role === "ADMIN" ? "Immune" : "Delete"}</button>
        </span>

        <style>{`
            .User {
                font-size: 1.05rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 2rem;
                border-radius: 5px;
                border: outline;
                box-shadow: 1px 1px .5rem gray;
                padding: 2rem;
                outline: 1px solid lightgray;
                margin-bottom: 1.15rem;
                transition: transform 150ms ease-out;
            }

            .User:hover {
                transform: translateY(-.13rem);
                cursor: default;
            }

            .User > div:first-of-type {
                width: 90%;
            }

            .User .User-content {
                width: 100%;
                font-size: 1rem;
                font-weight: bold;
                margin-bottom: .5rem;
            }

            .User .User-content > input {
                width: 100%;
                border: 0;
                font-size: 1.175rem;
                font-weight: bold;
                margin-bottom: .5rem;
                text-overflow: ellipsis;

            }

            .User .User-content > input:hover {
                cursor: pointer;
            }

            .User .User-date {
                font-size: 1rem;
                color: gray;
                pointer-events: none;
            }

            .User .user-button {
                display: flex;
                align-items: center;
            }

            .User .user-button input {
                height: 1rem;
                width: 1rem;
            }

            .User .user-button input:hover {
                cursor: pointer;
                border: outline;
            }

            .User .user-button button {
                border-radius: 5px;
                border: 1px solid #ddd;
                background-color: transparent;
                font-size: .85rem;
                color: #555;
                display: flex;
                justify-content: center;
                align-items:center;
                margin-right: .25rem;
                padding: .25rem .5rem;
            }

            .User .user-button button:hover {
                background-color: #ececec;
                cursor: pointer;
            }

            .User .user-button button:active {
                background-color: #e0e0e0;
            }

            @media screen and (max-width: 500px) {
                .User .User-content input {
                    font-size: .65rem;
                }
            }
        `}</style>
    </div>
  )
}

export default User;