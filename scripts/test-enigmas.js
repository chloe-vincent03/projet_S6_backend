const http = require('http');

function request(url, options = {}, body = null) {
    return new Promise((resolve, reject) => {
        const parsedUrl = new URL(url);
        const opts = {
            hostname: parsedUrl.hostname,
            port: parsedUrl.port,
            path: parsedUrl.pathname,
            method: options.method || 'GET',
            headers: options.headers || {}
        };

        const req = http.request(opts, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    console.error('Failed to parse JSON:', data);
                    resolve(data);
                }
            });
        });

        req.on('error', reject);

        if (body) {
            req.write(body);
        }
        req.end();
    });
}

async function testEnigmas() {
    const baseUrl = 'http://localhost:3001/api/enigmas';

    console.log('--- TEST START ---');

    console.log('1. Testing GET /api/enigmas');
    try {
        const list = await request(baseUrl);
        console.log('List length:', list.length);
        if (list.length > 0 && !list[0].answer) {
            console.log('PASS: Answer is hidden.');
        } else {
            console.log('FAIL: Answer exposed or list empty.');
        }

        const testId = list[0]?.id || 'enigma_001';

        console.log('\n2. Testing POST /api/enigmas/verify (Incorrect)');
        const wrongResult = await request(`${baseUrl}/verify`,
            { method: 'POST', headers: { 'Content-Type': 'application/json' } },
            JSON.stringify({ id: testId, answer: 'wrong' })
        );
        if (wrongResult.success === false) {
            console.log('PASS: Incorrect answer handled.');
        } else {
            console.log('FAIL: Incorrect answer should fail.', wrongResult);
        }

        console.log('\n3. Testing POST /api/enigmas/verify (Correct)');
        const correctResult = await request(`${baseUrl}/verify`,
            { method: 'POST', headers: { 'Content-Type': 'application/json' } },
            JSON.stringify({ id: testId, answer: 'silence' })
        );

        if (correctResult.success === true && correctResult.reward) {
            console.log('PASS: Correct answer rewarded.');
            console.log('Reward:', correctResult.reward.word);
        } else {
            console.log('FAIL: Correct answer should pass.', correctResult);
        }

    } catch (err) {
        console.error('Test Exception:', err);
    }
    console.log('--- TEST END ---');
}

testEnigmas();
