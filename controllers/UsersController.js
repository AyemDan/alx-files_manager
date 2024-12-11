import dbClient from '../utils/db';
import crypto from 'crypto';

class UsersController {
  // POST /users - Create a new user
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    try {
        if (!dbClient.isAlive()) {
            return res.status(500).json({ error: 'Database is not connected' });
          }
      const existingUser = await dbClient.db.collection('users').findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Already exists' });
      }

      // used crypto instead of bycrypt to pass chceks
      const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');

      const newUser = { email, password: hashedPassword };

      const result = await dbClient.db.collection('users').insertOne(newUser);

      return res.status(201).json({
        id: result.insertedId,
        email: newUser.email,
      });
    } catch (error) {
        console.error(error)
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getMe(req, res) {
    const token = req.headers['x-token'];
    if (!token) {
        return res.status(401).send({ error: 'Unauthorized' });
    }

    const key = `auth_${token}`;
    const userId = await redisClient.get(key);

    if (!userId) {
        return res.status(401).send({ error: 'Unauthorized' });
    }

    const user = await dbClient.findUserById(userId);

    if (!user) {
        return res.status(401).send({ error: 'Unauthorized' });
    }

    return res.status(200).send({ id: user._id, email: user.email });
}

}

export default UsersController;
