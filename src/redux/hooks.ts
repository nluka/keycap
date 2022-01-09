import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch(); // https://blog.logrocket.com/using-typescript-with-redux-toolkit/
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
