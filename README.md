# Huel-Script

Technical Task provided by Huel to automate the completion of the survey on their site.

![image](https://github.com/user-attachments/assets/01d9a2fc-9925-4ae1-91fd-84bec0b3e62e)

# Requirements

- Write an automation script using any framework of your choice that simulates navigating the Huel
  homepage to take the quiz and validate results.
- The script should:
  - Launch a headless browser (Chrome, Chromium, or Firefox)
  - Navigate to the Huel homepage (https://uk.huel.com/)
  - Locate and click the 'Take the Quiz' button on the homepage.
  - Answer the quiz questions by interacting with the available options.
  - At the end of the quiz, locate and click the hyperlink 'No thanks, show me the results.'.
- Verify that a response is received after clicking the link, indicating the quiz results are displayed or a
  relevant action has occurred.
- Validate that at least one Huel product is shown in the results.

- Enhance the script to handle potential errors (e.g.button not found, quiz loading issues, results not
  displayed).
- Add comments to the script explaining each step for better readability.

# How to use

1️⃣ Clone this repo:

```bash

git clone https://github.com/SmithyJ98/Huel-Script
cd project-name

```

2️⃣ Install dependencies:

```bash

npm install

```

3️⃣ Run the script:

```bash

node script.js

```

# Approach Explanation

This script automates the process of interacting with the Huel website using Playwright. I decided upon using Playwright over other options such as Selenium or Puppeteer as this is something I had experience with when on my School of Code bootcamp in our testing week, where we primarily used it for end to end testing of our full stack applications. It navigates to the site, handles cookie banners and modal popups, and completes a quiz by randomly selecting answers for both the multiple choice and single choice questions. I decided upon doing the randomisation of the answers to ensure that the script was working for all of the options you could choose, as well as confirming that it was receiving different product suggestions at the end, giving it more of a practical application for testing than using the same answers every time. After completing the quiz, it skips additional steps to view the results, verifies the results page has loaded, and extracts product recommendations.

My approach to this task was to first use Playwright's codegen feature to run through the process manually and use its pick locator so I could identify the correct selectors for each element I needed to interact with. This allowed me to quickly generate a baseline script that I could then refine and expand upon. I then broke the process down into individual steps that i could focus on and work through to ensure each part was working as intended before I moved on: navigating to the Huel website, handling cookie banners and modal popups, interacting with the quiz by answering the multiple choice and single choice questions, viewing and verifying the results page, and extracting and logging product recommendations.

I decided upon leaving the logs in the code as you can't actually see anything happening when the script runs as it opens a headless browser, so this helps give a visual representation of the process as it flows. Another decision I made was to assign my single use selectors to variables for the purpose of clarity when reading through this task, in a real practical scenario I would have put these selector inline into their relevant method calls to simplify the code.

# Challenges

- Getting past the cookies pop up was a challenge to start with due to the delayed animation of it closing, so added a wait to the code to not continue until both the cookies banner and the dark-filter over the website was hidden before progressing.
- The different use of characters in the "I'm not picky" and "I’m not picky" of question 3 and 4 took me a while to notice.

# Further improvements

- Not hardcoding answers into the script and instead either pulling them directly from the website or clicking into a random amount of the answer containers which would likely all be the same.
