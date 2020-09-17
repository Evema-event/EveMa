import React from 'react';
import { render, screen } from '@testing-library/react';

// Import Contexts

import EventState from '../../../context/event/eventState';
import UpcomingList from './UpcomingList';

const renderWithContext = () => {
  return render(
    <EventState>
      <UpcomingList />
    </EventState>
  );
};

let data = {
  title: 'Upcoming Events',
  center: 'No upcoming events yet!',
};

describe('Test cases for the Upcoming List', () => {
  //Check the title
  test('should have Title Element and Upcoming Events text', () => {
    renderWithContext();
    const titleElement = screen.getByText((content, element) => {
      return content === data.title && element.tagName.toLowerCase() === 'div';
    });
    expect(titleElement).toBeInTheDocument();
  });

  //Check the Center
  test('should have Center Element and No upcoming events yet! text', () => {
    renderWithContext();
    const centerElement = screen.getByText((content, element) => {
      return (
        content === data.center && element.tagName.toLowerCase() === 'center'
      );
    });
    expect(centerElement).toBeInTheDocument();
  });
});
