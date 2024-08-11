const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server.js");

chai.use(chaiHttp);

let Translator = require("../components/translator.js");
const openSpan = '<span class="highlight">';
const closeSpan = "</span>";

suite("Functional Tests", () => {
  test("POST valid request to /api/translate", function (done) {
    chai
      .request(server)
      .keepOpen()
      .post("/api/translate")
      .send({
        text: "Mangoes are my favorite fruit.",
        locale: "american-to-british",
      })
      .end(function (err, res) {
        assert.propertyVal(res.body, "text", "Mangoes are my favorite fruit.");
        assert.propertyVal(
          res.body,
          "translation",
          `Mangoes are my ${openSpan}favourite${closeSpan} fruit.`
        );
        done();
      });
  });
  test("POST invalid locale to /api/translate", function (done) {
    chai
      .request(server)
      .keepOpen()
      .post("/api/translate")
      .send({
        text: "Mangoes are my favorite fruit.",
        locale: "french-to-swedish",
      })
      .end(function (err, res) {
        assert.propertyVal(res.body, "error", "Invalid value for locale field");
        done();
      });
  });
  test("POST MISSING text field to /api/translate", function (done) {
    chai
      .request(server)
      .keepOpen()
      .post("/api/translate")
      .send({
        locale: "american-to-british",
      })
      .end(function (err, res) {
        assert.propertyVal(res.body, "error", "Required field(s) missing");
        done();
      });
  });
  test("POST MISSING locale field to /api/translate", function (done) {
    chai
      .request(server)
      .keepOpen()
      .post("/api/translate")
      .send({
        text: "Mangoes are my favorite fruit.",
      })
      .end(function (err, res) {
        assert.propertyVal(res.body, "error", "Required field(s) missing");
        done();
      });
  });
  test("POST EMPTY text to /api/translate", function (done) {
    chai
      .request(server)
      .keepOpen()
      .post("/api/translate")
      .send({
        text: "",
        locale: "american-to-british",
      })
      .end(function (err, res) {
        assert.propertyVal(res.body, "error", "No text to translate");
        done();
      });
  });
  test("POST no translation required to /api/translate", function (done) {
    chai
      .request(server)
      .keepOpen()
      .post("/api/translate")
      .send({
        text: "No translation required.",
        locale: "american-to-british",
      })
      .end(function (err, res) {
        assert.propertyVal(res.body, "text", "No translation required.");
        assert.propertyVal(
          res.body,
          "translation",
          "Everything looks good to me!"
        );
        done();
      });
  });
});
