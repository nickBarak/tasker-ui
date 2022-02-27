import React, { useState, useEffect, useRef } from 'react';
import { Task } from '../types';
import { updateTask, deleteTask, getTasks } from '../ajax';
import { useDispatch } from 'react-redux';
import { updateTasks } from '../store/actions';

function Card({ data, data: { id, content, date, isComplete } }: { data: Task; }) {
    const mounted = useRef<boolean>(false);
    const [deleted, setDeleted] = useState<boolean>(false);
    const [checked, setChecked] = useState<boolean>(isComplete);
    const [text, setText] = useState<string>(content);
    const dispatch = useDispatch();

    const updateCardContent = ({ key, currentTarget }: React.KeyboardEvent<HTMLInputElement>) => {
        if (id < 0) return;
        if (key === "Enter") {
            currentTarget.blur();
            updateTask({ ...data, content: text })
                .then(_ => getTasks())
                .then(tasks => dispatch( updateTasks(tasks) ))
                .catch(console.log);
        }
    }

    const deleteCard = () => {
        if (id < 0) return;
        deleteTask(id)
            .then(getTasks)
            .then(tasks => dispatch( updateTasks(tasks) ))
            .then(() => setDeleted(true))
            .catch(console.log);
    }

    useEffect(() => {
        if (id < 0) return;
        if (mounted.current) {
            updateTask({ ...data, isComplete: !isComplete })
                .then(_ => getTasks())
                .then(tasks => dispatch( updateTasks(tasks) ))
                .catch(console.log);
        } else mounted.current = true;
    }, [checked]);

  return deleted ? <></> : (
    <div className="Card">
        <div>
            <div className="card-content">
                <input
                    type="text"
                    value={text}
                    placeholder="Press enter to update"
                    onChange={({currentTarget: {value}}) => setText(value)}
                    onKeyDown={updateCardContent} />
            </div>
            <div className="card-date">{new Date(date).toISOString().slice(0, 10)}</div>
        </div>
        <div className="checkbox">
            {checked && <button onClick={deleteCard}>Delete</button>}
            <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
        </div>


        <style>{`
            .Card {
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

            .Card:hover {
                transform: translateY(-.13rem);
            }

            .Card > div:first-of-type {
                width: 90%;
            }

            .Card .card-content {
                width: 100%;
                font-size: 1rem;
                font-weight: bold;
                margin-bottom: .5rem;
            }

            .Card .card-content > input {
                width: 100%;
                border: 0;
                font-size: 1.175rem;
                font-weight: bold;
                margin-bottom: .5rem;
                text-overflow: ellipsis;

            }

            .Card .card-content > input:hover {
                cursor: pointer;
            }

            .Card .card-date {
                font-size: 1rem;
                color: gray;
                pointer-events: none;
            }

            .Card .checkbox {
                display: flex;
                align-items: center;
            }

            .Card .checkbox input {
                height: 1rem;
                width: 1rem;
            }

            .Card .checkbox input:hover {
                cursor: pointer;
                border: outline;
            }

            .Card .checkbox button {
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

            .Card .checkbox button:hover {
                background-color: #ececec;
                cursor: pointer;
            }

            .Card .checkbox button:active {
                background-color: #e0e0e0;
            }

            @media screen and (max-width: 500px) {
                .Card .card-content input {
                    font-size: .65rem;
                }
            }
        `}</style>
    </div>
  );
}

export default Card;