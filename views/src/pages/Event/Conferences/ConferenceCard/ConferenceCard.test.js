import React from 'react';
import { render, screen } from '@testing-library/react';

// Import Context
import ConferenceState from '../../../../context/conference/conferenceState';

import ConferenceCard from './ConferenceCard';

let eventData = {
  _id: '5f5b16187b34241c14d3f595',
  title: 'DemoDay',
  theme: 'WEB Dev',
  description: 'asdasdasdasdasdasdasdasdasdasddadasdasdasdsa',
  startTime: '9.30',
  endTime: '5.30',
  date: '2020-10-03T00:00:00.000Z',
  seatLimit: 100,
  userId: {
    role: ['Exhibitor'],
    _id: '5f3d200df221092d006e71a3',
    userName: 'monkmonk',
    emailId: 'monk@monk.com',
    password: '$2a$12$0oZsqJR88PM.ATXbv2oatuMHiL6Gn0vs5H/GnW2wc6cvjUc9AV7Rq',
    __v: 0,
  },
  eventId: '5f52b6e822995b0ea0c16098',
  __v: 0,
  user: {
    registeredEvents: [],
    areaOfInterest: ['Iot', ' Ml', ' Ai'],
    _id: '5f3d200df221092d006e71a4',
    userId: '5f3d200df221092d006e71a3',
    firstName: 'monkmonk',
    lastName: 'monkmonk',
    gender: 'Male',
    dateOfBirth: '2009-05-19T00:00:00.000Z',
    country: 'India',
    state: 'TamilNadu',
    cityName: 'Salem',
    zipCode: '636112',
    designation: 'Innovation ET',
    companyName: 'Forge',
    companyAddress: 'abcdefghjklmnopqrest asdasdasdasd',
    contactNumber: '8756432891',
    __v: 10,
    registeredConferences: [
      {
        _id: '5f5b16187b34241c14d3f596',
        eventId: '5f52b6e822995b0ea0c16098',
        conferenceId: '5f5b16187b34241c14d3f595',
      },
    ],
    registeredStalls: [],
  },
};

const renderWithContext = () => {
  return render(
    <ConferenceState>
      <ConferenceCard conference={eventData} />
    </ConferenceState>
  );
};

describe('Test cases for the Completed card', () => {
  //   Check the title
  test('should have the Title Name', () => {
    renderWithContext();
    const titleElement = screen.getByText((content, element) => {
      return (
        content === eventData.title && element.tagName.toLowerCase() === 'div'
      );
    });
    expect(titleElement).toBeInTheDocument();
  });

  // Check the theme
  test('should have the theme', () => {
    renderWithContext();
    const themeElement = screen.getByText((content, element) => {
      return (
        content === eventData.theme && element.tagName.toLowerCase() === 'h6'
      );
    });
    expect(themeElement).toBeInTheDocument();
  });

  //Check the Company Name
  test('should have the Company Name', () => {
    renderWithContext();
    const companyElement = screen.getByText((content, element) => {
      return (
        content === eventData.user.companyName &&
        element.tagName.toLowerCase() === 'h6'
      );
    });
    expect(companyElement).toBeInTheDocument();
  });

  //Check the Email Id
  test('should have the Email Id', () => {
    renderWithContext();
    const emailElement = screen.getByText((content, element) => {
      return (
        content === eventData.userId.emailId &&
        element.tagName.toLowerCase() === 'h6'
      );
    });
    expect(emailElement).toBeInTheDocument();
  });
});
