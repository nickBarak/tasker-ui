import React, { useEffect, useState } from 'react';
import { editPassword } from '../ajax';
import { User as UserType } from '../types';
import User from './User';

function UserContainer({ data }: { data: UserType; }) {
    const [editing, setEditing] = useState<boolean>(false);
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) return setError('Passwords must match');
        editPassword(data.id, { username: data.username, password: newPassword })
            .then(() => {
                setError('');
                setSuccess('Password changed successfully');
            }).catch(() => {
                setSuccess('');
                setError('Error changing password');
            }).finally(() => {
                setNewPassword('');
                setConfirmNewPassword('');
            });
    }

    useEffect(() => {
        setNewPassword('');
        setConfirmNewPassword('');
        setError('');
        setSuccess('');
    }, [editing]);

    return (
        <div className="UserContainer">
            <User data={data} toggleEditing={() => setEditing(!editing)} />
            <div className="change-password">
                {editing &&
                    <form onSubmit={onSubmit}>
                        <input required type="text" placeholder="new password" value={newPassword} onChange={({ target: { value }}) => setNewPassword(value)} />
                        <input required type="text" placeholder="confirm new password" value={confirmNewPassword} onChange={({ target: {value }}) => setConfirmNewPassword(value)} />
                        <button>Submit</button>
                    </form>
                }
                <div className="change-password-message">
                    <span className="change-password-error">{error}</span>
                    <span className="change-password-success">{success}</span>
                </div>
            </div>

            <style>{`
                .UserContainer .change-password {
                    padding-bottom: 1rem;
                }

                .UserContainer .change-password form {
                    // padding-bottom: .2rem;
                }

                .UserContainer .change-password input {
                    margin-left: .5rem;
                    border-radius: 4px;
                    height: 1.3rem;
                    padding-left: .25rem;
                }

                .UserContainer .change-password button {
                    font-size: .8rem;
                    margin-left: .5rem;
                    display: inline;
                    background-color: #eee;
                    padding: .15rem .3rem;
                    border-radius: 5px;
                    text-decoration: none;
                    border: 1px solid #777;
                    color: black;
                }

                .UserContainer .change-password button:hover {
                    cursor: pointer;
                    background-color: #ddd;
                }

                .UserContainer .change-password button:active {
                    background-color: #ccc;
                }

                .UserContainer .change-password-error {
                    color: red;
                }

                .UserContainer .change-password-success {
                    color: green;
                }

                .UserContainer .change-password-message {
                    margin-left: .4rem;
                    margin-top: .25rem;
                }
            `}</style>
        </div>
    )
}

export default UserContainer;