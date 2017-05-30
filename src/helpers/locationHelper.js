import geolib from 'geolib';

export function isInDistance(position1, position2, distance) {
  if (position1.latitude !== undefined &&
      position1.longitude !== undefined &&
      position2.latitude !== undefined &&
      position2.longitude !== undefined) {
    const difference = geolib.getDistance(position1, position2);
    return (difference <= distance);
  } else {
    return false;
  }

}
