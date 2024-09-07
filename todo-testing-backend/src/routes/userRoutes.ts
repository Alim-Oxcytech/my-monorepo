// src/routes/userRoutes.ts

import { Router, Request, Response } from 'express';
import { UserModel } from '../models/User';

const router = Router();

// Create a new user
router.post('/users', async (req: Request, res: Response) => {
  try {
    const { firstName,lastName, email, address } = req.body;
    const newUser = new UserModel({ firstName,lastName, email, address });
    await newUser.save();
    res.json({ message: 'User Added successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get all users
router.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get user by ID
router.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Update user by ID
router.patch('/users/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { firstName,lastName, email, address } = req.body;
    const updatedUser = await UserModel.findByIdAndUpdate(id, { firstName,lastName, email, address }, { new: true });
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json({ message: 'User Updated successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Delete user by ID
router.delete('/users/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
