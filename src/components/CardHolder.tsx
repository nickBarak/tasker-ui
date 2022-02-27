import React from 'react';
import Card from './Card';
import { Store } from '../types';
import { useSelector } from 'react-redux';

function CardHolder() {
  const tasks = useSelector(({ tasks }: Store) => tasks);

  return (
    <div className="CardHolder">
        {!tasks.length && <Card data={{id: -1, content: "Nothing!", date: new Date(), isComplete: false, author: 'Unknown' }} />}
        {tasks.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(data => <Card key={data.id} data={data} />)}
    
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