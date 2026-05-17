import { render, screen } from '@testing-library/react';
import App from './App';

// Mock browser APIs not available in jsdom
beforeAll(() => {
  // ThemeContext reads window.matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });

  // framer-motion whileInView uses IntersectionObserver
  global.IntersectionObserver = class {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  };

  // framer-motion uses ResizeObserver
  global.ResizeObserver = class {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

test('renders portfolio hero section', () => {
  render(<App />);
  // Hero name is split across nodes (IBRAHIM + <br/> + ALI span)
  expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  expect(screen.getByText(/full-stack engineer/i)).toBeInTheDocument();
});

test('renders navigation links', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: /about/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /projects/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /contact/i })).toBeInTheDocument();
});
