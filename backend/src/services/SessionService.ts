import User from "../entities/user";

export interface KVStore {
  hGet: (field: string, key: string) => Promise<string | undefined>;
  hSet: (field: string, key: string, userProps: string) => Promise<any>;
}

export class SesionService {
  constructor(private store: KVStore) {}

  async getUser(id: number | string): Promise<User | null> {
    const foundUserProps = await this.store.hGet("users", id.toString());
    if (!foundUserProps) return null;
    const u = new User();
    Object.assign(u, JSON.parse(foundUserProps));
    return u;
  }

  async setUser(u: User) {
    return this.store.hSet("users", u.id.toString(), JSON.stringify(u));
  }
}
