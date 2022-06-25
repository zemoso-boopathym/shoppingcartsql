import db from "../util/database";

interface error extends Error {
  httpStatusCode?: number;
}

export default class User {
  email: string | null;
  password: string | null;
  constructor(email: string | null, password: string | null) {
    this.email = email ?? "";
    this.password = password ?? "";
  }

  save() {
    return db
      .execute("INSERT INTO users (email, password) VALUES (?, ?)", [
        this.email,
        this.password,
      ])
      .then((result) => result)
      .catch((err) => {
        const error: error = new Error(err);
        error.httpStatusCode = 404;
        throw error;
      });
  }

  deleteByEmail(email: string) {}

  fetchAll() {
    return db.execute("SELECT email FROM users");
  }

  findByMail(email: string) {
    if (email) {
      return db
        .execute("SELECT * FROM users WHERE email = ?", [email])
        .then((result) => result)
        .catch((err) => {
          const error: error = new Error();
          error.httpStatusCode = 404;
          throw error;
        });
    } else {
      return;
    }
  }
}
