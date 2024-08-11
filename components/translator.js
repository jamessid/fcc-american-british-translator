const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

// capitalise first letter of word string.
function capitalise(string) {
  let capital = string[0].toUpperCase();
  return capital + string.slice(1, string.length + 1);
}

function convertAmericanToBritishTime(time) {
  const convertedTime = time.replace(":", ".");
  return convertedTime;
}

function convertBritishToAmericanTime(time) {
  const convertedTime = time.replace(".", ":");
  return convertedTime;
}

class Translator {
  translate(text, locale) {
    // set translation string to equal text.
    let rawTranslation = text;
    let translationWithHighlights = text; // this will include highlights

    const spellings = americanToBritishSpelling;
    const titles = americanToBritishTitles;

    // array to hold "detected" phrases, which we will eventually loop through to make translation.
    // each entry will be { regex: appropriate regex for detected phrase, translation: "translation"}
    // this will mean that we don't translate any phrases in previously translated phrases.
    // e.g. "chippy" translates to "fish-and-chip shop"...
    // ...then "chip shop" translates to "fish-and-chip shop"
    const phrasesToTranslate = [];

    // AMERICAN TO BRITISH
    if (locale == "american-to-british") {
      // 1) American to British Words
      for (let word in americanOnly) {
        // using word boundaries
        const amerOnlyRegex = new RegExp(String.raw`\b${word}\b`, "ig");

        if (text.search(amerOnlyRegex) != -1) {
          phrasesToTranslate.push({
            regex: amerOnlyRegex,
            translation: americanOnly[word],
          });
        }
      }

      // 2) American to British Spellings
      for (let word in spellings) {
        // using word boundaries
        const amerSpellingsRegex = new RegExp(String.raw`\b${word}\b`, "ig");
        if (text.search(amerSpellingsRegex) != -1) {
          phrasesToTranslate.push({
            regex: amerSpellingsRegex,
            translation: spellings[word],
          });
        }
      }

      // 3) American to British titles
      for (let title in titles) {
        const escapedTitle = title.replace(".", "\\.");
        const amerTitleRegex = new RegExp(String.raw`\b${escapedTitle}`, "ig");
        if (text.search(amerTitleRegex) != -1) {
          phrasesToTranslate.push({
            regex: amerTitleRegex,
            translation: capitalise(titles[title]),
          });
        }
      }

      // 4) Convert times
      const amerTimeRegex = /\b\d{1,2}:\d\d\b/g;
      const amerTimeMatches = text.match(amerTimeRegex);
      if (amerTimeMatches) {
        for (let time of amerTimeMatches) {
          phrasesToTranslate.push({
            // only translate times at word boundaries
            regex: new RegExp(String.raw`\b${time}\b`, "g"),
            translation: convertAmericanToBritishTime(time),
          });
        }
      }
    } else if ((locale = "british-to-american")) {
      // 1) British to American Words
      for (let word in britishOnly) {
        // using word boundaries
        const britishOnlyRegex = new RegExp(String.raw`\b${word}\b`, "ig");

        if (text.search(britishOnlyRegex) != -1) {
          phrasesToTranslate.push({
            regex: britishOnlyRegex,
            translation: britishOnly[word],
          });
        }
      }

      // 2) British to American Spelling
      for (let word in spellings) {
        // using word boundaries
        const britishSpellingsRegex = new RegExp(
          String.raw`\b${spellings[word]}\b`,
          "ig"
        );

        if (text.search(britishSpellingsRegex) != -1) {
          phrasesToTranslate.push({
            regex: britishSpellingsRegex,
            translation: word,
          });
        }
      }

      // 3) British to American titles
      for (let title in titles) {
        // const escapedTitle = title.replace(".", "\\.");
        const britishTitleRegex = new RegExp(
          String.raw`\b${titles[title]}\b`,
          "ig"
        );

        if (text.search(britishTitleRegex) != -1) {
          phrasesToTranslate.push({
            regex: britishTitleRegex,
            translation: capitalise(title),
          });
        }
      }
      // 4) Convert times
      const britishTimeRegex = /\b\d{1,2}.\d\d\b/g;
      const britishTimeMatches = text.match(britishTimeRegex);
      if (britishTimeMatches) {
        for (let time of britishTimeMatches) {
          phrasesToTranslate.push({
            // only translate times at word boundaries
            regex: new RegExp(String.raw`\b${time}\b`, "g"),
            translation: convertBritishToAmericanTime(time),
          });
        }
      }
    }

    const openSpan = '<span class="highlight">';
    const closeSpan = "</span>";

    if (phrasesToTranslate.length > 0) {
      for (let phrase of phrasesToTranslate) {
        rawTranslation = rawTranslation.replace(
          phrase.regex,
          phrase.translation
        );
        translationWithHighlights = translationWithHighlights.replace(
          phrase.regex,
          `${openSpan}${phrase.translation}${closeSpan}`
        );
      }
    } else {
      rawTranslation = "Everything looks good to me!";
      translationWithHighlights = "Everything looks good to me!";
    }

    return {
      text: text,
      rawTranslation: rawTranslation,
      translationWithHighlights: translationWithHighlights,
    };
  }
}

module.exports = Translator;
