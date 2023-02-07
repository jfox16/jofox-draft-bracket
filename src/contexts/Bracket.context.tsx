import { createContext, useState } from 'react';
import { Match, MatchRecord } from '../util/types.util';
import { makeUniqueKey } from '../makeUniqueKey';

interface IBracketContext {
  matchRecord: MatchRecord;
  setMatchRecord: (matchRecord: MatchRecord) => void;
  createMatch: (matchValues?: Partial<Match>) => void;
}

export const BracketContext = createContext<IBracketContext>({} as IBracketContext);

export const useBracketContextValue = () => {
  const [ matchRecord, setMatchRecord ] = useState<MatchRecord>({});

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

  const bracketContextValue = {
    matchRecord,
    setMatchRecord,
    createMatch,
  }

  return bracketContextValue;
}
