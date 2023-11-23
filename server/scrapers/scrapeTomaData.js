import puppeteer from "puppeteer";
import extractCoffeeOrigin from "../utils/extractCoffeeOrigin.js";
import launchBrowserAndNewPage from "./helpers/launchBrowserAndNewPage .js";


const getTomaCoffeeProductData = async () => {

    const { browser, page } = await launchBrowserAndNewPage();
    await page.goto('https://toma.cafe/en/shop/cafe');

    const productHandles = await page.$$('section.svelte-vz66ne:nth-child(1) > .grid.svelte-86dgh1 > a.svelte-86dgh1');
    const productHandlesToScrape = productHandles.slice(2);
    const shopNameString = await page.$eval('.column.svelte-1i6cx3 > p', (el) => el.textContent);

    //Regex extract shop name
    const pattern = / - (.+)$/;
    const result = shopNameString.match(pattern);
    const shopName = result ? result[1] : '';


    const productData = [];

    for(const producthandle of productHandlesToScrape) {

        try{

            const productName = await producthandle.$eval('.product-title', (el) => el.textContent)
            const productPrice = await producthandle.$eval('.minprice', (el) => el.textContent);
            const productImage = await producthandle.$eval('img.svelte-v51jn4', (el) => el.getAttribute('src'));
            const productLink = await (await producthandle.getProperty('href')).jsonValue(); //jsonValue() to extract the actual link value.

            const productOrigin = extractCoffeeOrigin(productName);
            

            productData.push({
                shopName,
                productName,
                productOrigin,
                productPrice,
                productImage,
                productLink,
                 
            });


        } catch (error) {
            console.log(error)
        }

    }
    

    await browser.close();
    return productData;

};

export default getTomaCoffeeProductData;