import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUsers, logout } from '../ajax';
import { routes } from '../resources';
import { User as UserType } from '../types';
import UserContainer from './UserContainer';

function Admin() {
    const [users, setUsers] = useState<UserType[]>([]);
    const navigate = useNavigate();

    const logOut = () => {
        logout();
        navigate(routes.LOG_IN);
        window.location.reload();
    }

    useEffect(() => {
        getUsers().then(setUsers).catch(console.log)
    }, []);

    return (
        <div className="Admin">
            <div className="heading">Manage Users</div>
            <div className="buttons">
                <button onClick={logOut}>Log out</button>
                <Link to={routes.HOME}><button>See Tasks</button></Link>
            </div>

            {users
                .sort((a, b) => [a.username, b.username].sort()[0] === a.username ? -1 : 1)
                .map(data => <UserContainer key={data.id} data={data} />)}
    
            <style>{`
                .Admin {
                    border-radius: 5px;
                    border: outline;
                    box-shadow: 1px 1px .6rem gray;
                    padding: 2rem;
                    padding-bottom: 1rem;
                    outline: 1px solid lightgray;
                    margin: 3rem 4rem;
                }

                .Admin .heading {
                    font-weight: bold;
                    font-size: 2rem;
                }

                .Admin a {
                    text-decoration: none;
                }

                .Admin .buttons {
                    margin-bottom: 2rem;
                    margin-top: .35rem;
                }

                .Admin .buttons button {
                    font-size: .8rem;
                    margin-top: .2rem;
                    margin-right: .4rem;
                    display: inline;
                    background-color: #eee;
                    padding: .15rem .3rem;
                    border-radius: 5px;
                    text-decoration: none;
                    border: 1px solid #777;
                    color: black;
                }

                .Admin .buttons button:hover {
                    cursor: pointer;
                    background-color: #ddd;
                }

                .Admin .buttons button:active {
                    background-color: #ccc;
                }
            `}</style>

        </div>
    )
}

export default Admin;