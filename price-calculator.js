function computePrice(distanceInKm, boxSize) {
  const ratePerKm = 5;
  let boxPrice = 0; 

  switch (boxSize) {
    case 'extra small': 
      boxPrice = 245; 
      break; 
    case 'small':
      boxPrice = 380; 
      break; 
    case 'medium': 
      boxPrice = 750; 
      break; 
    case 'large': 
      boxPrice = 1300; 
      break; 
  }

  return (distanceInKm * 5) + boxPrice; 
}

module.exports = computePrice; 