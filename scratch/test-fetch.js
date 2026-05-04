const url = `https://chromewebstore.google.com/detail/grammarly-ai-writing-and/kbfnbcaeplbciohcnhhgihodeihfjnih?hl=en&gl=US`;

async function test() {
  console.log(`Fetching ${url} as GOOGLEBOT...`);
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
    }
  });

  console.log(`Status: ${response.status}`);
  if (response.ok) {
    const text = await response.text();
    const fs = require('fs');
    fs.writeFileSync('scratch/sample.html', text);
    console.log(`Saved HTML. Length: ${text.length}`);
    if (text.toLowerCase().includes('grammarly')) {
      console.log('SUCCESS: Grammarly found in HTML!');
      // Log where it was found
      const index = text.toLowerCase().indexOf('grammarly');
      console.log('Context:', text.substring(index - 50, index + 100));
    } else {
      console.log('FAILURE: Grammarly NOT found in HTML.');
    }
  }
}

test();
