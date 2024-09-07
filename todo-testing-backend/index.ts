
// Import the express in typescript file
import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './src/db';
import userRoutes from './src/routes/userRoutes';
// Initialize the express engine
const app: express.Application = express();
 
// Take a port 3000 for running server.
const PORT =process.env.PORT || 3001;
 
app.use(express.json());
connectToDatabase();
app.use(cors());
app.use('/api', userRoutes);
 
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });