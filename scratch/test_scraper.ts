import { fetchExtensionFromStore } from '../lib/scraper/fetchExtension'

async function test() {
  const chromeId = process.argv[2] || 'cfhdojbkjhnklbpkdaibdccddilifddb'
  console.log('TESTING ID:', chromeId)
  try {
    const data = await fetchExtensionFromStore(chromeId)
    console.log('FINAL DATA:', JSON.stringify(data, null, 2))
  } catch (e) {
    console.error('TEST FAILED:', e)
  }
}

test()
