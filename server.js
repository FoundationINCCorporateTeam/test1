const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const querystring = require('querystring');

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
app.post('/proxy', (req, res) => {
    const { url } = req.body;

    // Encode the URL
    const encodedUrl = querystring.escape(url);

    // Open the URL using the default system browser
    exec(`open "${encodedUrl}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error opening URL: ${error.message}`);
            res.status(500).send('Error opening URL');
        } else {
            console.log(`Opened URL: ${url}`);
            res.redirect(url); // Redirect back to the submitted URL
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
