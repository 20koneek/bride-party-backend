import { Browser, launch, Page } from 'puppeteer'
import { env } from '../../env'

export const BarcodeQuery = async () => {

  const browser: Browser = await launch(
    env.isProduction
      ? { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
      : {},
  )
  const page: Page = await browser.newPage()

  return async (barcode: string) => {
    let result: string | undefined

    try {
      await page.goto('http://ru.disai.org', { waitUntil: 'networkidle2' })
      await page.waitForSelector('input[name=search_query]')
      await page.$eval('input[name=search_query]', (element, value) => {
        // @ts-ignore
        element.value = value
      }, barcode)
      await page.click('#search-form a')
      const body = await page.$('tbody')
      const content = await body?.getProperty('textContent')

      if (content) {
        console.error((await content.jsonValue() as string).split('\n'))
        result = (await content.jsonValue() as string).split('\n')[6]
      }
    } catch (e) {
      console.log(e)
    } finally {
      await browser.close()
    }

    return result
  }
}
