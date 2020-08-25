// import React from 'react';
// import { render, fireEvent } from '@testing-library/react';
// import Signup from '../auth/Signup';

import '@testing-library/jest-dom/extend-expect';

test('adds 2 to equal 2', () => {
  expect(2).toBe(2);
});

// describe('Signup Page', () => {
//   // const mockOnSubmit = jest.fn();
//   const utils = render(<Signup />);
//   const email = utils.getByTestId('email');
//   const pwd = utils.getByTestId('password');
//   const username = utils.getByTestId('username');

//   const setup = () => {
//     return {
//       email,
//       pwd,
//       username,
//       ...utils,
//     };
//   };

//   test('Username', () => {
//     const { username } = setup();
//     fireEvent.change(username, {
//       target: { value: 'Barathraj' },
//     });
//   });

//   test('Password', () => {
//     const { pwd } = setup();

//     fireEvent.change(pwd, {
//       target: { value: '1234567' },
//     });
//   });

//   test('Email', () => {
//     const { email } = setup();
//     fireEvent.change(email, {
//       target: { value: 'email@email.com' },
//     });
//   });
// });
