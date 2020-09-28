import React from 'react';
import { render, screen } from '@testing-library/react';

// Import Contexts

import EventState from '../../../context/event/eventState';
import AuthState from '../../../context/auth/authState';
import UpcomingList from './UpcomingList';

const renderWithContext = () => {
  return render(
    <AuthState>
      <EventState>
        <UpcomingList />
      </EventState>
    </AuthState>
  );
};

let data = {
  title: 'Upcoming Events'
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
  test('should have Center Element', () => {
    renderWithContext();
    const centerElement = screen.getByText((content, element) => {
      return (
        element.tagName.toLowerCase() === 'center'
      );
    });
    expect(centerElement).toBeInTheDocument();
  });
});
