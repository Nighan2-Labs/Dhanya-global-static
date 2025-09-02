# Firebase Setup Instructions

The Firebase configuration has already been set up for this project. The credentials are:

- Project ID: `dhanyaglobal-908fb`
- API Key: `AIzaSyCS1owZWbZ5Cwi19DOMjK14roayuP8_bGQ`
- Auth Domain: `dhanyaglobal-908fb.firebaseapp.com`
- Storage Bucket: `dhanyaglobal-908fb.firebasestorage.app`
- Messaging Sender ID: `759832478854`
- App ID: `1:759832478854:web:79fc7da84b17293975bd07`
- Measurement ID: `G-RRNTEGTB97`

## 1. Enable Firestore Database

1. Go to the [Firebase Console](https://console.firebase.google.com/) and select the "dhanyaglobal-908fb" project
2. Click "Firestore Database" in the left sidebar
3. Click "Create database"
4. Choose "Start in test mode" (for development only)
5. Click "Next"
6. Choose a location for your database (e.g., `us-central1`)
7. Click "Enable"

## 2. Set Up Authentication (Optional for Admin Portal)

1. In the Firebase Console, click "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable "Email/Password" sign-in provider
5. For the admin portal, you can manually add an admin user:
   - Go to the "Users" tab
   - Click "Add user"
   - Enter the admin email and password
   - The default admin credentials in the code are:
     - Email: admin@dhanyaglobal.com
     - Password: Dhanya@143

## 3. Update Security Rules

For production, you should update the security rules for Firestore:

### Firestore Rules
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{document} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
  }
}
```

## 4. Test the Setup

1. Restart your development server
2. Navigate to `/admin/login`
3. Use the default credentials:
   - Email: admin@dhanyaglobal.com
   - Password: Dhanya@143
4. You should be able to access the admin dashboard and manage products

## Notes

- The current implementation uses mock authentication with hardcoded credentials
- For production, you should implement proper Firebase Authentication
- Images are stored as URLs directly in Firestore (not in Firebase Storage) to stay within free tier limits
- The image upload functionality currently uses the generated URLs directly from Pollinations AI