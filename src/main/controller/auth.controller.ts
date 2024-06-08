import { Request, Response } from 'express';
import { userService } from '../../presentation/auth/user.service'

export class AuthController {
  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;
    try {
      const user = await userService.createUser(name, email, password);
      const token = userService.generateToken(user);
      return res.status(201).json({ user: { name: user.name, email: user.email }, token });
    } catch (error) {
      return res.status(500).json({ message: 'Error creating user', error });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await userService.validateUser(email, password);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = userService.generateToken(user);
      return res.status(200).json({ token, user: { name: user.name, email: user.email } });
    } catch (error) {
      return res.status(500).json({ message: 'Error during login', error });
    }
  }
}
