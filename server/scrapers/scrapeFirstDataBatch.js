import getTomaCoffeeProductData from "./scrapeTomaData.js";
import getHolaCoffeeProductData from "./scrapeHolaData.js";
import getNomadCoffeeProductData from "./scrapeNomadData.js";

import getHAYBProductData from "./scrapeHAYB.js";
import getFriedhatsProductData from "./scrapeFriedhats.js";

const runScrapingFunctions = async () => {
  try {
    const tomaData = await getTomaCoffeeProductData();
    console.log("Toma Cafe scraping complete");

    const holaData = await getHolaCoffeeProductData();
    console.log("Hola Coffee scraping complete");

    const nomadData = await getNomadCoffeeProductData();
    console.log("Nomad Coffee scraping complete");

    const HAYBData = await getHAYBProductData();
    console.log("HAYB Coffee scraping complete");

    const FriedhatsData = await getFriedhatsProductData();
    console.log("Friedhats Coffee scraping complete");

    console.log("All scraping complete");

    const coffeeData = [
      ...tomaData,
      ...holaData,
      ...nomadData,
      ...HAYBData,
      ...FriedhatsData,
    ];
    console.log(coffeeData);
    return coffeeData;
  } catch (error) {
    console.error(error);
  }
};

export default runScrapingFunctions;
