import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { api } from '../App';

function NewButton({ fetchTasks }: { fetchTasks: Function; }) {
  const [clicked, setClicked] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [submitText, setSubmitText] = useState<string>("Submit");

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
          axios.post(api + "todo", { content: text })
            .then(({statusText}) => {
                if (statusText === 'OK') {
                    fetchTasks();
                    setSubmitText("Done!");
                    setTimeout(() => setSubmitText("Submit"), 1250);
                    setText("");
                } else {
                    setSubmitText("Retry!");
                    setTimeout(() => setSubmitText("Submit"), 1500);
                };
            })
            .catch((e) => {
                console.log(e);
                setSubmitText("Retry!");
                setTimeout(() => setSubmitText("Submit"), 1500);
            });
      }
  }

  return (
    <div className="NewButton">
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="What to do, what to do?" value={text} onChange={({currentTarget: {value}}) => setText(value || "")} />
            <button>{submitText}</button>
        </form>
        <button type="submit" onClick={() => setClicked(!clicked)}>{clicked ? "Cancel" : "New"}</button>

        <style>{`
            .NewButton {
                display: flex;
                justify-content: right;
                margin-right: 4rem;
            }

            .NewButton form {
                transition: transform 750ms ease-in-out;
                transform: ${clicked ? "translateX(0)" : "translateX(-100vw)"};
                display: flex;
                align-items: center;
                margin-right: .9rem;
            }

            .NewButton input {
                width: 40vw;
                height: 1.75rem;
                padding: .2rem .55rem;
                border-radius: 5px;
                margin-right: 1rem;
                font-size: .95rem;
            }

            .NewButton button {
                border-radius: 5px;
                border: 1px solid #ddd;
                background-color: transparent;
                font-size: .95rem;
                color: #555;
                display: flex;
                justify-content: center;
                align-items:center;
                padding: .75rem 1.25rem;
                min-width: 5.75rem;
                margin: 1.5rem 0 1.15rem 0;
                transform: translateY(-.2rem);
            }

            .NewButton button:hover {
                background-color: #ececec;
                cursor: pointer;
            }

            .NewButton button:active {
                background-color: #e0e0e0;
            }

            @media screen and (max-width: 500px) {
                .NewButton {
                    flex-direction: column;
                }
            }
        `}</style>
    </div>
  );
}

export default NewButton;