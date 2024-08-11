"use strict";

const Translator = require("../components/translator.js");

module.exports = function (app) {
  const translator = new Translator();

  app.route("/api/translate").post((req, res) => {
    // test to ensure that required fields are present
    if (
      !Object.hasOwn(req.body, "text") ||
      !Object.hasOwn(req.body, "locale")
    ) {
      res.json({ error: "Required field(s) missing" });
      return;
    }

    const text = req.body.text;
    const locale = req.body.locale;

    // text is empty string, so no text to translate
    if (!text) {
      res.json({ error: "No text to translate" });
      return;
    }

    // ensure locale valid
    if (locale != "american-to-british" && locale != "british-to-american") {
      res.json({ error: "Invalid value for locale field" });
      return;
    }

    // get translation and return version with highlights
    const translation = translator.translate(text, locale);
    res.json({
      text: text,
      translation: translation.translationWithHighlights,
    });
  });
};
