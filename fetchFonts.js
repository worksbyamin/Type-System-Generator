const https = require('https');
const fs = require('fs');

https.get('https://fonts.google.com/metadata/fonts', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const json = JSON.parse(data);
    const fonts = json.familyMetadataList.map(f => f.family);
    fs.writeFileSync('src/constants/googleFonts.ts', 'export const ALL_GOOGLE_FONTS = ' + JSON.stringify(fonts, null, 2) + ';');
    console.log('Saved ' + fonts.length + ' fonts.');
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
