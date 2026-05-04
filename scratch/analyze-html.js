const cheerio = require('cheerio');
const fs = require('fs');

const html = fs.readFileSync('scratch/sample.html', 'utf8');
const $ = cheerio.load(html);

console.log('Title:', $('title').text());

// Look for user count
console.log('Searching for users text...');
$('*').each((_, el) => {
  const text = $(el).children().length === 0 ? $(el).text().trim() : '';
  if (text.includes('users')) {
    console.log('Found users text:', text);
  }
});

// Look for rating
console.log('Searching for ratings text...');
$('*').each((_, el) => {
  const text = $(el).children().length === 0 ? $(el).text().trim() : '';
  if (text.includes('rating') || text.includes('out of 5')) {
    console.log('Found potential rating:', text);
  }
});

// Look for version
console.log('Searching for version...');
$('*').each((_, el) => {
  const text = $(el).children().length === 0 ? $(el).text().trim() : '';
  if (text.includes('Version')) {
    console.log('Found Version text:', text);
  }
});

// Look for meta tags
console.log('Meta tags:');
$('meta').each((_, el) => {
  console.log($(el).attr('property') || $(el).attr('name'), ':', $(el).attr('content'));
});
