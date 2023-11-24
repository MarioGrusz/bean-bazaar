const createCoffeeData = async () => {

    try{
        const productsData = await runScrapingFunctions();

        const roasteryOptions = ["Hola Coffee Roasters", "NOMAD", "Toma Café"];
        const oldCoffeeData = await CoffeeProduct.find({});


        //console.log('oldcoffee before', oldCoffeeData)
        //remove label new from oldCoffeeData items
        oldCoffeeData.forEach((coffee) => {coffee.class = ''});

        //console.log('oldcoffee ', oldCoffeeData)

        //filter out items from oldCoffeeData that do not exist in productsData
        oldCoffeeData = oldCoffeeData.filter((coffee) => {
            return !productsData.some((newCoffee) => newCoffee.productLink === coffee.productLink)
        })


        //items which weren't in old coffee will get label new
        productsData.forEach((coffee) => {
            const existsInOldData = oldCoffeeData.some((oldCoffee) => oldCoffee.productLink === coffee.productLink);
            if (!existsInOldData) {
              coffee.class = 'new';
            }
        });

        //filter out items from productsData that exist in oldCoffeeData
        productsData = productsData.filter((coffee) => {
            return !oldCoffeeData.some((oldCoffee) => oldCoffee.productLink === coffee.productLink);
        });

        



        // for (const roastery of roasteryOptions) {
        //     await CoffeeProduct.deleteMany({ shopName: roastery });
        // }
        await CoffeeProduct.updateMany({}, { $set: { class: '' } });
        const result = await CoffeeProduct.insertMany(productsData);

        console.log(`${result.length} documents were inserted into the collection.`);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Data scraping and storage process completed successfully."}),
        };
        

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "An error occurred while scraping data." }),
        };
    }

};