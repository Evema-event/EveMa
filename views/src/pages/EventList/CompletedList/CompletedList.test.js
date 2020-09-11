import React from 'react';
import { render, screen } from '@testing-library/react';

// Import Contexts

import EventState from '../../../context/event/eventState';
import CompletedList from './CompletedList';

const renderWithContext = () => {
  return render(
    <EventState>
      <CompletedList />
    </EventState>
  );
};

let data = {
  title: 'Completed Events',
  center: 'No completed events yet!',
};

describe('Test cases for the Completed List', () => {
  //Check the title
  test('should have Title Element and Completed Events text', () => {
    renderWithContext();
    const titleElement = screen.getByText((content, element) => {
      return content === data.title && element.tagName.toLowerCase() === 'div';
    });
    expect(titleElement).toBeInTheDocument();
  });

  //Check the Center
  test('should have Center Element and No completed events yet! text', () => {
    renderWithContext();
    const centerElement = screen.getByText((content, element) => {
      return (
        content === data.center && element.tagName.toLowerCase() === 'center'
      );
    });
    expect(centerElement).toBeInTheDocument();
  });
});
