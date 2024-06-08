import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userRepository } from "../../infra/mongodb/repositories/user.repositores";

class UserService {
  async createUser(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return userRepository.create({ name, email, password: hashedPassword });
  }

  async validateUser(email: string, password: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? user : null;
  }

  generateToken(user: { id: string }) {
    return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  }
}

export const userService = new UserService();
