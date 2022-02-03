import React, { useState, useEffect } from 'react';

import CardHolder from './components/CardHolder';
import NewButton from './components/NewButton';

import axios from 'axios';

export const api = new URL('http://localhost:8081');

export interface CardType {
  id: number;
  content: string;
  date: Date;
  isComplete: boolean;
}

function App() {
  const [cardData, setCardData] = useState<CardType[]>([]);

  const fetchTasks = () => {
    axios.get(api + "task")
    .then(res => {
      if (res.statusText === "OK") {
        setCardData(res.data);
      } else alert("Error fetching tasks");
    })
    .catch(console.log);
  }

  useEffect(fetchTasks, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="title">Tasker</div>
        <div className="user"><span>Nick Barak</span></div>
      </header>
      <NewButton fetchTasks={fetchTasks} />
      <CardHolder fetchTasks={fetchTasks} cardData={cardData} />

      <style>{`
        .App {
          padding: 2vw 5vw;
        }

        .App .App-header {
          display: flex;
          justify-content: space-between;
          color: #555;
        }

        .App .App-header .title {
          font-size: 2rem;
        }

        .App .App-header .user {
          position: relative;
        }

        .App .App-header .user::before {
          content: "";
          position: absolute;
          height: 1px;
          width: 100px;
          bottom: 12px;
          right: -7px;
          background-color: #bbb;
        }

        .App .App-header .user::after {
          content: "";
          position: absolute;
          right: -7px;
          height: 90vh;
          width: 1px;
          background-color: #bbb;
        }
      `}</style>
    </div>
  );
}

export default App;
