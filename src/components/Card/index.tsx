import React, { useState, useEffect, useRef } from "react";
import "./Card.css";
import { Task } from "../../resources/types";
import { updateTask, deleteTask, getTasks } from "../../resources/ajax";
import { useDispatch } from "react-redux";
import { updateTasks } from "../../store/actions";

function Card({
  data,
  data: { id, content, date, isComplete },
}: {
  data: Task;
}) {
  const mounted = useRef<boolean>(false);
  const [deleted, setDeleted] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(isComplete);
  const [text, setText] = useState<string>(content);
  const dispatch = useDispatch();

  const updateCardContent = ({
    key,
    currentTarget,
  }: React.KeyboardEvent<HTMLInputElement>) => {
    if (id < 0) return;
    if (key === "Enter") {
      currentTarget.blur();
      updateTask({ ...data, content: text })
        .then((_) => getTasks())
        .then((tasks) => dispatch(updateTasks(tasks)))
        .catch(console.log);
    }
  };

  const deleteCard = () => {
    if (id < 0) return;
    deleteTask(id)
      .then(getTasks)
      .then((tasks) => dispatch(updateTasks(tasks)))
      .then(() => setDeleted(true))
      .catch(console.log);
  };

  useEffect(() => {
    if (id < 0) return;
    if (mounted.current) {
      updateTask({ ...data, isComplete: !isComplete })
        .then((_) => getTasks())
        .then((tasks) => dispatch(updateTasks(tasks)))
        .catch(console.log);
    } else mounted.current = true;
  }, [checked]);

  return deleted ? (
    <></>
  ) : (
    <div className="Card">
      <div>
        <div className="card-content">
          <input
            type="text"
            value={text}
            placeholder="Press enter to update"
            onChange={({ currentTarget: { value } }) => setText(value)}
            onKeyDown={updateCardContent}
          />
        </div>
        <div className="card-date">
          {new Date(date).toISOString().slice(0, 10)}
        </div>
      </div>
      <div className="checkbox">
        {checked && <button onClick={deleteCard}>Delete</button>}
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
      </div>
    </div>
  );
}

export default Card;
