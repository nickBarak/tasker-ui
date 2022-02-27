import React, { ReactComponentElement, ReactElement } from 'react';
import { render, screen, within } from '@testing-library/react';
import CardHolder from '../components/CardHolder';
import { Task } from '../types';

const sampleData: Task[] = [
  {
    id: 1,
    content: 'task 1',
    date: new Date(),
    isComplete: false,
    author: 'someone'
  },
  {
    id: 2,
    content: 'task 2',
    date: new Date(),
    isComplete: true,
    author: 'someone'
  }
]

describe('DOM', () => {
  it('renders default card with empty data', () => {
    const { container } = render(<CardHolder />);
    const cards = container.querySelectorAll('.Card');
    expect(cards.length).toBe(1);
    const cardContent: HTMLInputElement = within(cards.item(0) as HTMLElement).getByRole('textbox');

    expect(cardContent.value).toBe('Nothing!');
  });

  it('renders a card for each item in data', () => {
    const { container } = render(<CardHolder />);
    const cards = container.querySelectorAll('.Card');
    expect(cards.length).toBe(sampleData.length);
    const tasks: {content:string; isComplete:boolean;}[] = [];

    for (let i=0; i<cards.length; i++) {
      tasks.push({
        content: (within(cards.item(i) as HTMLElement).getByRole('textbox') as HTMLInputElement).value,
        isComplete: (within(cards.item(i) as HTMLElement).getByRole('checkbox') as HTMLInputElement).checked
      });
    }

    const filteredTasks = tasks.filter(task =>
      sampleData.find(sample => sample.content == task.content && sample.isComplete == task.isComplete));
    expect(filteredTasks.length).toEqual(sampleData.length);
  });
});
