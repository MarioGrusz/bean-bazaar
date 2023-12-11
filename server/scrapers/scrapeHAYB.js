import launchBrowserAndNewPage from "./helpers/launchBrowserAndNewPage .js";
import extractCoffeeOrigin from "../utils/extractCoffeeOrigin.js";

const getHAYBProductData = async () => {

    const { browser, page } = await launchBrowserAndNewPage();
    await page.goto('https://haybcoffee.pl/en/product-category/coffee/');
    const productData = [];

    const shopName = await page.$eval('.wp-block-columns > .wp-block-column:nth-child(2) > h2', (el) => el.textContent.trim());


    const hrefs = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.woocommerce-loop-product__link')).map(a => a.href);
    });

    for (const url of hrefs) {

        const productLink = url;

        try{

            let productName;

            await page.goto(url);
            const productNameElement = await page.$('.product-detail-content > .product-detail-value');
           

            if (productNameElement) {
                productName = await productNameElement.evaluate((el) => el.textContent.trim());
            } else {
                continue
            };

            const productOrigin = extractCoffeeOrigin(productName);
            const productImage = await page.$eval('.woocommerce-product-gallery__image > a', el => el.getAttribute('href'));

            const productPrice = await page.$eval('.price-value', (el) => {
                return `${el.textContent.trim()}€`
            });


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

export default getHAYBProductData;