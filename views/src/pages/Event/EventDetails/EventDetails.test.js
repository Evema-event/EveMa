import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import EventContext from '../../../context/event/eventContext';
import AuthContext from '../../../context/auth/authContext';

import EventDetails from './EventDetails';

let eventData = {
  registeredUsers: ['5f351eb6f0997f0017d9950e'],
  registeredStalls: [
    '5f5b245a9bf8ea0514021722',
    '5f5b24649bf8ea0514021724',
    '5f5b2ef538456b0017a315e3',
    '5f5b2f3038456b0017a315e5',
  ],
  registeredConferences: [
    '5f5b1be09bf8ea0514021711',
    '5f5b24909bf8ea0514021725',
    '5f5b2ffc38456b0017a315e6',
  ],
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
  __v: 65,
};

beforeEach(() => {
  act(() => {
    render(
      <Router>
        <AuthContext.Provider
          value={{
            registeredEvents: [
              '5f52b6e822995b0ea0c16098'
            ]
          }}
        >
          <EventContext.Provider
            value={{
              indivEvent: eventData,
              selectedEvent: eventData._id,
              isUpcoming: true,
            }}
          >
            <EventDetails />
          </EventContext.Provider>
        </AuthContext.Provider>
      </Router>
    );
  });
});

//Test Cases for the Event Details
describe('Test cases for the Event Details', () => {
  // Check the title for the Name
  test('should have the Title Name', () => {
    const title = screen.getByText(eventData.name);
    expect(title).toBeInTheDocument();
  });

  // Check the description
  test('should have the Description ', () => {
    const description = screen.getByText(eventData.description);
    expect(description).toBeInTheDocument();
  });

  // Check the Start time
  test('should have the Start Time', () => {
    const startTime = screen.getByText((content) => {
      const index = content.indexOf(eventData.startTime.toString());
      return index !== -1;
    });
    expect(startTime).toBeInTheDocument();
  });

  // Check the Start Date
  test('should have the Start Date', () => {
    const startElement = screen.getByText((content) => {
      const index = content.indexOf(
        new Date(eventData.startDate).toISOString().slice(0, 10)
      );
      return index !== -1;
    });
    expect(startElement).toBeInTheDocument();
  });

  // Check the End Date
  test('should have the End Date', () => {
    const endDateElement = screen.getByText((content) => {
      const index = content.indexOf(
        new Date(eventData.endDate).toISOString().slice(0, 10)
      );
      return index !== -1;
    });
    expect(endDateElement).toBeInTheDocument();
  });

  // Check the Venue
  test('should have the Venue', () => {
    const venueElement = screen.getByText((content) => {
      const index = content.indexOf(eventData.venue);
      return index !== -1;
    });
    expect(venueElement).toBeInTheDocument();
  });

  // Check the Contact Number
  test('should have the Contact Number', () => {
    const numElement = screen.getByText((content) => {
      const index = content.indexOf(eventData.contactNumber);
      return index !== -1;
    });
    expect(numElement).toBeInTheDocument();
  });

  // Check the Contact Email
  test('should have the Contact Email', () => {
    const emailElement = screen.getByText((content) => {
      const index = content.indexOf(eventData.contactEmail);
      return index !== -1;
    });
    expect(emailElement).toBeInTheDocument();
  });
});
