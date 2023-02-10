import { createContext, useState } from 'react';
import { IdString, Match, MatchRecord } from '../util/types.util';
import { makeUniqueKey } from '../makeUniqueKey';

interface IBracketContext {
  matchRecord: MatchRecord;
  setMatchRecord: (matchRecord: MatchRecord) => void;
  createMatch: (matchValues?: Partial<Match>) => void;
  matchCounts: Record<IdString, number>;
  setMatchCounts: (matchCounts: Record<IdString, number>) => void,
  updateMatch: (key: IdString, matchValues: Partial<Match>) => void;
}

export const BracketContext = createContext<IBracketContext>({} as IBracketContext);

export const useBracketContextValue = () => {
  const [ matchRecord, setMatchRecord ] = useState<MatchRecord>({});
  const [ matchCounts, setMatchCounts ] = useState<Record<IdString, number>>({});

  const createMatch = (matchValues?: Partial<Match>) => {
    const key = makeUniqueKey('match');
    const newMatch = {
      name: 'New Match',
      playerKeys: [],
      ...matchValues
    };

    setMatchRecord({
      ...matchRecord,
      [key]: newMatch
    });
  }

  const updateMatch = (key: IdString, matchValues: Partial<Match>) => {
    console.info('updateMatch', { key, matchValues })
    setMatchRecord({
      ...matchRecord,
      [key]: {
        ...matchRecord[key],
        ...matchValues
      }
    })
  }

  const bracketContextValue = {
    matchRecord,
    setMatchRecord,
    createMatch,
    matchCounts,
    setMatchCounts,
    updateMatch
  }

  return bracketContextValue;
}
