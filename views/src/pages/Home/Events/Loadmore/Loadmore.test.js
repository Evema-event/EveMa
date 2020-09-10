import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Loadmore from './Loadmore';

describe('test cases for loadmore button', () => {
    //Checking for a tag in button
    test('should return a tag', () => {
        render(<Router><Loadmore link='/upcomingEvents' /></Router>);
        const aTag = screen.getByText((content, element) => {
            return element.tagName.toLowerCase() === 'a';
        });
        expect(aTag).toBeInTheDocument();
        let href = aTag.href.split('/');
        expect(href[href.length - 1]).toBe('upcomingEvents');
    });
});