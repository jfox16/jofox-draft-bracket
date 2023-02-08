import { IdString } from "./types.util";


const getLegalIndexMatchups = (numPlayers: number) => {
  const legalMatchups: number[][] = [];
  for (let i = 0; i < numPlayers-1; i++) {
    for (let j = 0; j < numPlayers-1-i; j++) {
      legalMatchups.push(matchupMap[i][j]);
    }
  }
  return legalMatchups;
}

const getBalancedMatchupsInOrder = (
  numPlayers: number,
  minMatchupsPerPlayer: number
): [
  number[][],
  number[]
] => {
  const balancedOrder: number[][] = [];
  let matchupPool: number[][] = [];
  const matchupCounts: number[] = Array(numPlayers);
  matchupCounts.fill(0);
  const countCounts: number[] = Array(minMatchupsPerPlayer + 1);
  countCounts.fill(0)
  countCounts[0] = numPlayers;

  let currentLowestMatchupCount = 0;
  let asdf = 0;

  while (currentLowestMatchupCount < minMatchupsPerPlayer && asdf < 50) {
    if (matchupPool.length === 0) {
      matchupPool = getLegalIndexMatchups(numPlayers);
    }
    // console.log('getMatchupsInBalancedOrder', { matchupPool, countCounts, matchupCounts, currentLowestMatchupCount });
    for (let i = 0; i < matchupPool.length; i++) {
      const matchup = matchupPool[i];
      const player1 = matchup[0];
      const player2 = matchup[1];
      const player1MatchupCount = matchupCounts[player1];
      const player2MatchupCount = matchupCounts[player2];
      let shouldAddMatchup = false;

      if (countCounts[currentLowestMatchupCount + 1] === numPlayers - 1) {
        if (
          player1MatchupCount === currentLowestMatchupCount
          || player2MatchupCount === currentLowestMatchupCount
        ) {
          shouldAddMatchup = true;
        }
      }
      else {
        if (
          player1MatchupCount === currentLowestMatchupCount
          && player2MatchupCount === currentLowestMatchupCount
        ) {
          shouldAddMatchup = true;
        }
      }

      if (shouldAddMatchup) {
        balancedOrder.push(matchup);
        matchupCounts[player1] += 1;
        matchupCounts[player2] += 1;
        countCounts[matchupCounts[player1]] += 1;
        countCounts[matchupCounts[player2]] += 1;

        if (
          countCounts[matchupCounts[player1]] === numPlayers
          || countCounts[matchupCounts[player2]] === numPlayers
        ) {
          currentLowestMatchupCount++;
        }
        matchupPool.splice(i, 1);
        break;
      }
    }
    asdf++;
  }

  console.info('matchupCounts', matchupCounts);
  console.info('balancedOrder', balancedOrder);

  return [
    balancedOrder,
    matchupCounts
  ];
}

const shuffleArray = (array: any[]) => {
  let curr_i = array.length;
  let rand_i;

  while(curr_i > 0) {
    rand_i = Math.floor(Math.random() * curr_i);
    curr_i--;

    [array[curr_i], array[rand_i]] = [array[rand_i], array[curr_i]];
  }

  return array;
}

export const getBalancedMatchups = (
  playerIds: IdString[],
  minNumMatchupsPerPlayer: number,
  randomized: boolean = true
): [
  IdString[][],
  Record<IdString, number>
] => {
    if (playerIds.length > 8) {
      return [] as any;
  }

  const [
    matchupsInBalancedOrder,
    matchupCounts
  ] = getBalancedMatchupsInOrder(playerIds.length, minNumMatchupsPerPlayer);

  if (randomized) {
    shuffleArray(playerIds);
  }

  const balancedMatchups =  matchupsInBalancedOrder.map( ([ i1, i2 ]) => [ playerIds[i1], playerIds[i2] ] );
  const idMatchupCounts: Record<IdString, number> = {};
  for (let i = 0; i < matchupCounts.length; i++) {
    const id = playerIds[i];
    const count = matchupCounts[i];
    idMatchupCounts[id] = count;
  }

  return [
    balancedMatchups,
    idMatchupCounts,
  ]


  // let playerMatchupCounts: Record<string, number> = {};
  // playerIds.forEach((playerId: string) => playerMatchupCounts[playerId] = 0);

  // let indexMatchupPool: number[][] = [];

  // let i = 0;

  // while (i < 100) {
  //   // indexMatchupPool gets refilled with legal matchups between existing player ids
  //   if (indexMatchupPool.length === 0) {
  //     indexMatchupPool = getLegalIndexMatchups(playerIds.length);
  //   }

  //   // Pick random matchups from pool and remove
  //   const rand_i = randomized ? Math.floor(Math.random()*indexMatchupPool.length) : 0;
  //   const [ playerIdIndex1, playerIdIndex2 ] = indexMatchupPool[rand_i];
  //   indexMatchupPool.splice(rand_i, 1);
  //   const playerId1 = playerIds[playerIdIndex1];
  //   const playerId2 = playerIds[playerIdIndex2];

  //   // If either player needs more matchups, add it to balancedMatchups.
  //   const player1NeedsMoreMatchups = playerMatchupCounts[playerId1] < minNumMatchupsPerPlayer;
  //   const player2NeedsMoreMatchups = playerMatchupCounts[playerId2] < minNumMatchupsPerPlayer;
    
  //   if (player1NeedsMoreMatchups && player2NeedsMoreMatchups) {
  //     balancedMatchups.push([ playerId1, playerId2 ]);
  //     playerMatchupCounts[playerId1] = playerMatchupCounts[playerId1] + 1;
  //     playerMatchupCounts[playerId2] = playerMatchupCounts[playerId2] + 1;
  //     if (!Object.values(playerMatchupCounts).some((count: number) => count < minNumMatchupsPerPlayer)) {
  //       break;
  //     }
  //   }

  //   i++;
  // }

  // console.info(' --- getBalancedMatchups called ---', { playerMatchupCounts });

  // return balancedMatchups;
}

const matchupMap = [
  [[0,1], [0,2], [0,3], [0,4], [0,5], [0,6], [0,7]],
  [[1,2], [1,3], [1,4], [1,5], [1,6], [1,7]],
  [[2,3], [2,4], [2,5], [2,6], [2,7]],
  [[3,4], [3,5], [3,6], [3,7]],
  [[4,5], [4,6], [4,7]],
  [[5,6], [5,7]],
  [[6,7]] 
];
