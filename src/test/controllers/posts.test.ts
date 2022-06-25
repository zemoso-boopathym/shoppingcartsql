import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../app";

chai.should();
chai.use(chaiHttp);

describe("Posts API", () => {
  describe("GET /getPosts", () => {
    it("it should successfully login and get logged in user posts", (done) => {
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

          chai
            .request(app)
            .get("/post/getPosts")
            .auth(token, { type: "bearer" })
            .send({ username: username })
            .end((_, response) => {
              response.should.have.status(200);
              done();
            });
        });
    });
  });

  describe("GET /createPost", () => {
    it("it should get the createPost page", (done) => {
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

          chai
            .request(app)
            .get("/post/createPost")
            .auth(token, { type: "bearer" })
            .send({ username: username })
            .end((_, response) => {
              response.should.have.status(200);
              done();
            });
          //   done();
        });
    });
  });

  describe("POST /createPost", () => {
    it("it should create the post by the logged in user", (done) => {
      const testUser = {
        email: "test@test.com",
        password: "test123",
      };
      const testPost = {
        title: "Sample Test Title",
        description: "Sample Test Description",
      };
      chai
        .request(app)
        .post("/login")
        .send(testUser)
        .end((req, res) => {
          res.should.have.status(200);
          res.body.should.have.property("token");
          const { token, username } = res.body;

          chai
            .request(app)
            .post("/post/createPost")
            .auth(token, { type: "bearer" })
            .send({ ...testPost, username: username })
            .end((_, response) => {
              response.should.have.status(200);
              done();
            });
        });
    });
  });

  describe("GET /getAllPosts", () => {
    it("it should get all posts from all user for the logged in admin user", (done) => {
      const testUser = {
        email: "admin@admin.com",
        password: "admin123",
      };
      const testPost = {
        title: "Sample Test Title",
        description: "Sample Test Description",
      };
      chai
        .request(app)
        .post("/login")
        .send(testUser)
        .end((req, res) => {
          res.should.have.status(200);
          res.body.should.have.property("token");
          const { token, username } = res.body;

          chai
            .request(app)
            .get("/post/getAllPosts")
            .auth(token, { type: "bearer" })
            .send({ ...testPost, username: username })
            .end((_, response) => {
              response.should.have.status(200);
              done();
            });
        });
    });
  });

  describe("DELETE /deletePost", () => {
    it("it should delete the post selected by the user", (done) => {
      const testUser = {
        email: "admin@admin.com",
        password: "admin123",
      };
      const testPost = {
        title: "Sample Test Title",
        description: "Sample Test Description",
      };
      chai
        .request(app)
        .post("/login")
        .send(testUser)
        .end((req, res) => {
          res.should.have.status(200);
          res.body.should.have.property("token");
          const { token, username } = res.body;

          chai
            .request(app)
            .get("/post/getAllPosts")
            .auth(token, { type: "bearer" })
            .send({ ...testPost, username: username })
            .end((_, response) => {
              response.should.have.status(200);

              const posts = response.body.posts;
              const sampleID = posts[posts.length - 1].id;

              chai
                .request(app)
                .delete("/post/deletePost")
                .auth(token, { type: "bearer" })
                .send({ id: sampleID, username: username })
                .end((_, resp) => {
                  resp.should.have.status(200);
                  done();
                });
            });
        });
    });
  });
});
