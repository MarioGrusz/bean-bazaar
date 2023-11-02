import puppeteer from "puppeteer";
import extractCoffeeOrigin from "../utils/extractCoffeeOrigin.js";
import url from 'url';


const getHolaCoffeeProductData = async () => {


    const browser = await puppeteer.launch({
        headless: 'new', 
        defaultViewport: false,
    });

    const page = await browser.newPage();
    await page.goto('https://hola.coffee/en/collections/cafe-en-grano-o-molido');

    const productHandles = await page.$$('#Collection > .grid--view-items > .grid__item');
    const productHandlesToScrape = productHandles.slice(2, -1);

    const shopName = await page.$eval('.site-footer__copyright-content > a', (el) => el.textContent);

    const baseUrl = 'https://shop.hola.coffee';
    const productData = [];

    for(const producthandle of productHandlesToScrape) {

        try{

            const productName = await producthandle.$eval('.visually-hidden', (el) => el.textContent)
            const productPriceString = await producthandle.$eval('.price__regular', (el) => el.textContent);
            const productImage = await producthandle.$eval('.grid-view-item__image', (el) => el.getAttribute('src'));
            const relativeLink = await producthandle.$eval('.grid-view-item__link', (el) => el.getAttribute('href'));
            
            const productOrigin = extractCoffeeOrigin(productName);
            const productLink = url.resolve(baseUrl, relativeLink);

            const priceMatch = productPriceString.match(/€\d+,\d+/);
            const priceEuroSign = priceMatch ? priceMatch[0].trim() : ''; //250g bag price
            const removeEuroSign = priceEuroSign.substring(1);
            const productPrice = removeEuroSign ? removeEuroSign.replace(",", ".") + " €" : ""
        

            productData.push({
                shopName,
                productName,
                productPrice,
                productImage,
                productLink,
                productOrigin, 
            });


        } catch (error) {
            console.log(error)
        }

    }

    await browser.close();
    return productData;

};

export default getHolaCoffeeProductData;

