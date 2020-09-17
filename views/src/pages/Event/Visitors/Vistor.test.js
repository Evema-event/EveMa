import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import Vistorsheader from './VisitorsHeader';
import VistorsBody from './VisitorsBody';

import VisitorState from '../../../context/visitor/visitorState';

let eventData = {
  index: '1',
  firstName: 'John',
  emailId: 'john@gmail.com',
  contactNumber: '1231231231',
};

const renderWithContext = () => {
  return render(
    <VisitorState>
      <Router>
        <table>
          <tbody>
            <VistorsBody visitor={eventData} />
          </tbody>
        </table>
      </Router>
    </VisitorState>
  );
};

describe('Checking Header', () => {
  //Checking the Number Head (#)
  test('should Number Head', () => {
    render(
      <table>
        <Vistorsheader />
      </table>
    );
    const numElement = screen.getByText((content, element) => {
      return content === '#' && element.tagName.toLowerCase() === 'th';
    });
    expect(numElement).toBeInTheDocument();
  });

  //Checking the Name
  test('should Number Head', () => {
    render(
      <table>
        <Vistorsheader />
      </table>
    );
    const nameElement = screen.getByText((content, element) => {
      return content === 'Name' && element.tagName.toLowerCase() === 'th';
    });
    expect(nameElement).toBeInTheDocument();
  });

  //Checking the Email
  test('should Email text', () => {
    render(
      <table>
        <Vistorsheader />
      </table>
    );
    const emailElement = screen.getByText((content, element) => {
      return content === 'E-mail' && element.tagName.toLowerCase() === 'th';
    });
    expect(emailElement).toBeInTheDocument();
  });

  //Checking the Contact Number
  test('should Number Head', () => {
    render(
      <table>
        <Vistorsheader />
      </table>
    );
    const contactElement = screen.getByText((content, element) => {
      return content === '#' && element.tagName.toLowerCase() === 'th';
    });
    expect(contactElement).toBeInTheDocument();
  });
});

describe('Checking Body', () => {
  //Checking the First Name

  test('should have First Name', () => {
    renderWithContext();
    const firstNameElement = screen.getByText((content, element) => {
      return (
        content === eventData.firstName &&
        element.tagName.toLowerCase() === 'td'
      );
    });
    expect(firstNameElement).toBeInTheDocument();
  });

  //Checking the Email Id
  test('should have Email Id', () => {
    renderWithContext();
    const emailElement = screen.getByText((content, element) => {
      return (
        content === eventData.emailId && element.tagName.toLowerCase() === 'td'
      );
    });
    expect(emailElement).toBeInTheDocument();
  });

  //Checking the Contact Number
  test('should have Contact Number', () => {
    renderWithContext();
    const contactElement = screen.getByText((content, element) => {
      return (
        content === eventData.contactNumber &&
        element.tagName.toLowerCase() === 'td'
      );
    });
    expect(contactElement).toBeInTheDocument();
  });
});
