import geolib from 'geolib';

export function isInDistance(position1, position2, distance) {
  const difference = geolib.getDistance(position1, position2);

  return difference <= distance;
}
