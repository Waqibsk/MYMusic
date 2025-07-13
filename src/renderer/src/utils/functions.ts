export function getRandomWithOneExclusion(lengthOfArray, indexToExclude) {
  var rand = -1;
  while (rand === -1 || rand === indexToExclude) {
    rand = Math.round(Math.random() * (lengthOfArray - 1));
  }
  return rand;
}
