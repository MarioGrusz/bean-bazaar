const originMap = {
    "kenia": "kenya",
    "etiopia": "ethiopia",
    "etiopía": "ethiopia",
    "brasil" : "brazil",
    "fourquet": "fourquet blend",
    "ruanda": "rwanda",
    "méxico" : "mexico",
    "panamá" : "panama",
    "Coffee pods - Decaf " : 'coffee pods',
};
  
const extractCoffeeOrigin = (productName) => {
    const standardizedProductName = productName.toLowerCase();
    const words = standardizedProductName.split(' ');
    let origin;
    
    // Look for the origin name in the product name
    if (words.includes('el') && words.includes('salvador')) {
      origin = 'el salvador';
    } else if (words.includes('costa') && words.includes('rica')) {
      origin = 'costa rica';
    } else {
      origin = words[0];
    }
    
    // Map any variations of the origin name to a standardized name
    if (originMap[origin]) {
      origin = originMap[origin];
    }
    
    return origin;
};

export default extractCoffeeOrigin;