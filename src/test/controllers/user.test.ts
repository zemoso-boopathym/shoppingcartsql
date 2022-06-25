import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../app";
import { config } from "../../util/config";

chai.should();
chai.use(chaiHttp);

describe("Users API", () => {
  /* Login page GET route */
  describe("GET /login", () => {
    it("it should get the login page", (done) => {
      chai
        .request(app)
        .get("/login")
        .end((req, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe("GET /signup", () => {
    it("it should get the signup page", (done) => {
      chai
        .request(app)
        .get("/signup")
        .end((req, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe("GET /getallusers", () => {
    it("it should get throw an error when without authorization", (done) => {
      chai
        .request(app)
        .get("/getallusers")
        .end((req, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe("POST /login", () => {
    it("it should successfully login on posting valid user credentials", (done) => {
      const testUser = {
        email: "test@test.com",
        password: "test123",
      };
      chai
        .request(app)
        .post("/login")
        .send(testUser)
        .end((req, res) => {
          res.should.have.status(200);
          res.body.should.have.property("token");
          const { token, username } = res.body;
          done();
        });
    });

    it("it should throw an error with wrong user credentials", (done) => {
      const testUser = {
        email: "new@new",
        password: "1234",
      };
      chai
        .request(app)
        .post("/login")
        .send(testUser)
        .end((req, res) => {
          res.should.have.status(500);
          done();
        });
    });

    it("it should throw an error with empty user credentials", (done) => {
      const testUser = {};
      chai
        .request(app)
        .post("/login")
        .send(testUser)
        .end((req, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });

  describe("POST /signup", () => {
    // it("it should successfully register and post valid success message", (done) => {
    //   const timeStamp = new Date().getTime();
    //   const testUser = {
    //     email: `test${timeStamp}@test.com`,
    //     password: "test123",
    //   };
    //   chai
    //     .request(app)
    //     .post("/signup")
    //     .send(testUser)
    //     .end((req, res) => {
    //       res.should.have.status(201);
    //       done();
    //     });
    // });

    it("it should throw an error with invalid user credentials", (done) => {
      const testUser = {
        email: "",
        password: "",
      };
      chai
        .request(app)
        .post("/signup")
        .send(testUser)
        .end((req, res) => {
          res.should.have.status(403);
          done();
        });
    });
  });

  describe("GET /getallusers", () => {
    it("it should return all the registered users", (done) => {
      const token = "some_secret";
      chai
        .request(app)
        .get("/getallusers")
        .set({ Authorization: `Bearer ${token}` })
        .end((req, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe("POST /logout", () => {
    it("it should logout the user from application", (done) => {
      chai
        .request(app)
        .post("/logout")
        .end((req, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
