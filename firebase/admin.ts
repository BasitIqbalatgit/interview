import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

const initFirebaseAdmin = () => {
    const apps = getApps();

    if (apps.length === 0) {
        // Make sure all required environment variables are available
        const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;

        if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
            throw new Error('Missing required Firebase environment variables.');
        }

        // Initialize Firebase app with credentials
        initializeApp({
            credential: cert({
                projectId: FIREBASE_PROJECT_ID,
                clientEmail: FIREBASE_CLIENT_EMAIL,
                privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"), // Ensure correct format for private key
            }),
        });
    }

    return {
        auth: getAuth(),
        db: getFirestore(),
    };
};

// Exporting auth and db after initialization
export const { db, auth } = initFirebaseAdmin();
