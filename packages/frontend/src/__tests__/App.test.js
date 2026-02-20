import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';

// Create a test query client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

// Mock fetch for tests
global.fetch = jest.fn();

const mockTodos = [
  { id: 1, title: 'Test todo 1', completed: false },
  { id: 2, title: 'Test todo 2', completed: true },
  { id: 3, title: 'Test todo 3', completed: false },
];

const renderApp = () => {
  const testQueryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );
};

beforeEach(() => {
  global.fetch.mockImplementation((url, options) => {
    if (!options || options.method === 'GET') {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTodos),
      });
    }
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    });
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders TODO App heading', async () => {
  renderApp();
  const headingElement = await screen.findByText(/TODO App/i);
  expect(headingElement).toBeInTheDocument();
});

// Test: Stats calculation
describe('Stats calculation', () => {
  test('displays correct count of incomplete todos', async () => {
    renderApp();
    await waitFor(() => {
      expect(screen.getByText('2 items left')).toBeInTheDocument();
    });
  });

  test('displays correct count of completed todos', async () => {
    renderApp();
    await waitFor(() => {
      expect(screen.getByText('1 completed')).toBeInTheDocument();
    });
  });
});

// Test: Empty state message
describe('Empty state', () => {
  test('displays empty state message when no todos', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    );

    renderApp();
    await waitFor(() => {
      expect(screen.getByText(/no todos yet/i)).toBeInTheDocument();
    });
  });
});

// Test: Delete functionality
describe('Delete functionality', () => {
  test('calls DELETE API when delete button clicked', async () => {
    const user = userEvent.setup();
    renderApp();

    // Wait for todos to load
    await waitFor(() => {
      expect(screen.getByText('Test todo 1')).toBeInTheDocument();
    });

    // Click delete button (first one)
    const deleteButtons = screen.getAllByLabelText(/delete/i);
    await user.click(deleteButtons[0]);

    // Verify DELETE request was made
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/todos/1'),
        expect.objectContaining({ method: 'DELETE' })
      );
    });
  });
});

// Test: Error handling
describe('Error handling', () => {
  test('displays error message when fetch fails', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('Network error'))
    );

    renderApp();
    
    await waitFor(() => {
      expect(screen.getByText(/error loading todos/i)).toBeInTheDocument();
    });
  });

  test('displays error message when API returns error response', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ error: 'Server error' }),
      })
    );

    renderApp();
    
    await waitFor(() => {
      expect(screen.getByText(/error loading todos/i)).toBeInTheDocument();
    });
  });
});
