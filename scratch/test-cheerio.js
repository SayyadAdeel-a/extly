const cheerio = require('cheerio')

async function testParsing() {
  const html = `
    <table>
      <thead>
        <tr><th>Date</th><th>Users</th><th>Rating</th></tr>
      </thead>
      <tbody>
        <tr><td>2024-01-01</td><td>1,000</td><td>4.5</td></tr>
        <tr><td>2024-01-02</td><td>1,100</td><td>4.6</td></tr>
      </tbody>
    </table>
    <script>
      var data = {
        labels: ["2024-01-03", "2024-01-04"],
        data: [1200, 1300]
      };
    </script>
  `
  
  const $ = cheerio.load(html)
  const snapshots = []

  // Table parsing
  $('table').each((_, table) => {
    const headers = $(table).find('th').map((_, th) => $(th).text().toLowerCase().trim()).get()
    $(table).find('tr').each((i, row) => {
      if (i === 0) return
      const cells = $(row).find('td').map((_, td) => $(td).text().trim()).get()
      const date = cells[0]
      const userCount = parseInt(cells[1].replace(/,/g, ''))
      const rating = parseFloat(cells[2])
      snapshots.push({ date, userCount, rating })
    })
  })

  // Script parsing
  $('script').each((_, script) => {
    const content = $(script).html() || ''
    const chartDataMatch = content.match(/labels\s*:\s*\[([\s\S]*?)\][\s\S]*?data\s*:\s*\[([\s\S]*?)\]/i)
    if (chartDataMatch) {
      const labels = chartDataMatch[1].match(/"([^"]+)"/g)?.map(l => l.replace(/"/g, '')) || []
      const values = chartDataMatch[2].match(/[\d.]+/g)?.map(Number) || []
      labels.forEach((label, i) => {
        snapshots.push({ date: label, userCount: values[i], rating: null })
      })
    }
  })

  console.log('Parsed Snapshots:', snapshots)
}

testParsing()
