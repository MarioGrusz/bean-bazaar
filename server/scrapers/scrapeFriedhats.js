import launchBrowserAndNewPage from "./helpers/launchBrowserAndNewPage .js";
import extractCoffeeOrigin from "../utils/extractCoffeeOrigin.js";


const getFriedhatsProductData = async () => {

    const { browser, page } = await launchBrowserAndNewPage();
    await page.goto('https://friedhats.com/pages/shop');
    const productData = [];

    // const shopNameString = await page.$eval('.copyright', (el) => el.textContent.trim());
    // const parts = shopNameString.split(',');
    // const shopName = parts[1].trim();

    const shopName = 'Friedhats Coffee';


    const hrefs = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.product-label__type')).map(a => a.href);
    });

    for (const url of hrefs) {

        const productLink = url;

        try{

            await page.goto(url);
            const productName = await page.$eval('.product-origin', el => el.textContent);
            const productOrigin = extractCoffeeOrigin(productName);
            const productImage = await page.$eval('.product-single__photos', el => el.getAttribute('src'));
            const priceNumber = await page.$eval('#ProductPrice', el => el.getAttribute('content'));
            const productPrice = `${priceNumber}€`;



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
    return productData
};


export default getFriedhatsProductData;