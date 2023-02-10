import { createContext, useMemo, useState } from 'react';
import { IdString, Match, MatchRecord } from '../util/types.util';
import { makeUniqueKey } from '../makeUniqueKey';

interface IBracketContext {
  matchRecord: MatchRecord;
  setMatchRecord: (matchRecord: MatchRecord) => void;
  createMatch: (matchValues?: Partial<Match>) => void;
  matchCounts: Record<IdString, number>;
  updateMatch: (key: IdString, matchValues: Partial<Match>) => void;
}

export const BracketContext = createContext<IBracketContext>({} as IBracketContext);

export const useBracketContextValue = () => {
  const [ matchRecord, setMatchRecord ] = useState<MatchRecord>({});

  const matchCounts = useMemo(() => {
    const counts: Record<IdString, number> = {};
    Object.values(matchRecord).forEach((match: Match) => {
      match.playerKeys.forEach((playerId) => {
        if (counts[playerId]) {
          counts[playerId]++;
        }
        else {
          counts[playerId] = 1;
        }
      })
    });
    return counts;
  }, [ matchRecord ]);

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
    updateMatch
  }

  return bracketContextValue;
}
