import { render } from '@testing-library/react';

import AllowanceList from './AllowanceList';

// normally mocked for unit tests but required for rendering/snapshots
// jest.unmock('react');

describe('AllowanceList', () => {
  it('Test that the AllowanceList matches snapshot', () => {
    expect(render(<AllowanceList allowances={[]} />)).toMatchSnapshot();
  });
});
