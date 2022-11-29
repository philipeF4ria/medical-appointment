import { CreateUserController } from "./create-user.controller";

import { UserPrismaRepository } from "../../repositories/implementations/user.prisma.repository";
import { PasswordBcrypt } from "../../../../shared/encryption/implementations/password.bcrypt";

const userPrismaRepository = new UserPrismaRepository();
const passwordEncryption = new PasswordBcrypt();

const createUserController = new CreateUserController(userPrismaRepository, passwordEncryption);

export { createUserController }
