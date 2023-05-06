import { firebaseStore } from "./store";

export class FirestoreRepo {
  coll: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
  
  constructor(collectionName: string) {
    this.coll = firebaseStore.collection(collectionName)
  }
}