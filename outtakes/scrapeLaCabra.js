import launchBrowserAndNewPage from "../server/scrapers/helpers/launchBrowserAndNewPage .js";

//node  scrapeLaCabra.js


const getLaCabraProductData = async () => {

    const { browser, page } = await launchBrowserAndNewPage();
    const url = 'https://www.lacabra.dk/collections/coffee'
    await page.goto(url);
    const productData = [];

    // const shopNameString = await page.$eval('.copyright', (el) => el.textContent.trim());
    // const parts = shopNameString.split(',');
    // const shopName = parts[1].trim();

    // const currencyDropdown = await page.$('.ly-custom-dropdown-current');
    // await currencyDropdown.click();
    // const euroOption = await page.$('[data-currency-code="EUR"]');

    // const currencyDropdown = await page.$('.ly-custom-dropdown-current');
    // await page.evaluate((dropdown) => {
    //     dropdown.setAttribute('data-currency-code', 'EUR');
    // }, currencyDropdown);

    // const currencyDropdown = await page.$('.ly-custom-dropdown-current');
    // await page.evaluate((dropdown) => {
    // dropdown.setAttribute('data-currency-code', 'EUR');
    // const event = new Event('change');
    // dropdown.dispatchEvent(event);
    // }, currencyDropdown);

    // await page.click('.ly-custom-dropdown-current');
    // await page.click('li[key="EUR"]');

    await page.waitForSelector('.ly-custom-dropdown-current');
    await page.click('.ly-custom-dropdown-current');

    await page.waitForSelector('li[key="EUR"] > a');
    await page.click('li[key="EUR"] > a');

    

       
       
       

    







    // const parentElement = await euroOption.getProperty('parentNode');
    // const parentElementHandle = await parentElement.asElement();
    //await parentElementHandle.click();


    // try {
    //     await euroOption.click();
    //     console.log('The element is clickable');
    //    } catch (error) {
    //     console.log('The element is not clickable');
    //  }

  

    //const isClickable = euroOption.isClickable()
    // const euroOptionInnerHTML = await page.evaluate(el => el.innerHTML, euroOption);
    // console.log(euroOptionInnerHTML);


    //console.log(euroOption)

    //await euroOption.click();
    //await page.goto(url);






    const hrefs = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.grid-view-item__link')).map(a => a.href);
    });

    for (const url of hrefs) {

        const productLink = url;

        try{

            await page.goto(url);
            const productName = await page.$eval('.lc-product-country', el => el.textContent.trim());
            const productOrigin = productName;
            const productImage = await page.$eval('.product', el => el.getAttribute('src'));
            // const priceNumber = await page.$eval('#ProductPrice', el => el.getAttribute('content')); //.price-item
            // const productPrice = `${priceNumber}€`;

            const productPrice = await page.$eval('.price-item', el => el.textContent.trim());

            console.log(productPrice)



            // productData.push({
            //     shopName,
            //     productName,
            //     productPrice,
            //     productImage,
            //     productLink,
            //     productOrigin, 
            // });


        } catch (error) {
            console.log(error)
        }
        
    }

    await browser.close();
    console.log(productData)
    //return productData
};


export default getLaCabraProductData;


