import { initializeApp } from 'firebase-admin/app';
import { credential, ServiceAccount } from 'firebase-admin';
import serviceJson from '../../serviceAccountKey.json';

export const firebaseApp = initializeApp({
  credential: credential.cert(serviceJson as ServiceAccount),
  databaseURL: process.env.FIREBASE_DB_URL
});