const chai = require("chai");
const assert = chai.assert;

const Translator = require("../components/translator.js");
const translator = new Translator();
const openSpan = '<span class="highlight">';
const closeSpan = "</span>";

suite("Unit Tests", () => {
  // American to British
  test("Mangoes are my favorite fruit.", function () {
    const text = "Mangoes are my favorite fruit.";
    const locale = "american-to-british";
    let translation = translator.translate(text, locale);
    assert.equal(translation.rawTranslation, `Mangoes are my favourite fruit.`);
  });
  test("I ate yogurt for breakfast.", function () {
    const text = "I ate yogurt for breakfast.";
    const locale = "american-to-british";
    let translation = translator.translate(text, locale);
    assert.equal(translation.rawTranslation, `I ate yoghurt for breakfast.`);
  });
  test("We had a party at my friend's condo.", function () {
    const text = "We had a party at my friend's condo.";
    const locale = "american-to-british";
    let translation = translator.translate(text, locale);
    assert.equal(
      translation.rawTranslation,
      `We had a party at my friend's flat.`
    );
  });
  test("Can you toss this in the trashcan for me?", function () {
    const text = "Can you toss this in the trashcan for me?";
    const locale = "american-to-british";
    let translation = translator.translate(text, locale);
    assert.equal(
      translation.rawTranslation,
      `Can you toss this in the bin for me?`
    );
  });
  test("The parking lot was full.", function () {
    const text = "The parking lot was full.";
    const locale = "american-to-british";
    let translation = translator.translate(text, locale);
    assert.equal(translation.rawTranslation, `The car park was full.`);
  });
  test("Like a high tech Rube Goldberg machine.", function () {
    const text = "Like a high tech Rube Goldberg machine.";
    const locale = "american-to-british";
    let translation = translator.translate(text, locale);
    assert.equal(
      translation.rawTranslation,
      `Like a high tech Heath Robinson device.`
    );
  });
  test("To play hooky means to skip class or work.", function () {
    const text = "To play hooky means to skip class or work.";
    const locale = "american-to-british";
    let translation = translator.translate(text, locale);
    assert.equal(
      translation.rawTranslation,
      `To bunk off means to skip class or work.`
    );
  });
  test("No Mr. Bond, I expect you to die.", function () {
    const text = "No Mr. Bond, I expect you to die.";
    const locale = "american-to-british";
    let translation = translator.translate(text, locale);
    assert.equal(
      translation.rawTranslation,
      `No Mr Bond, I expect you to die.`
    );
  });
  test("Dr. Grosh will see you now.", function () {
    const text = "Dr. Grosh will see you now.";
    const locale = "american-to-british";
    let translation = translator.translate(text, locale);
    assert.equal(translation.rawTranslation, `Dr Grosh will see you now.`);
  });
  test("Lunch is at 12:15 today.", function () {
    const text = "Lunch is at 12:15 today.";
    const locale = "american-to-british";
    let translation = translator.translate(text, locale);
    assert.equal(translation.rawTranslation, `Lunch is at 12.15 today.`);
  });
  // British to American
  test("We watched the footie match for a while.", function () {
    const text = "We watched the footie match for a while.";
    const locale = "british-to-american";
    let translation = translator.translate(text, locale);
    assert.equal(
      translation.rawTranslation,
      `We watched the soccer match for a while.`
    );
  });
  test("Paracetamol takes up to an hour to work.", function () {
    const text = "Paracetamol takes up to an hour to work.";
    const locale = "british-to-american";
    let translation = translator.translate(text, locale);
    assert.equal(
      translation.rawTranslation,
      `Tylenol takes up to an hour to work.`
    );
  });
  test("First, caramelise the onions.", function () {
    const text = "First, caramelise the onions.";
    const locale = "british-to-american";
    let translation = translator.translate(text, locale);
    assert.equal(translation.rawTranslation, `First, caramelize the onions.`);
  });
  test("I spent the bank holiday at the funfair.", function () {
    const text = "I spent the bank holiday at the funfair.";
    const locale = "british-to-american";
    let translation = translator.translate(text, locale);
    assert.equal(
      translation.rawTranslation,
      `I spent the public holiday at the carnival.`
    );
  });
  test("I had a bicky then went to the chippy.", function () {
    const text = "I had a bicky then went to the chippy.";
    const locale = "british-to-american";
    let translation = translator.translate(text, locale);
    assert.equal(
      translation.rawTranslation,
      `I had a cookie then went to the fish-and-chip shop.`
    );
  });
  test("I've just got bits and bobs in my bum bag.", function () {
    const text = "I've just got bits and bobs in my bum bag.";
    const locale = "british-to-american";
    let translation = translator.translate(text, locale);
    assert.equal(
      translation.rawTranslation,
      `I've just got odds and ends in my fanny pack.`
    );
  });
  test("The car boot sale at Boxted Airfield was called off.", function () {
    const text = "The car boot sale at Boxted Airfield was called off.";
    const locale = "british-to-american";
    let translation = translator.translate(text, locale);
    assert.equal(
      translation.rawTranslation,
      `The swap meet at Boxted Airfield was called off.`
    );
  });
  test("Have you met Mrs Kalyani?", function () {
    const text = "Have you met Mrs Kalyani?";
    const locale = "british-to-american";
    let translation = translator.translate(text, locale);
    assert.equal(translation.rawTranslation, `Have you met Mrs. Kalyani?`);
  });
  test("Prof Joyner of King's College, London.", function () {
    const text = "Prof Joyner of King's College, London.";
    const locale = "british-to-american";
    let translation = translator.translate(text, locale);
    assert.equal(
      translation.rawTranslation,
      `Prof. Joyner of King's College, London.`
    );
  });
  test("Tea time is usually around 4 or 4.30.", function () {
    const text = "Tea time is usually around 4 or 4.30.";
    const locale = "british-to-american";
    let translation = translator.translate(text, locale);
    assert.equal(
      translation.rawTranslation,
      `Tea time is usually around 4 or 4:30.`
    );
  });
  test("HIGHLIGHT: Mangoes are my favorite fruit.", function () {
    const text = "Mangoes are my favorite fruit.";
    const locale = "american-to-british";
    let translation = translator.translate(text, locale);
    assert.equal(
      translation.translationWithHighlights,
      `Mangoes are my ${openSpan}favourite${closeSpan} fruit.`
    );
  });
  test("HIGHLIGHT: I ate yogurt for breakfast.", function () {
    const text = "I ate yogurt for breakfast.";
    const locale = "american-to-british";
    let translation = translator.translate(text, locale);
    assert.equal(
      translation.translationWithHighlights,
      `I ate ${openSpan}yoghurt${closeSpan} for breakfast.`
    );
  });
  test("HIGHLIGHT: We watched the footie match for a while.", function () {
    const text = "We watched the footie match for a while.";
    const locale = "britsh-to-american";
    let translation = translator.translate(text, locale);
    assert.equal(
      translation.translationWithHighlights,
      `We watched the ${openSpan}soccer${closeSpan} match for a while.`
    );
  });
  test("HIGHLIGHT: Paracetamol takes up to an hour to work.", function () {
    const text = "Paracetamol takes up to an hour to work.";
    const locale = "britsh-to-american";
    let translation = translator.translate(text, locale);
    assert.equal(
      translation.translationWithHighlights,
      `${openSpan}Tylenol${closeSpan} takes up to an hour to work.`
    );
  });
});
