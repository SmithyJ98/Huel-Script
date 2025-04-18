const { chromium } = require("playwright");

(async () => {
  // Launch a headless browser
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Navigate to the Huel website
    await page.goto("https://uk.huel.com/");

    // Accept cookies if the banner is present
    const cookieBanner = page.locator("#onetrust-accept-btn-handler");
    if (await cookieBanner.isVisible()) {
      await cookieBanner.click();
      // Wait for the cookie banner and overlay to disappear
      await page.waitForSelector("#onetrust-consent-sdk", { state: "hidden" });
      await page.waitForSelector(".onetrust-pc-dark-filter", {
        state: "hidden",
      }); // Wait for overlay to disappear
    }

    // Close any modal popups if present
    const modalOverlay = page.locator('div[class*="Modal_Modal__overlay"]');
    const modalCloseButton = page.locator('button:has-text("Close")');
    if (
      (await modalOverlay.isVisible()) &&
      (await modalCloseButton.isVisible())
    ) {
      await modalCloseButton.click();
      // Wait for the modal overlay to disappear
      await page.waitForSelector('div[class*="Modal_Modal__overlay"]', {
        state: "hidden",
      });
    }

    // Click on the "Take the quiz" link
    await page
      .locator("#main div")
      .filter({ hasText: /^Take the quiz$/ })
      .getByRole("link")
      .click();

    // Wait for the quiz page to load and interact with the quiz questions
    await page.getByRole("button", { name: "Get started" }).click();

    //Question 1 Random Answer

    const question1Answers = [
      "Eat healthier",
      "Lose weight",
      "Gain Weight",
      "Fitness goals",
      "Save time",
      "Save money",
      "Be more sustainable",
    ];

    await answerMultipleChoiceQuestion(page, question1Answers);

    //Question 2 Random Answer

    const question2Answers = [
      "Breakfast",
      "Lunch",
      "Dinner",
      "Snack",
      "Supplement",
    ];

    await answerMultipleChoiceQuestion(page, question2Answers);

    //Question 3 Random Answer

    const question3Answers = ["Sweet", "Savoury", "I’m not picky"];

    await answerSingleChoiceQuestion(page, question3Answers);

    //Question 4 Random Answer

    const question4Answers = [
      "Flexible portions",
      "Something to chew",
      "Eating on the go",
      "Something refreshing",
      "I'm not picky",
    ];

    await answerSingleChoiceQuestion(page, question4Answers);

    // Locate and click the 'No thanks, show me the results.' link
    await page
      .getByRole("button", { name: "No thanks, show me the results" })
      .click();

    // Verify the results page by checking for the presence of the main results container
    const resultsPageSelector = "div.ResultsView_ResultsView__main__uF_fY"; // Selector for the results page container
    const isResultsPageVisible = await page.waitForSelector(
      resultsPageSelector,
      { state: "visible" }
    );

    if (isResultsPageVisible) {
      console.log("Results page verified successfully.");
    } else {
      console.error("Results page did not load.");
      throw new Error("Failed to load the results page.");
    }

    // Selector for product names
    const productNameSelector =
      "h2.Heading_Heading__IeLQ3.Heading_Heading--is-h5__Ryfq9.Heading_Heading--no-margin-bottom__EV08w";

    // Wait for the product headings to be visible
    await page.waitForSelector(productNameSelector, { state: "visible" });

    // Get all product headings
    const productHeadings = await page.$$(productNameSelector);

    // Count the number of products
    const productCount = productHeadings.length;
    console.log(`Number of products found: ${productCount}`);

    // Extract and log the names of the products
    if (productCount > 0) {
      console.log("Product names:");
      for (let i = 0; i < productHeadings.length; i++) {
        const productName = await productHeadings[i].textContent();
        if (i === 0) {
          console.log(`- Main recommendation: ${productName.trim()}`);
        } else {
          console.log(`- ${productName.trim()}`);
        }
      }
    } else {
      console.error("No products found.");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    // Close the browser
    await browser.close();
    console.log("Run complete");
  }
})();

// Reusable function to handle multiple choice quiz questions
async function answerMultipleChoiceQuestion(page, answers) {
  // Randomize how many answers to pick (between 1 and the total number of answers)
  const numberOfAnswersToPick = Math.floor(Math.random() * answers.length) + 1;

  // Shuffle the answers array and pick the first `numberOfAnswersToPick` answers
  const shuffledAnswers = answers.sort(() => 0.5 - Math.random());
  const selectedAnswers = shuffledAnswers.slice(0, numberOfAnswersToPick);
  console.log("Selected answers:", selectedAnswers);

  // Click each selected answer
  for (const answer of selectedAnswers) {
    await page.getByText(answer).click();
  }

  // Click the "Continue" button
  await page.getByRole("button", { name: "Continue" }).click();
}

// Reusable function to handle single-choice quiz questions
async function answerSingleChoiceQuestion(page, answers) {
  // Randomly select one answer
  const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
  console.log("Selected answer:", randomAnswer);

  // Click the selected answer
  await page.getByText(randomAnswer).click();
}
