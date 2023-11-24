import getTomaCoffeeProductData from "./scrapeTomaData.js";
import getHolaCoffeeProductData from "./scrapeHolaData.js";
import getNomadCoffeeProductData from "./scrapeNomadData.js";


const runScrapingFunctions = async () => {

  try {
    const tomaData = await getTomaCoffeeProductData();
    console.log('Toma Cafe scraping complete');

    const holaData = await getHolaCoffeeProductData();
    console.log('Hola Coffee scraping complete');

    const nomadData = await getNomadCoffeeProductData();
    console.log('Nomad Coffee scraping complete');

    console.log('All scraping complete');
  
    const coffeeData = [...tomaData, ...holaData, ...nomadData]; 
    return coffeeData;

  } catch (error) {
    console.error(error);
  }
};

export default runScrapingFunctions;