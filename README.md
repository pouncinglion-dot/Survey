# The Christmas Story — Survey

A static survey page: every visitor answers 1 fixed question plus 4 random
questions drawn from a bank (currently 37, add more any time). Answers are
recorded to a Google Sheet, and after submitting, the visitor sees a results
page reviewing their 4 scored questions (correct answers circled green,
wrong picks circled red) plus a final score and a congratulatory message.

## 1. Create the Google Sheet + Apps Script backend

1. Go to [sheets.google.com](https://sheets.google.com) and create a new blank sheet. Name it something like "Christmas Story Survey Responses".
2. In the sheet, go to **Extensions > Apps Script**.
3. Delete any placeholder code and paste in the contents of [`google-apps-script/Code.gs`](google-apps-script/Code.gs).
4. Click **Save** (disk icon), then **Deploy > New deployment**.
5. Click the gear icon next to "Select type" and choose **Web app**.
6. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
7. Click **Deploy**. The first time, Google will ask you to authorize the script — approve it (it's your own script, this is expected).
8. Copy the **Web app URL** it gives you (ends in `/exec`).

## 2. Point the page at your Apps Script URL

Open [`app.js`](app.js) and replace the placeholder at the top:

```js
const APPS_SCRIPT_URL = "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";
```

with the `/exec` URL you copied.

## 3. Host it on GitHub Pages

1. Create a new GitHub repo (public or private both work for Pages, though private repos need GitHub Pro/Team/Enterprise to publish Pages).
2. Push these files (`index.html`, `style.css`, `app.js`, `questions.js`) to the repo's default branch.
3. In the repo, go to **Settings > Pages**.
4. Under "Build and deployment", set **Source** to "Deploy from a branch", pick your branch and `/ (root)`, then **Save**.
5. GitHub will give you a URL like `https://<username>.github.io/<repo>/` within a minute or two.

## 4. Test it

Open the Pages URL, answer all 5 questions, and submit. Check the Google
Sheet — a new tab called **Responses** should have one row per question
(5 rows per submission), all sharing the same "Submission ID" so you can
group them with a pivot table or `COUNTIF`.

Reload the page a few times before submitting — you should see a different
set of 4 random questions from the bank each time (the static "rate your
Bible knowledge" question always comes first).

## Passing Group / Date / City-Country via the URL

The page reads three optional query string parameters and records them
alongside every answer in the sheet: `Group`, `Date`, and `City-Country`.
Share links like:

```
https://<username>.github.io/<repo>/?Group=TeamA&Date=2025-12-24&City-Country=Nashville-USA
```

Any parameter that's left off the URL is just recorded as blank — none of
them are required. Parameter names are matched case-insensitively, so
`?group=TeamA` works the same as `?Group=TeamA`.

If your Google Sheet's **Responses** tab already has data from before this
was added, the header row won't update automatically (the script only
writes headers to a brand-new empty sheet). Either manually insert `Group`,
`Date`, `City-Country` columns after "Submission ID" in the existing sheet,
or rename/delete the old tab and let the script recreate it on the next
submission.

## Group scorecard pages (e.g. Lincoln Berean Church)

`lbc.html` is a live scorecard for responses tagged `Group=LBC`. It fetches
aggregate stats from the Apps Script (`GET ?group=LBC`) each time it's
opened — totals, score spread, per-question results — never individual
answers, free text, ages or locations. For another group, copy `lbc.html`
and change the `data-group`, `data-name` and `data-quiz-query` attributes
on `<body>` (and the title/heading).

Share the quiz with that group using
`?Group=LBC&City-Country=Lincoln-USA`, and the scorecard link is just
`.../lbc.html`. After pasting the updated `Code.gs`, redeploy the Apps
Script (new version) or the scorecard will show "couldn't load results".

## Growing the question bank past 37

Open [`questions.js`](questions.js) and add more objects to the
`QUESTION_BANK` array, following the same shape as the existing entries.
Nothing else needs to change — the page always pulls 4 at random from
whatever is in that array.

## Notes

- Answers aren't graded live while the user is taking the quiz, but the
  results page shown right after submitting reveals correct/incorrect for
  the 4 bank questions (green circle = correct answer, red circle = a wrong
  pick), plus a final score out of 4 and a message that scales with how well
  they did. The sheet also records `Correct Answer` and `Is Correct` per row
  so you have the same data for your own analysis.
- The static scale question ("rate your knowledge of the Bible") is recorded
  but always has a blank `Is Correct` and is excluded from both the on-page
  results review and the score — it isn't meant to be scored.
- If you ever need to see the raw JSON payload posted from the browser, open
  the Google Sheet's Apps Script project, go to **Executions**, and inspect
  a recent `doPost` run.
