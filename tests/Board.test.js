import { render, screen, fireEvent } from '@testing-library/react';
import Board from '../src/components/Board';

test('renders Board with correct title and owner', () => {
    render(<Board id={1} title="Test Board" owner="Ada" handleChangeActiveBoard={jest.fn()} activeBoardId={1} />);
    expect(screen.getByText(/Test Board/i)).toBeInTheDocument();
    expect(screen.getByText(/Ada/i)).toBeInTheDocument();
});  

test('calls handleChangeActiveBoard on click', () => {
    const mockChange = jest.fn();
    render(<Board id={1} title="Test Board" owner="Ada" handleChangeActiveBoard={mockChange} activeBoardId={2} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockChange).toHaveBeenCalledWith(1);
});  