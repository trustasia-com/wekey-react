import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TestComp } from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TestComp />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
