
// === Constants ===

const WORKER_URL = 'https://safe-speak-hook.vkeyonei.workers.dev';

// === Functions ===

export async function postData(data) {

    try {
        const response = await fetch(WORKER_URL, {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
            body: JSON.stringify(data)
        });

        const text = await response.text();

        // Try to Parse
        try {
            const data = JSON.parse(text);
            if (response.ok && data.status === 'success') {
                console.log('POST Success:', data);
                return data;
            } else {
                console.error('POST Failed:', data);
                return data;
            }
        } catch (error) {
            console.error('POST response not valid JSON. Raw response:', text);
            return error;
        }
    } catch (error) {
        console.error('POST request error:', error);
        return error;
    }
}

export async function getData() {

    try {
        const response = await fetch(WORKER_URL, {
            method: 'GET'
        })

        const text = await response.text();

        // Try to Parse
        try {
            const data = JSON.parse(text);
            if (response.ok && data.status === 'success') {
                console.log('GET Success:', data);
                return data;
            } else {
                console.error('GET Failed:', data);
                return data;
            }
        } catch (error) {
            console.error('GET response not valid JSON. Raw response:', text);
            return error;
        }
    } catch (error) {
        console.error('GET request error:', error);
        return error;
    }
}

/**
async function testData() {

    const accountData = {
        isAccount: true,
        Email: 'test_email@gmail.com',
        Username: 'test_username',
        Password: 'hased_test_password',
        OtherData: 'other_data'
    }

    const reportData = {
        isReport: true,
        Victim: 'test_victim',
        Suspect: 'test_suspect',
        Location: 'test_location',
        Date: 'test_date',
        Description: 'test_description',
        Class: 'test_class'
    }

    console.log("--- Testing GET Data ---")
    let data;
    data = await getData();
    console.log(`${data}\n`);

    console.log("--- Testing POST Data ---")
    data = await postData(accountData);
    console.log(`${data}\n`);

    console.log("--- Testing POST Data ---")
    data = await postData(reportData);
    console.log(`${data}\n`);

    console.log("--- Testing GET Data ---")
    data = await getData();
    console.log(`${data}\n`);
}

testData();

**/