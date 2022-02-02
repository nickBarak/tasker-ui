import React from 'react';
import Card from './Card';
import { CardType } from '../App';

function CardHolder({ cardData, fetchTasks }: { cardData: CardType[]; fetchTasks: Function; }) {
  return (
    <div className="CardHolder">
        {!cardData.length && <Card fetchTasks={fetchTasks} data={{id: -1, content: "Nothing!", date: new Date(), isComplete: false }} />}
        {cardData.map(data => <Card key={data.id} fetchTasks={fetchTasks} data={data} />)}
    
        <style>{`
            .CardHolder {
                border-radius: 5px;
                border: outline;
                box-shadow: 1px 1px .6rem gray;
                padding: 2rem;
                padding-bottom: 1rem;
                outline: 1px solid lightgray;
                margin: 0 4rem;
            }
        `}</style>
    </div>
  );
}

export default CardHolder;