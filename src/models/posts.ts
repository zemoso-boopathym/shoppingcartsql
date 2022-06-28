import db from "../util/database";

export default class Post {
  title: string;
  description: string;
  createdAt: Date;
  email: string;
  constructor(
    title: string = "",
    description: string = "",
    createdAt: Date = new Date(),
    email: string = ""
  ) {
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
    this.email = email;
  }

  save() {
    return db.execute(
      "INSERT INTO posts (title, description, createdAt, email) VALUES (?, ?, ?, ?)",
      [this.title, this.description, this.createdAt, this.email]
    );
  }

  deleteByID(id: string) {
    return db.execute("DELETE FROM posts WHERE id = ?", [id]);
  }

  adminFetchAll() {
    return db.execute("SELECT * FROM posts");
  }

  fetchAllByMail(email: string) {
    return db.execute("SELECT * FROM posts WHERE email = ?", [email]);
  }
}
