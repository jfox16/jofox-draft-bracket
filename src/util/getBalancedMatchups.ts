import { IdString } from "./types.util";

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

  const [indexMatchups, indexMatchupCounts ] = getBalancedMatchupsV2(playerIds.length, minNumMatchupsPerPlayer);

  if (randomized) {
    shuffleArray(playerIds);
  }

  const idMatchups =  indexMatchups.map( ([ i1, i2 ]) => [ playerIds[i1], playerIds[i2] ] );
  const idMatchupCounts: Record<IdString, number> = {};
  for (let i = 0; i < indexMatchupCounts.length; i++) {
    const id = playerIds[i];
    const count = indexMatchupCounts[i];
    idMatchupCounts[id] = count;
  }

  return [
    idMatchups,
    idMatchupCounts
  ];
}

const getUniqueOpponents = (numPlayers: number) => {
  const uniqueOpponents: number[][] = Array(numPlayers);

  for (let i = 0; i <  numPlayers; i++) {
    const opp: number[] = [];
    const halfPlayers = Math.floor(numPlayers/2);
    // Add opponents from furthest to closest (if players were in a circle)
    for (let j = 0; j <= halfPlayers; j++) {
      console.info(i, j)
      const closest = i + halfPlayers - j;
      const otherClosest = i + halfPlayers + j;
      console.info(numPlayers, halfPlayers, closest, otherClosest);
      if (closest < numPlayers && closest !== i) {
        opp.push(closest);
      }
      if (otherClosest < numPlayers && otherClosest !== closest) {
        opp.push(otherClosest);
      }
    }
    uniqueOpponents[i] = opp;
  }

  console.info('uniqueOpponents', uniqueOpponents)

  return uniqueOpponents;
}

const getBalancedMatchupsV2 = (
  numPlayers: number,
  minMatchups: number,
): [
  number[][],
  number[]
] => {
  const balancedMatchups: number[][] = [];

  const remainingMatchupOpponents: number[][] = getUniqueOpponents(numPlayers);

  const playerMatchupCount: number[] = Array(numPlayers);
  playerMatchupCount.fill(0);

  const numPlayersAtMatchup: number[] = Array(minMatchups+2);
  numPlayersAtMatchup.fill(0);
  numPlayersAtMatchup[0] = numPlayers;

  let currentMinMatchups = 0;
  let tries = 0;

  while (currentMinMatchups < minMatchups && tries < 100) {
    const player = tries % numPlayers;

    const possibleOpponents = remainingMatchupOpponents[player];
    let opponentToAdd = -1;

    const playerCount = playerMatchupCount[player];
    const canAddPlayer = playerCount === currentMinMatchups || numPlayersAtMatchup[currentMinMatchups] === 1;

    if (canAddPlayer) {
      for (let i = 0; i < possibleOpponents.length; i++) {
        // if opponent has <currentMinMatchups> minMatchups, it needs a matchup. Add as opponent
        const opponent = possibleOpponents[i];
        const opponentCount = playerMatchupCount[opponent];
        const canAddOpponent = opponentCount === currentMinMatchups;
  
        if (canAddOpponent) {
          possibleOpponents.splice(i, 1);
          opponentToAdd = opponent;
          break;
        }
      }
    }

    if (opponentToAdd > -1) {
      
      const matchup = [ player, opponentToAdd ];

      matchup.forEach((_player) => {
        numPlayersAtMatchup[playerMatchupCount[_player]]--;
        playerMatchupCount[_player]++;
        numPlayersAtMatchup[playerMatchupCount[_player]]++;
      });

      balancedMatchups.push([ player, opponentToAdd ]);
    }
    

    if (numPlayersAtMatchup[currentMinMatchups] === 0) {
      currentMinMatchups++;
      tries = 0;
    }
    else {
      tries++;
    }
  }
  

  console.info('getBalancedMatchupsV2', { numPlayers, minMatchups, balancedMatchups, remainingMatchupOpponents, playerMatchupCount, numPlayersAtMatchup, currentMinMatchups, tries })

  return [
    balancedMatchups,
    playerMatchupCount,
  ];
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
