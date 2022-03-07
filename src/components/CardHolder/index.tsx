import React from "react";
import "./CardHolder.css";
import Card from "../Card";
import { Store } from "../../resources/types";
import { useSelector } from "react-redux";

function CardHolder() {
  const tasks = useSelector(({ tasks }: Store) => tasks);

  return (
    <div className="CardHolder">
      {!tasks.length && (
        <Card
          data={{
            id: -1,
            content: "Nothing!",
            date: new Date(),
            isComplete: false,
            author: "Unknown",
          }}
        />
      )}
      {tasks
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map((data) => (
          <Card key={data.id} data={data} />
        ))}
    </div>
  );
}

export default CardHolder;
