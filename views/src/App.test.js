import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import sum from './sum';
import { render } from '@testing-library/react';

test('adds 1 + 2 to equal 3', () => {
  const { getByTestId } = render(sum(1, 2));
  expect(getByTestId('add')).toHave(3);
});
