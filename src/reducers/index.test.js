import reducers from './index';

test('reducers sequence', () => {
  // Maintenance: This test can be easy updated using the "Redux DevTools" extension for Chrome
  // Go to the Redux tab, Shift-select all actions on the left side and go to "Tests" on the right side.
  test('reducers', () => {
    const state = reducers(undefined, {});
    expect(state).toEqual({ bugsHistory: { history: [] }, generic: { results: {} } });
  });

  test('week number received', () => {
    const state = reducers(
      { bugsHistory: { history: [] }, generic: { results: {} } },
      { type: 'RECEIVE_DATA', payload: { key: 'weekNumber', current: 29 } },
    );
    expect(state).toEqual({
      bugsHistory: { history: [] },
      generic: { results: {}, weekNumber: { key: 'weekNumber', current: 29 } },
    });
  });

  test('a bugs history received', () => {
    const state = reducers(
      { bugsHistory: { history: [] }, generic: { results: {}, weekNumber: { key: 'weekNumber', current: 29 } } },
      {
        type: 'RECEIVE_BUGSHISTORY',
        payload: [
          { date: '4. Januar', openBugs: 23, solvedBugs: 0, newBugs: 0 },
          { date: '19. Januar', openBugs: 28, solvedBugs: 8, newBugs: 0 },
          { date: '27. Januar', openBugs: 20, solvedBugs: 5, newBugs: 0 },
          { date: '7. Februar', openBugs: 25, solvedBugs: 6, newBugs: 0 },
          { date: '13. Februar', openBugs: 20, solvedBugs: 3, newBugs: 0 },
          { date: '22. Februar', openBugs: 23, solvedBugs: 7, newBugs: 1 },
          { date: '23. Februar', openBugs: 25, solvedBugs: 0, newBugs: 0 },
          { date: '1. März', openBugs: 25, solvedBugs: 6, newBugs: 0 },
          { date: '2. März', openBugs: 27, solvedBugs: 3, newBugs: 1 },
          { date: '9. März', openBugs: 28, solvedBugs: 7, newBugs: 2 },
          { date: '16. März', openBugs: 31, solvedBugs: 0, newBugs: 4 },
          { date: '20. März', openBugs: 31, solvedBugs: 3, newBugs: 0 },
          { date: '27. März', openBugs: 27, solvedBugs: 6, newBugs: 2 },
          { date: '30. März', openBugs: 28, solvedBugs: 1, newBugs: 0 },
          { date: '5. April', openBugs: 31, solvedBugs: 12, newBugs: 1 },
          { date: '10. April', openBugs: 37, solvedBugs: 2, newBugs: 4 },
          { date: '13. April', openBugs: 41, solvedBugs: 5, newBugs: 4 },
          { date: '20. April', openBugs: 34, solvedBugs: 6, newBugs: 5 },
          { date: '24. April', openBugs: 33, solvedBugs: 1, newBugs: 0 },
          { date: '27. April', openBugs: 25, solvedBugs: 11, newBugs: 1 },
          { date: '4. Mai', openBugs: 23, solvedBugs: 10, newBugs: 3 },
          { date: '11. Mai', openBugs: 21, solvedBugs: 10, newBugs: 4 },
          { date: '18. Mai', openBugs: 22, solvedBugs: 6, newBugs: 3 },
          { date: '1. Juni', openBugs: 25, solvedBugs: 1, newBugs: 2 },
          { date: '8. Juni', openBugs: 25, solvedBugs: 8, newBugs: 3 },
          { date: '15. Juni', openBugs: 21, solvedBugs: 7, newBugs: 4 },
          { date: '16. Juni', openBugs: 22, solvedBugs: 1, newBugs: 0 },
          { date: '20. Juni', openBugs: 22, solvedBugs: 3, newBugs: 0 },
          { date: '26. Juni', openBugs: 23, solvedBugs: 0, newBugs: 0 },
        ],
      },
    );
    expect(state).toEqual({
      bugsHistory: {
        history: [
          { date: '4. Januar', openBugs: 23, solvedBugs: 0, newBugs: 0 },
          { date: '19. Januar', openBugs: 28, solvedBugs: 8, newBugs: 0 },
          { date: '27. Januar', openBugs: 20, solvedBugs: 5, newBugs: 0 },
          { date: '7. Februar', openBugs: 25, solvedBugs: 6, newBugs: 0 },
          { date: '13. Februar', openBugs: 20, solvedBugs: 3, newBugs: 0 },
          { date: '22. Februar', openBugs: 23, solvedBugs: 7, newBugs: 1 },
          { date: '23. Februar', openBugs: 25, solvedBugs: 0, newBugs: 0 },
          { date: '1. März', openBugs: 25, solvedBugs: 6, newBugs: 0 },
          { date: '2. März', openBugs: 27, solvedBugs: 3, newBugs: 1 },
          { date: '9. März', openBugs: 28, solvedBugs: 7, newBugs: 2 },
          { date: '16. März', openBugs: 31, solvedBugs: 0, newBugs: 4 },
          { date: '20. März', openBugs: 31, solvedBugs: 3, newBugs: 0 },
          { date: '27. März', openBugs: 27, solvedBugs: 6, newBugs: 2 },
          { date: '30. März', openBugs: 28, solvedBugs: 1, newBugs: 0 },
          { date: '5. April', openBugs: 31, solvedBugs: 12, newBugs: 1 },
          { date: '10. April', openBugs: 37, solvedBugs: 2, newBugs: 4 },
          { date: '13. April', openBugs: 41, solvedBugs: 5, newBugs: 4 },
          { date: '20. April', openBugs: 34, solvedBugs: 6, newBugs: 5 },
          { date: '24. April', openBugs: 33, solvedBugs: 1, newBugs: 0 },
          { date: '27. April', openBugs: 25, solvedBugs: 11, newBugs: 1 },
          { date: '4. Mai', openBugs: 23, solvedBugs: 10, newBugs: 3 },
          { date: '11. Mai', openBugs: 21, solvedBugs: 10, newBugs: 4 },
          { date: '18. Mai', openBugs: 22, solvedBugs: 6, newBugs: 3 },
          { date: '1. Juni', openBugs: 25, solvedBugs: 1, newBugs: 2 },
          { date: '8. Juni', openBugs: 25, solvedBugs: 8, newBugs: 3 },
          { date: '15. Juni', openBugs: 21, solvedBugs: 7, newBugs: 4 },
          { date: '16. Juni', openBugs: 22, solvedBugs: 1, newBugs: 0 },
          { date: '20. Juni', openBugs: 22, solvedBugs: 3, newBugs: 0 },
          { date: '26. Juni', openBugs: 23, solvedBugs: 0, newBugs: 0 },
        ],
      },
      generic: { results: {}, weekNumber: { key: 'weekNumber', current: 29 } },
    });
  });

  test('new data received', () => {
    const state = reducers(
      {
        bugsHistory: { history: [] },
        generic: {
          results: {},
          weekNumber: { key: 'weekNumber', current: 29 },
          customWidget: { key: 'customWidget', previous: 10, current: 20 },
          anotherCustomWidget: { key: 'anotherCustomWidget', current: 4 },
          customBreakdown: {
            key: 'customBreakdown',
            results: [{ name: 'A', count: 99 }, { name: 'B', count: 19 }, { name: 'C', count: 9 }],
            description: 'Example of a funnel',
          },
          customFunnel: {
            key: 'customFunnel',
            results: [{ name: 'A', count: 99 }, { name: 'B', count: 19 }, { name: 'C', count: 9 }],
            description: 'Example of a funnel',
          },
        },
      },
      {
        type: 'RECEIVE_DATA',
        payload: {
          key: 'newRelicErrors',
          previous: 0,
          current: 0,
          description: 'since 30 minutes ago compare with 30 minutes ago',
        },
      },
    );
    expect(state).toEqual({
      bugsHistory: { history: [] },
      generic: {
        results: {},
        weekNumber: { key: 'weekNumber', current: 29 },
        customWidget: { key: 'customWidget', previous: 10, current: 20 },
        anotherCustomWidget: { key: 'anotherCustomWidget', current: 4 },
        customBreakdown: {
          key: 'customBreakdown',
          results: [{ name: 'A', count: 99 }, { name: 'B', count: 19 }, { name: 'C', count: 9 }],
          description: 'Example of a funnel',
        },
        customFunnel: {
          key: 'customFunnel',
          results: [{ name: 'A', count: 99 }, { name: 'B', count: 19 }, { name: 'C', count: 9 }],
          description: 'Example of a funnel',
        },
        newRelicErrors: {
          key: 'newRelicErrors',
          previous: 0,
          current: 0,
          description: 'since 30 minutes ago compare with 30 minutes ago',
        },
      },
    });
  });
});
