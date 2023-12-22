import launchBrowserAndNewPage from "./helpers/launchBrowserAndNewPage .js";
import url from 'url';
import extractCoffeeOrigin from "../utils/extractCoffeeOrigin.js";


const getNomadCoffeeProductData = async () => {

    const productData = [];
    const baseUrl = 'https://nomadcoffee.es';

    const { browser, page } = await launchBrowserAndNewPage();
    await page.goto('https://nomadcoffee.es/en/collections/our-coffees');
    const productHandles = await page.$$('#MainContent > .shopify-section > .collection-list > .grid > .item');
   
    //const shopName = await page.$eval('#nav > .text-center > div > p', (el) => el.textContent.trim());  
    const shopName = 'Nomad Coffee'

    for(const producthandle of productHandles){

        try{


            const productImage = await producthandle.$eval('.product-single__thumbnail-image', (el) => el.getAttribute('src'));
            const relativeLink = await producthandle.$eval('a', (el) => el.getAttribute('href'));
            const productLink = url.resolve(baseUrl, relativeLink)

            let productSecondNameString

            const productPriceElement = await producthandle.$('.text-right');
            const productPriceRange = await productPriceElement.evaluate((el) => el.textContent.trim());
            const prices = productPriceRange.split(" - ");
            const firstPrice = prices[0];
            const priceInNumber = parseFloat(firstPrice.replace("€", ""));
            const productPrice = priceInNumber + " €";


            const productFirstNameElement = await producthandle.$('.notranslate > span > h3');
            const productFirstNameString = await productFirstNameElement.evaluate((el) => el.textContent.trim());
            const productSecondNameElement = await producthandle.$('.notranslate > span > h3:nth-child(2)');
            if (productSecondNameElement) {
                productSecondNameString = await productSecondNameElement.evaluate((el) => el.textContent.trim());
            } else {
                continue
            }
            const productName = `${productFirstNameString} ${productSecondNameString}`;
            const productOrigin = extractCoffeeOrigin(productFirstNameString)

            productData.push({
                shopName,
                productName,
                productPrice,
                productImage,
                productLink,
                productOrigin, 
            });

        } catch (error){
            console.log(error)
        }


    }
    
    await browser.close();
    return productData;
  
};


export default getNomadCoffeeProductData;