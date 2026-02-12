const https = require('https');
const fs = require('fs');
const path = require('path');

// Load env validation
const envLocalPath = path.resolve(__dirname, '../.env.local');
let apiKey = '';

try {
    const envContent = fs.readFileSync(envLocalPath, 'utf8');
    const match = envContent.match(/RAPIDAPI_KEY=(.*)/);
    if (match && match[1]) {
        apiKey = match[1].trim();
        console.log('Found API Key length:', apiKey.length);
    } else {
        console.error('RAPIDAPI_KEY not found in .env.local');
        process.exit(1);
    }
} catch (e) {
    console.error('Error reading .env.local:', e);
    process.exit(1);
}

const data = JSON.stringify({
    messages: [
        {
            role: 'user',
            content: `Write a DETAILED 100-word product review for "Gaming Mouse". 
            JSON Response Format:
            {
                "title": "Title",
                "articleBody": "Body content"
            }
            CRITICAL: RETURN ONLY RAW JSON.`
        }
    ],
    web_access: false
});

const options = {
    hostname: 'chatgpt-42.p.rapidapi.com',
    path: '/gpt4',
    method: 'POST',
    headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

console.log('Sending request to', options.hostname + options.path);

const req = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

    let body = '';
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        body += chunk;
    });
    res.on('end', () => {
        console.log('BODY:', body);
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

req.write(data);
req.end();
