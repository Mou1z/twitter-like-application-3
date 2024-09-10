const db = require('./database');

class User {
  static findUser(username, callback) {
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
      callback(err, row);
    });
  }

  static createUser(username, password, callback) {
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], function(err) {
      callback(err, this.lastID);
    });
  }

  static updateUser(id, username, password, profilePicture, callback) {
    let query = 'UPDATE users SET username = ?, profile_picture = ? WHERE id = ?';
    const params = [username, profilePicture, id];

    if (password) {
      query = 'UPDATE users SET username = ?, password = ?, profile_picture = ? WHERE id = ?';
      params.splice(1, 0, password);
    }

    db.run(query, params, (err) => {
      callback(err);
    });
  }
}

module.exports = User;