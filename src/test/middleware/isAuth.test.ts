// import { expect } from "chai";
// import * as express from "express";
// import sinon from "sinon";
// import jwt from "jsonwebtoken";

// import isAuthenticated from "../../middleware/isAuth";

// declare module "jsonwebtoken" {
//   export interface JwtPayload {
//     role: string;
//   }
// }

// describe("Auth Middleware", function () {
//   before(function () {});
//   it("should throw an error if no authorization header is present", function () {
//     const req = {
//       get: function () {
//         return null;
//       },
//     } as { get: () => null };
//     expect(
//       isAuthenticated.bind(
//         this,
//         req as unknown as express.Request,
//         {} as express.Response,
//         () => {}
//       )
//     ).to.throw("Not Authenticated!");
//   });

//   it("should throw an error if the authorization header is only one string", function () {
//     const req = {
//       get: function () {
//         return null;
//       },
//     } as { get: () => null };
//     expect(
//       isAuthenticated.bind(
//         this,
//         req as unknown as express.Request,
//         {} as express.Response,
//         () => {}
//       )
//     ).to.throw();
//   });

//   it("should throw an error if the token cannot be verified", function () {
//     const req = {
//       get: function () {
//         return "Bearer xyz";
//       },
//     };
//     expect(
//       isAuthenticated.bind(
//         this,
//         req as unknown as express.Request,
//         {} as express.Response,
//         () => {}
//       )
//     ).to.throw();
//   });

//   it("should yield a userId after decoding the token", function () {
//     const req = {
//       get: function () {
//         return "Bearer asdfasdasgd";
//       },
//     };
//     sinon.stub(jwt, "verify").callsFake(function foo() {
//       return { username: "abc" };
//     });
//     isAuthenticated(
//       req as unknown as express.Request,
//       {} as express.Response,
//       () => {}
//     );
//     expect(req as unknown as express.Request).to.have.property("username");
//     expect(req as unknown as express.Request).to.have.property(
//       "username",
//       "abc"
//     );
//   });
// });
