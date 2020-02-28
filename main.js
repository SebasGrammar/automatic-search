const puppeteer = require("puppeteer")

// function main(term) {
//     automateSearch(term)
// }

// //let term = "assert"

// async function automateSearch(term) {
//     try {
//     const browser = await puppeteer.launch({headless: false});
//     const page = await browser.newPage();
//     await page.setViewport({width: 1288, height: 800})
//     await page.goto("https://www.collinsdictionary.com/")
//     //await page.type(".gLFyf.gsfi", "phrasal verb synonym")
//     await page.type(".search-select.custom-select.autoc-dict", `${term}`)
//     await page.click("button.search-submit")
//     } catch (error) {
//         console.log("An unexpected error occuredd. Try again")
//     }
// }

// main("dumbass")

function main() {
    automateSearch()
}

//let term = "assert"

async function automateSearch() {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.setViewport({ width: 1288, height: 800 })
        await page.goto("http://iteslj.org/questions/")
        //console.log(page)

        const assetUrls = await page.$$eval(
            'li > a',
            assetLinks => assetLinks.map(link => link.href).filter(link => link.includes("questions") && link.includes("html"))
        );
        console.log(assetUrls)

        let results = []

        for (let assetsUrl of assetUrls) {
            await page.goto(assetsUrl);

            // Now collect all the ICO urls.
            const icoUrls = await page.$$eval(
                'li',

                links => links.map(link => link.textContent)
            )

            for (let li of icoUrls) {
                await results.push(li)
                await console.log(results)
            }
        };


        //await console.log(results)
        //await page.click("a")
    } catch (error) {
        console.log("An unexpected error occuredd. Try again")
    }
}

main()

//http://iteslj.org/questions/

            // assetLinks => assetLinks.map(link => link.href)
            // assetLinks => assetLinks.map(link => {
            //     if (link.includes("questions")) {
            //         return link.href
            //     }
            // })