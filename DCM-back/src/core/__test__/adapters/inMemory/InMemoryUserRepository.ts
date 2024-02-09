import { UpdateUserProps } from "@src/core/usecase/user/UpdateUser";
import { User } from "../../../domain/entities/user/User";
import { UserRepository } from "../../../domain/repositories/UserRepository";

export class InMemoryUserRepository implements UserRepository {

    constructor(readonly userMap: Map < string, User > ){
    }
    async update(payload: UpdateUserProps): Promise<void> {
        const { id, ...updateData } = payload;
        const userToUpdate = this.userMap.get(id);

        if (!userToUpdate) {
            return null;
        }
        return
    }

    async getById(id: string): Promise<User> {
            const user: User = this.userMap.get(id)
            if (!user) {
                return null;
              }
            return user;
    }

    async save(user: User): Promise<User> {
        this.userMap.set(user.props.id, user);
        return user;
    }

    async getByEmail(email: string): Promise<User> {
            for (let [id, user] of this.userMap){
                if (user.props.email === email){
                    return this.userMap.get(id);
                }
            }
            return null;
        }

    async delete(id: string): Promise<boolean> {
        return this.userMap.delete(id);
        }
    }

