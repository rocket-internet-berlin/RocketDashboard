import { onReceive } from './jiraIssues';

describe('jiraIssues reponse parsing', () => {
  const actual = onReceive({ data: { currentBugs: 999, solvedBugs: 99, newBugs: 9 } });
  const expected = { type: 'JIRAISSUES_RECEIVE', payload: { currentBugs: 999, solvedBugs: 99, newBugs: 9 } };

  it('creates a correct action', () => {
    expect(actual).toEqual(expected);
  });
});
