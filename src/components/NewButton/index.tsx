import React, { useEffect, useState } from "react";
import "./NewButton.css";
import { useDispatch } from "react-redux";
import { getTasks, createTask } from "../../resources/ajax";
import { updateTasks } from "../../store/actions";

function NewButton() {
  const [clicked, setClicked] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [submitText, setSubmitText] = useState<string>("Submit");
  const dispatch = useDispatch();

  useEffect(() => {
    !clicked && setTimeout(() => setText(""), 750);
  }, [clicked]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) {
      setSubmitText("Empty!");
      setTimeout(() => setSubmitText("Submit"), 1250);
    } else {
      setSubmitText("Submitting...");
      createTask(text)
        .then((_) => {
          getTasks().then((tasks) => dispatch(updateTasks(tasks)));
          setSubmitText("Done!");
          setTimeout(() => setSubmitText("Submit"), 1250);
          setText("");
        })
        .catch((_) => {
          setSubmitText("Retry!");
          setTimeout(() => setSubmitText("Submit"), 1500);
        });
    }
  };

  return (
    <div className="NewButton">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What to do, what to do?"
          value={text}
          onChange={({ currentTarget: { value } }) => setText(value || "")}
        />
        <button>{submitText}</button>
      </form>
      <button type="submit" onClick={() => setClicked(!clicked)}>
        {clicked ? "Cancel" : "New"}
      </button>

      <style>{`
            .NewButton form {
                transform: ${clicked ? "translateX(0)" : "translateX(-100vw)"};
            }
        `}</style>
    </div>
  );
}

export default NewButton;
