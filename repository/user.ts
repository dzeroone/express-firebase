import { FirestoreRepo } from "../lib/firebase/firestore-repository";

type User = {
  email: string;
  password: string;
}

class UserRepo extends FirestoreRepo {
  constructor() {
    super('users')
  }

  async addUser(user: User) {
    return this.coll.add(user);
  }

  async findOneByEmail(email: string) {
    const snapshotQ = await this.coll.where('email', '==', email).limit(1).get();
    if(snapshotQ.empty) return null;
    return {
      id: snapshotQ.docs[0].id, 
      ...snapshotQ.docs[0].data()
    };
  }
}

const userRepo = new UserRepo()

export default userRepo;