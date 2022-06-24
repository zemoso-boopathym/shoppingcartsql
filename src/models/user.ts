import db from "../util/database";

export default class User {
  email: string | null;
  password: string | null;
  constructor(email: string | null, password: string | null) {
    this.email = email ?? "";
    this.password = password ?? "";
  }

  save() {
    return db.execute("INSERT INTO users (email, password) VALUES (?, ?)", [
      this.email,
      this.password,
    ]);
  }

  deleteByEmail(email: string) {}

  fetchAll() {
    return db.execute("SELECT email FROM users");
  }

  findByMail(email: string) {
    return db.execute("SELECT * FROM users WHERE email = ?", [email]);
  }
}
