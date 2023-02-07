

const getLegalIndexMatchups = (numPlayers: number) => {
  const legalMatchups: number[][] = [];
  for (let i = 0; i < numPlayers-1; i++) {
    for (let j = 0; j < numPlayers-1-i; j++) {
      console.log('getLegalIndexMatchups', [ i, j ]);
      legalMatchups.push(matchupMap[i][j]);
    }
  }
  return legalMatchups;
  }

  export const getBalancedMatchups = (
    playerIds: string[],
    minNumMatchupsPerPlayer: number,
    randomized: boolean = true
  ): string[][] => {
    if (playerIds.length > 8) {
      return [];
  }

  const balancedMatchups: string[][] = [];

  let playerMatchupCounts: Record<string, number> = {};
  playerIds.forEach((playerId: string) => playerMatchupCounts[playerId] = 0);

  let indexMatchupPool: number[][] = [];

  let i = 0;

  while (i < 100) {
    // indexMatchupPool gets refilled with legal matchups between existing player ids
    if (indexMatchupPool.length === 0) {
      indexMatchupPool = getLegalIndexMatchups(playerIds.length);
    }

    // Pick random matchups from pool and remove
    const rand_i = randomized ? Math.floor(Math.random()*indexMatchupPool.length) : 0;
    const [ playerIdIndex1, playerIdIndex2 ] = indexMatchupPool[rand_i];
    indexMatchupPool.splice(rand_i, 1);
    const playerId1 = playerIds[playerIdIndex1];
    const playerId2 = playerIds[playerIdIndex2];

    // If either player needs more matchups, add it to balancedMatchups.
    const player1NeedsMoreMatchups = playerMatchupCounts[playerId1] < minNumMatchupsPerPlayer;
    const player2NeedsMoreMatchups = playerMatchupCounts[playerId2] < minNumMatchupsPerPlayer;
    
    console.info('while loop', { balancedMatchups, indexMatchupPool, playerMatchupCounts, playerId1, playerId2, player1NeedsMoreMatchups, player2NeedsMoreMatchups });
    if (player1NeedsMoreMatchups && player2NeedsMoreMatchups) {
      balancedMatchups.push([ playerId1, playerId2 ]);
      playerMatchupCounts[playerId1] = playerMatchupCounts[playerId1] + 1;
      playerMatchupCounts[playerId2] = playerMatchupCounts[playerId2] + 1;
      if (!Object.values(playerMatchupCounts).some((count: number) => count < minNumMatchupsPerPlayer)) {
        break;
      }
    }

    i++;
  }

  console.info(' --- getBalancedMatchups called ---', { playerMatchupCounts });

  return balancedMatchups;
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
