import React from 'react';
import { render, screen } from '@testing-library/react';

import EventState from '../../../../context/event/eventState';

import CompletedEvents from './CompltedEvents';

const renderWithContext = () => {
  return render(
    <EventState>
      <CompletedEvents />
    </EventState>
  );
};

describe('Test cases for Completed Events', () => {
  // Check completed event header
  test('Should return div with Completed Events', () => {
    renderWithContext();
    const divElement = screen.getByText((content, element) => {
      return (
        content === 'Completed Events' &&
        element.tagName.toLowerCase() === 'div'
      );
    });
    expect(divElement).toBeInTheDocument();
  });
});
