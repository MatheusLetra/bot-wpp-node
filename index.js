const puppeteer = require('puppeteer');

(async function main() {
    try {

        const browser = await puppeteer.launch({ headless: false })
        const page = await browser.newPage()
        await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36")

        await page.goto("https://web.whatsapp.com/")

        await page.waitForSelector("._1C2Q3")
        await delay(5000)

        const contactName = "LETRA"
        await page.click(`span[title='${contactName}']`)
        await page.waitForSelector(".vR1LG")

        const editor = await page.$("div[tabindex='-1']")
        await editor.focus()

        const amountOfMessages = 2

        for (let i = 0; i < amountOfMessages; i++) {
            await page.evaluate(() => {
                const message = 'Teste BOT-WPP'
                document.execCommand('insertText', false, message)
            })
            await page.click("span[data-testid='send']")
            await delay(1000)
        }


    } catch (error) {
        console.error('error mine', error)
    }
})()

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    })
}