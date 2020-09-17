import React from 'react';
import { render, screen, act } from '@testing-library/react';

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import url from '../../server';

import EventState from '../../context/event/eventState';
import StallState from '../../context/stall/stallState';
import ConferenceState from '../../context/conference/conferenceState';
import VisitorState from '../../context/visitor/visitorState';

import EventList from './EventList';

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

const server = setupServer(
  rest.get(url + 'event/upcomingEvents', (req, res, ctx) => {
    return res(ctx.json({ events: [eventData] }));
  }),
  rest.get(url + 'event/completedEvents', (req, res, ctx) => {
    return res(ctx.json({ events: [eventData] }));
  })
);

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

beforeAll(() => server.listen());

beforeEach(async () => {
  act(() => {
    render(
      <EventState>
        <StallState>
          <ConferenceState>
            <VisitorState>
              <EventList />
            </VisitorState>
          </ConferenceState>
        </StallState>
      </EventState>
    );
  });
  await act(() => sleep(500));
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

// Test cases for home page
describe('Test cases Events in the home page', () => {
  // Check title of the event is present
  test('Should render title of event two time', () => {
    const title = screen.getAllByText(eventData.name);
    expect(title.length).toBe(2);
    expect(title[0]).toBeInTheDocument();
    expect(title[1]).toBeInTheDocument();
  });

  // Check description of the event is present
  test('Should render description of event two time', () => {
    const description = screen.getAllByText(
      eventData.description.slice(0, 100)
    );
    expect(description.length).toBe(2);
    expect(description[0]).toBeInTheDocument();
    expect(description[1]).toBeInTheDocument();
  });

  // Check venue of the event is present
  test('Should render venue of event two time', () => {
    const venue = screen.getAllByText(eventData.venue);
    expect(venue.length).toBe(2);
    expect(venue[0]).toBeInTheDocument();
    expect(venue[1]).toBeInTheDocument();
  });

  // Check startTime of the event is present
  test('Should render startTime of event two time', () => {
    const startTime = screen.getAllByText(eventData.startTime);
    expect(startTime.length).toBe(2);
    expect(startTime[0]).toBeInTheDocument();
    expect(startTime[1]).toBeInTheDocument();
  });

  // Check startDate of the event is present
  test('Should render startDate of event two time', () => {
    const startDate = screen.getAllByText(
      new Date(eventData.startDate).toISOString().slice(0, 10)
    );
    expect(startDate.length).toBe(2);
    expect(startDate[0]).toBeInTheDocument();
    expect(startDate[1]).toBeInTheDocument();
  });
});
