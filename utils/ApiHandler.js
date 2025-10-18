
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