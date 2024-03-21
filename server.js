const express = require('express');
const bodyParser = require('body-parser');
const querystring = require('querystring');
const axios = require('axios');

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML form
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Website Proxy Form</title>
        </head>
        <body>
            <h1>Website Proxy</h1>
            <form action="/proxy" method="post">
                <label for="url">Enter URL:</label>
                <input type="url" id="url" name="url" required>
                <button type="submit">Submit</button>
            </form>
        </body>
        </html>
    `);
});

// Handle form submission
app.post('/proxy', async (req, res) => {
    const { url } = req.body;

    try {
        // Encode the URL
        const encodedUrl = querystring.escape(url);

        // Fetch the content of the specified URL
        const response = await axios.get(encodedUrl);

        // Send the fetched content as the response
        res.send(response.data);
    } catch (error) {
        console.error(`Error fetching URL: ${error.message}`);
        res.status(500).send('Error fetching URL');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
