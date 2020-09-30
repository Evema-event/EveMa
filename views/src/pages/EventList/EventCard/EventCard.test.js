import React from 'react';
import { render, screen } from '@testing-library/react';

// Import Contexts

import EventState from '../../../context/event/eventState';
import StallState from '../../../context/stall/stallState';
import ConferenceState from '../../../context/conference/conferenceState';
import VisitorState from '../../../context/visitor/visitorState';

// Import the Event Card

import EventCard from './EventCard';

let eventData = {
  registeredUsers: ['5f52b78e22995b0ea0c16099', '5f351eb6f0997f0017d9950e'],
  registeredStalls: ['5f5b062fac8d2526a5f0615a'],
  registeredConferences: ['5f5a0ab29995d8415058f9eb'],
  _id: '5f52b6e822995b0ea0c16098',
  name: 'startup world',
  description: 'this event is about the startup world in our country',
  contactNumber: 9876543210,
  contactEmail: 'poovarasan.17it@kct.ac.in',
  price: 123,
  startDate: '2020-09-11T00:00:00.000Z',
  endDate: '2020-09-12T00:00:00.000Z',
  startTime: '8.00',
  endTime: '9',
  venue: 'coimbatore',
  registrationLastdate: '2020-09-05T00:00:00.000Z',
  __v: 20,
};

const renderWithContext = () => {
  return render(
    <EventState>
      <StallState>
        <VisitorState>
          <ConferenceState>
            <EventCard event={eventData} />
          </ConferenceState>
        </VisitorState>
      </StallState>
    </EventState>
  );
};

describe('Test cases for the event card', () => {
  //   Check the title
  test('should have the Title Name', () => {
    renderWithContext();
    const titleElement = screen.getByText((content, element) => {
      return (
        content === eventData.name && element.tagName.toLowerCase() === 'div'
      );
    });
    expect(titleElement).toBeInTheDocument();
  });

  // Check the Description
  test('should have the Description', () => {
    renderWithContext();
    const descriptionElement = screen.getByText((content, element) => {
      return (
        content === eventData.description &&
        element.tagName.toLowerCase() === 'p'
      );
    });
    expect(descriptionElement).toBeInTheDocument();
  });

  //Check the Start Date
  test('should have the Start Date', () => {
    renderWithContext();
    const startDateElement = screen.getByText((content, element) => {
      return (
        content === new Date(eventData.startDate).toISOString().slice(0, 10) &&
        element.tagName.toLowerCase() === 'span'
      );
    });
    expect(startDateElement).toBeInTheDocument();
  });

  //Check the Start Time
  test('should have the Start Time', () => {
    renderWithContext();
    const endDateElement = screen.getByText((content, element) => {
      return (
        content === new Date(eventData.startDate).toISOString().slice(0, 10) &&
        element.tagName.toLowerCase() === 'span'
      );
    });
    expect(endDateElement).toBeInTheDocument();
  });
});
