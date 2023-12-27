import { act, renderHook } from '@testing-library/react';
import { useGlobal } from './global';

describe('Global store', () => {
  it('should toggle setup', async () => {
    const { result } = renderHook(() => useGlobal());
    const initialResult = result.current.isSetup;

    act(() => result.current.toggleSetup());

    expect(result.current.isSetup).not.toBe(initialResult);
  });
});
