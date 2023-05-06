import { firebaseApp } from "./config";
import { Firestore, getFirestore } from "firebase-admin/firestore";


export const firebaseStore: Firestore = getFirestore(firebaseApp);