const db = require('./database');

class Post {
  static getPosts(callback) {
    const query = `
      SELECT posts.id, posts.username, posts.content, posts.timestamp, posts.likes, users.profile_picture 
      FROM posts 
      JOIN users ON posts.username = users.username
      ORDER BY posts.timestamp DESC
    `;
    db.all(query, (err, rows) => {
      callback(err, rows);
    });
  }

  static createPost(username, content, callback) {
    db.run('INSERT INTO posts (username, content) VALUES (?, ?)', [username, content], function(err) {
      callback(err, this.lastID);
    });
  }

  static likePost(postId, callback) {
    db.run('UPDATE posts SET likes = likes + 1 WHERE id = ?', [postId], function(err) {
      callback(err);
    });
  }
}

module.exports = Post;