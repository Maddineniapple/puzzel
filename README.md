# Neon Multi-Round Test Website

This is a complete, ready-to-deploy multi-round test website with a dark neon theme and Firebase backend.

## 🚀 Features
- **Login System**: Unique user identification via Roll Number.
- **3-Round System**: Easy, Medium, and Hard rounds with instant saving.
- **Timer**: Continuous tracking from start to final submission.
- **Admin Panel**: Real-time leaderboard with ranking logic (High Score > Low Time).
- **Security**: Prevents back button, multiple logins, and tracks completion status.
- **Responsive UI**: Dark mode with neon accents.

## 🛠️ Setup Instructions

### 1. Firebase Configuration
1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Create a new project.
3. Add a "Web App" to your project.
4. Copy the `firebaseConfig` object.
5. Open `js/firebase.js` and replace the placeholder values with your actual config.
6. In Firebase Console, go to **Realtime Database** and create a database.
7. Set the **Rules** to allow read/write (for testing):
   ```json
   {
     "rules": {
       ".read": true,
       ".write": true
     }
   }
   ```
   *(Note: For production, you should secure these rules).*

### 2. Deployment
1. Upload the entire `website` folder to a GitHub repository.
2. Enable **GitHub Pages** in the repository settings.
3. Your site will be live at `https://yourusername.github.io/your-repo-name/`.

### 3. Admin Access
- Access the results at `your-url/admin.html`.
- You can see all participants, their scores, and time taken.
- Use the "Export CSV" button to download results for Excel.

## 📁 File Structure
- `index.html`: Login Page
- `instructions.html`: Rules & Start
- `round1.html`, `round2.html`, `round3.html`: Test Rounds
- `submit.html`: Success Page
- `admin.html`: Results Dashboard
- `css/style.css`: Neon Theme
- `js/firebase.js`: Database Config
- `js/app.js`: Core Logic
- `js/timer.js`: Timer System
