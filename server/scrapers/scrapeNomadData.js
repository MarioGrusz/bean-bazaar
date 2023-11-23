import puppeteer from "puppeteer";
import extractCoffeeOrigin from "../utils/extractCoffeeOrigin.js";


const getNomadCoffeeProductData = async () => {


    const browser = await puppeteer.launch({
        headless: 'new', 
        defaultViewport: false,
    });


    const page = await browser.newPage();
    await page.goto('https://nomadcoffee.es/en/product-category/coffee-en/');

    const productHandles = await page.$$('div.products > .col-md-4');
    const productHandlesToScrape = productHandles.slice(0, -3);
    //const shopName = await page.$eval('.text-center > a', (el) => el.textContent);

    const productData = [];

    for(const producthandle of productHandlesToScrape) {

        try{

            const productNameElement = await producthandle.$('.origen');
            const productPriceElement = await producthandle.$('bdi:nth-child(1)');
            let productName;
            let productPrice;

            if (productNameElement) {
                const productNameString = await productNameElement.evaluate((el) => el.textContent.trim());
                productName = productNameString.replace(/\s+/g, ' ').trim();
            } else {
                continue
            }

            if (productPriceElement) {
                productPrice = await productPriceElement.evaluate((el) => el.textContent.trim());
            } else {
                continue
            }

            const productImage = await producthandle.$eval('img', (el) => el.getAttribute('src'));
            const productLink = await producthandle.$eval('a', (el) => el.getAttribute('href'));

            
            const productOrigin = extractCoffeeOrigin(productName);

            productData.push({
                //shopName,
                productName,
                productPrice,
                productImage,
                productLink,
                productOrigin, 
            });


        } catch (error) {
            console.log(error)
        }

    };
    
    await browser.close();
    return productData;
  
};

getNomadCoffeeProductData()


export default getNomadCoffeeProductData;