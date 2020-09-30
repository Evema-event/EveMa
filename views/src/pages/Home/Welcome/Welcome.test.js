// Importing testing functions from core packages
import React from 'react';
import { render, screen } from '@testing-library/react';

// Importing file to be tested
import Welcome from './Welcome';

// Test cases for the imported file
describe('Test case for Welcome screen', () => {

    // Check it have the h1 element with correct text
    test('Welcome to EveMa content in h1 element', () => {
        render(<Welcome />);
        const h1Element = screen.getByText((content, element) => {
            return content === 'Welcome to EveMa' && element.tagName.toLowerCase() === 'h1';
        });
        expect(h1Element).toBeInTheDocument();
    });

    // Check it have an image
    test('Checking image is present', () => {
        render(<Welcome />);
        const imgElement = screen.getByText((content, element) => {
            return element.tagName.toLowerCase() === 'img';
        });
        expect(imgElement).toBeInTheDocument();
    });

    // Check it have an image with perticular alt tag
    test('Checking image by alt', () => {
        render(<Welcome />);
        const imgElement = screen.getByAltText('Demo');
        expect(imgElement).toBeInTheDocument();
    });
});
