import puppeteer from "puppeteer";

const launchBrowserAndNewPage = async () => {
    const browser = await puppeteer.launch({
        headless: 'new', 
        defaultViewport: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
 
    const page = await browser.newPage();
    return { browser, page };
};

export default launchBrowserAndNewPage


// In the context of web development and Puppeteer, "headless" refers to running a browser in a server environment without a graphical user interface. This is in contrast to a "non-headless" mode, where the browser is run with a graphical user interface, allowing you to visually see what's happening.

// In a headless mode, Puppeteer runs the browser in the background without displaying a window. This is useful for running tests or scraping data, as it can be faster and more efficient. It's also useful for running scripts on a server, where you wouldn't want to open a browser window.

// In a non-headless mode, Puppeteer runs the browser as you would see it on your desktop. This is useful for debugging, as you can visually see what's happening in the browser. It's also useful when you want to see the browser while the script is running.

// Here's how you can run Puppeteer in headless mode:

// const browser = await puppeteer.launch({ headless: true });

// And here's how you can run Puppeteer in non-headless mode:

// const browser = await puppeteer.launch({ headless: false });

// In both cases, puppeteer.launch() is used to start a new browser instance. The headless option is passed to puppeteer.launch() to specify whether the browser should be run in headless mode or non-headless mode 1, 2, 3, 4, 5.