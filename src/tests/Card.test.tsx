import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import Card from '../components/Card';
import { Task } from '../App';

const sampleData: Task = {
  id: 1,
  content: 'test',
  date: new Date(),
  isComplete: false
}

describe('DOM', () => {
  it('renders correctly', () => {
    const { container } = render(<Card fetchTasks={()=>{}} data={sampleData} />);
    const input: HTMLInputElement = screen.getByRole('textbox');
    const checkbox: HTMLInputElement = screen.getByRole('checkbox');
    const cardDate = container.querySelector('.card-date');
    
    expect(input).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
    expect(cardDate).toBeInTheDocument();
  });

  it('does not render "Delete" button with incomplete task', () => {
    render(<Card fetchTasks={()=>{}} data={sampleData} />);
    const deleteButton: HTMLElement | null = screen.queryByRole('button');
    expect(deleteButton).not.toBeTruthy();
  });

  it('renders "Delete" button with complete task', () => {
    render(<Card fetchTasks={()=>{}} data={{...sampleData, isComplete: true}} />);
    const deleteButton: HTMLElement | null = screen.queryByRole('button');
    expect(deleteButton).toBeTruthy();
  });
});

describe('Input Box', () => {
  it('updates input value on change event', () => {
    render(<Card fetchTasks={()=>{}} data={sampleData} />);
    const input: HTMLInputElement = screen.getByRole('textbox');

    act(() => { fireEvent.change(input, {target: {value: 'changed'}}); });
    expect(input.value).toBe('changed');
  });
});

describe('Checkbox', () => {
  it('updates checkbox value on click event', () => {
    render(<Card fetchTasks={()=>{}} data={sampleData} />);
    const checkbox: HTMLInputElement = screen.getByRole('checkbox');

    act(() => { fireEvent.click(checkbox); });
    expect(checkbox.checked).toBe(true);

    act(() => { fireEvent.click(checkbox); });
    expect(checkbox.checked).toBe(false);
  });
});
