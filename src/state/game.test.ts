import { act, renderHook } from '@testing-library/react';
import { Card, availableCards, useGame } from './game';

describe('Game store', () => {
  it('should set difficulty', async () => {
    const { result } = renderHook(() => useGame());

    act(() => result.current.setDifficulty('easy'));
    expect(result.current.difficulty).toEqual('easy');
    act(() => result.current.setDifficulty('medium'));
    expect(result.current.difficulty).toEqual('medium');
  });

  describe('layout', () => {
    it('should generate every card a pair', async () => {
      const { result } = renderHook(() => useGame());

      expect(result.current.layout).toEqual([]);
      act(() => result.current.generateLayout());

      const cardContentOccurrences = result.current.layout.reduce(
        (acc, cur) => {
          acc[cur.content] = ++acc[cur.content] || 1;
          return acc;
        },
        {} as Record<(typeof availableCards)[number], number>,
      );

      expect(
        Object.values(cardContentOccurrences).every((el) => el === 2),
      ).toBe(true);
    });

    it('should have initially all cards unmatched', async () => {
      const { result } = renderHook(() => useGame());

      act(() => result.current.generateLayout());

      expect(result.current.layout.every((card) => !card.isMatched)).toBe(true);
    });
  });

  describe('select cards', () => {
    it('should select first card', async () => {
      const { result } = renderHook(() => useGame());

      act(() => result.current.selectCard(0));
      expect(result.current.selectedCardIndices).toEqual([0]);
    });

    it('should clear card selection after selecting second card', async () => {
      const { result } = renderHook(() => useGame());
      act(() => result.current.generateLayout());

      const matchingCardIndex = getCardIndex(result.current.layout);

      act(() => result.current.selectCard(0));
      act(() => result.current.selectCard(matchingCardIndex));
      expect(result.current.selectedCardIndices).toEqual([]);
    });
  });

  describe('match cards', () => {
    it('should record matched cards', async () => {
      const { result } = renderHook(() => useGame());
      act(() => result.current.generateLayout());

      const matchingCardIndex = getCardIndex(result.current.layout);

      expect(matchingCardIndex).not.toBe(0);
      expect(result.current.layout[0].content).toEqual(
        result.current.layout[matchingCardIndex].content,
      );

      act(() => result.current.matchCards(0, matchingCardIndex));

      expect(
        Object.entries(result.current.layout).every(([index, card]) => {
          if ([0, matchingCardIndex].includes(+index)) {
            return !!card.isMatched;
          }
          return !card.isMatched;
        }),
      ).toBe(true);
    });

    it('should not record not matching cards', async () => {
      const { result } = renderHook(() => useGame());
      act(() => result.current.generateLayout());

      const notMatchingCardIndex = getCardIndex(result.current.layout, false);

      expect(notMatchingCardIndex).not.toBe(0);
      expect(result.current.layout[0].content).not.toEqual(
        result.current.layout[notMatchingCardIndex].content,
      );

      act(() => result.current.matchCards(0, notMatchingCardIndex));

      expect(result.current.layout.every((card) => !card.isMatched)).toBe(true);
    });
  });

  describe('isCompleted', () => {
    it('should not be completed when cards are not matched', async () => {
      const { result } = renderHook(() => useGame());
      act(() => result.current.generateLayout());

      expect(result.current.isCompleted()).toBe(false);
    });

    it('should be completed when all cards are matched', async () => {
      const { result } = renderHook(() => useGame());
      act(() => result.current.generateLayout());

      // Match all cards
      result.current.layout.forEach((_, index) => {
        act(() =>
          result.current.matchCards(
            index,
            getCardIndex(result.current.layout, true, index),
          ),
        );
      });

      expect(result.current.isCompleted()).toBe(true);
    });
  });
});

const getCardIndex = (
  layout: Card[],
  findMatching = true,
  index = 0,
): number => {
  if (!layout.length) {
    return 0;
  }

  for (let i = 0; i < layout.length; i++) {
    if (i === index) {
      continue;
    }

    if (findMatching === (layout[index].content === layout[i].content)) {
      return i;
    }
  }

  return 0;
};
