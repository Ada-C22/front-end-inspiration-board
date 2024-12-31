import { render, screen } from '@testing-library/react';
import ActiveBoard from '../src/components/ActiveBoard';

test('renders ActiveBoard with title and owner', () => {
    render(<ActiveBoard ActiveBoard={{ id: 1, title: "Test Board", owner: "John Doe", cards: [] }} />);
    expect(screen.getByText(/Board Title | Test Board/i)).toBeInTheDocument();
    expect(screen.getByText(/Board Owner | John Doe/i)).toBeInTheDocument();
});
