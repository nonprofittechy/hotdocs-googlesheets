# hotdocs-googlesheets
An simple workflow example of how to use Google Forms/Sheets as a quasi-database for LawHelpInteractive's hosted Hotdocs, as a replacement
for an overlay answer file. Why? Because LHI does not support overlay answer files. Bonus: this makes it easy for anyone across the state to submit additions to our database.

Here's the basic workflow:

1. A user submits a new database entry (attorney or court name) with a Google Form.
2. A Google Apps Script converts the resulting Google Sheet into a HotDocs computation that adds each row as a REPEAT value.
3. The computation is copied and pasted into the Interview computation.

I used a HotDocs text template to convert the existing overlay answer file into a CSV file that could be imported into Google Sheets.

# What's included in this example
This repository has the Google Apps Script file and the HTML "sidebar". It also has a sample of the CSV text template, which is pretty
straightforward.
