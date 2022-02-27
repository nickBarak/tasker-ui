import React from 'react';

import NewButton from './NewButton';
import CardHolder from './CardHolder';
import { useDispatch, useSelector } from 'react-redux';
import { Store, User } from '../types';
import { logout } from '../ajax';
import { apiRoutes, routes } from '../resources';
import { useNavigate } from 'react-router-dom';
import { updateTasks, updateUser } from '../store/actions';
import { Link } from 'react-router-dom';

function Home() {
    const user = useSelector<Store, User | null>(({ user }) => user);

    const logOut = () => {
        logout();
        window.location.reload();
    }

    return (
        <div className="Home">
            <header className="App-header">
                <div className="title">Tasker</div>
                <div className="user"><span>{user?.username}</span></div>
            </header>
            <div className="buttons">
                <button onClick={logOut}>Log out</button>
                {user?.role === "ADMIN" && <Link to={routes.ADMIN}><button className="manage-users">Manage Users</button></Link>}
            </div>
            <NewButton />
            <CardHolder />

            <style>{`
                .Home {
                    padding: 2vw 5vw;
                }

                .Home .App-header {
                    display: flex;
                    justify-content: space-between;
                    color: #555;
                    margin-bottom: .1rem;
                }

                .Home .App-header .title {
                    font-size: 2rem;
                }

                .Home .App-header .user {
                    position: relative;
                }

                .Home .App-header .user::before {
                    content: "";
                    position: absolute;
                    height: 1px;
                    width: 100px;
                    bottom: 12px;
                    right: -7px;
                    background-color: #bbb;
                }

                .Home .App-header .user::after {
                    content: "";
                    position: absolute;
                    right: -7px;
                    height: 90vh;
                    width: 1px;
                    background-color: #bbb;
                }

                .Home a {
                    text-decoration: none;
                }

                .Home .buttons button {
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

                .Home .buttons button:hover {
                    cursor: pointer;
                    background-color: #ddd;
                }

                .Home .buttons button:active {
                    background-color: #ccc;
                }
            `}</style>
        </div>
    )
}

export default Home;