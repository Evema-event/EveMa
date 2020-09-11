import React from 'react';
import { render, screen } from '@testing-library/react';

import EventState from '../../../../context/event/eventState';

import UpcomingEvents from './UpcomingEvents';

const renderWithContext = () => {
    return render(
        <EventState>
            <UpcomingEvents />
        </EventState>
    );
};

describe('Test cases for upcoming Events', () => {

    // Check upcoming event header
    test('Should return div with Upcoming Events', () => {
        renderWithContext();
        const divElement = screen.getByText((content, element) => {
            return content === 'Upcoming Events' && element.tagName.toLowerCase() === 'div';
        });
        expect(divElement).toBeInTheDocument();
    });

    // Check image have Demo alt text
    test('Should return img with Demo alt Text', () => {
        renderWithContext();
        const imgElement = screen.getByText((content, element) => {
            return element.tagName.toLowerCase() === 'img';
        });
        expect(imgElement).toBeInTheDocument();
        expect(imgElement.alt).toBe('Demo');
    });

});