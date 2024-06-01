var expect  = require("chai").expect;
var request = require("request");
const { options } = require("../routes/routes");
let url = 'http://localhost:3000/api/cats';


describe("Add Two Numbers", function() {
    var url = "http://localhost:3000/addTwoNumbers/3/5";
    it("returns status 200 to check if api works", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done()
          });
    });
    it("returns statusCode key in body to check if api give right result should be 200", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body)
            expect(body.statusCode).to.equal(200);
            done()
          });
    });
    it("returns the result as number", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body)
            expect(body.result).to.be.a('number');
            done()
          });
    });
    it("returns the result equal to 8", function(done) {
      request(url, function(error, response, body) {
          body = JSON.parse(body)
          expect(body.result).to.equal(8);
          done()
        });
  });
  it("returns the result not equal to 15", function(done) {
    request(url, function(error, response, body) {
        body = JSON.parse(body)
        expect(body.result).to.not.equal(15);
        done()
      });
});
  });

  describe("Add Two strings", function() {
    var url = "http://localhost:3000/addTwoNumbers/a/b";
    it("should return status 200", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done()
          });
    });
    it("returns statusCode key in body to check if api gives right result should be 400", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body)
            expect(body.statusCode).to.equal(400);
            done()
          });
    });
    it("returns the result as null", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body)
            expect(body.result).to.be.a('null');
            done()
          });
    });
  });

  describe("Get cats", function() {
    var url = "http://localhost:3000/api/cats";
    it("should return status 200", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done()
          });
    });
    it("returns the result as array", function(done) {
        request(url, function(error, response, body) {
            //console.log("response-", response);
            body = JSON.parse(body)
            expect(body.data).to.be.a('array');
            done()
          });
    });
  });


  describe("Post cat", function() {
    var cat = {};
    cat.title = "Test title";
    cat.path = "Test path";
    cat.link = "Test link";
    cat.description = "Test description";

    var catTest2 = {};
    catTest2.title = "Test title2";
    catTest2.path = "Test path2";
    catTest2.link = "Test link2";
    catTest2.description = "Test description2";

    var url = "http://localhost:3000/api/cats";
    it("should return status 200", function(done) {
      var options = {
        json: true,
        body: cat
      };
      request.post(url, options, function(error, response, body) {
          expect(response.statusCode).to.equal(200);
          done()
        });
  });
    it("verify if the cat was added successfully", function(done) {
      var options = {
        json: true,
        body: catTest2
      };
    request.post(url, options, function(error, response, body) {
    expect(response.statusCode).to.equal(200);

    // Get all cats
    request(url, function(error, response, body) {
      body = JSON.parse(body)
      expect(body.data).to.be.a('array');
      //console.log("body-", body.data);
      var allCats = body.data;
      const foundCat = allCats.find(element => element.title === "Test title2");
      //console.log("Found cat= " + foundCat);
      expect(foundCat).not.to.be.null;
    });

  done()
  });
});
});