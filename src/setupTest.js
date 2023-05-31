import 'core-js/stable';
import 'regenerator-runtime/runtime';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: jest.fn((val) => ({ current: val, useRef: true })),
  useCallback: jest.fn((cb, prereqs) => ({ useCallback: { cb, prereqs } })),
  useEffect: jest.fn((cb, prereqs) => ({ useEffect: { cb, prereqs } })),
  useMemo: jest.fn((cb, prereqs) => cb(prereqs)),
  useContext: jest.fn(context => context),
}));
