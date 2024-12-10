import dbClient from '../utils/db'; 
import redisClient from '../utils/redis';

class AppController {
    static async getStatus(request, response) {
        try {
            const redisAlive = await redisClient.isAlive();
            
            const dbAlive = await dbClient.isAlive();

            response.status(200).json({ redis: redisAlive, db: dbAlive });
        } catch (error) {
            response.status(500).json({ message: "Error checking status", error: error.message });
        }
    }

    static async getStats(request, response) {
        try {
            const usersNum = await dbClient.nbUsers();
            const filesNum = await dbClient.nbFiles();
            response.status(200).json({ users: usersNum, files: filesNum });
        } catch (error) {
            response.status(500).json({ message: "Error fetching stats", error: error.message });
        }
    }
}

export default AppController;
