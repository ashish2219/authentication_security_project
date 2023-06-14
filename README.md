# authentication_security_project  <code>

This project is a web application that implements authentication and security features. It utilizes salting and hashing for password storage and incorporates Google authentication using the Passport.js library. Users can register, login, and submit secrets. Only authenticated users can access the secrets page.

Installation
Clone the repository or download the project files.

Install the required dependencies by running the following command: 
<npm install> 

Create a .env file in the project root directory and provide the necessary environment variables:

<SESSION_SECRET=your_session_secret
CLIENT_ID=your_google_client_id
CLIENT_SECRET=your_google_client_secret>

Make sure you have MongoDB installed and running on your local machine.

Update the MongoDB connection URL in the mongoose.connect statement in app.js if necessary:

<mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true });>
  
Usage
Start the server by running the following command: <node app.js>
  
Access the application in your web browser at http://localhost:3000.

Features:
1. User Registration
Access the registration page by visiting /register.
Enter a username and password to create a new user account.
User passwords are securely hashed and salted using passport-local-mongoose.
  
2. User Login
Access the login page by visiting /login.
Enter the registered username and password to log in.
If the login is successful, the user is redirected to the secrets page.
Failed login attempts are handled gracefully.
  
3. Google Authentication
Access the Google authentication page by visiting /auth/google.
Authenticate using your Google account credentials.
Upon successful authentication, the user is redirected to the secrets page.
The Passport.js library with the passport-google-oauth20 strategy is used for Google authentication.
User accounts are created or found based on the Google ID, using findOrCreate plugin for Mongoose.
  
4. Secrets Page
Access the secrets page by visiting /secrets.
Only authenticated users can view the secrets page.
The secrets of all users who have submitted secrets are displayed.
Secrets are retrieved using asynchronous methods with async/await.
Alternatively, you can use the then/catch method by commenting and uncommenting the relevant code sections.
  
5. Submitting Secrets
Access the submit page by visiting /submit.
Only authenticated users can access the submit page.
Enter a secret in the provided input field and submit it.
The submitted secret is associated with the user's account and saved to the database.
  
6. Logging Out
Access the logout functionality by visiting /logout.
Logs out the currently authenticated user and redirects to the home page.
  
# Dependencies:
The project relies on the following dependencies, which are automatically installed via npm:

express
body-parser
ejs
mongoose
express-session
passport
passport-local-mongoose
passport-google-oauth20
mongoose-findorcreate
dotenv
  
# Configuration:
The application uses the .env file to store sensitive information and configuration variables. Make sure to set the following environment variables in the .env file:

SESSION_SECRET: A secret key used to sign the session cookie.
CLIENT_ID: Your Google OAuth client ID.
CLIENT_SECRET: Your Google OAuth client secret.
The MongoDB connection URL is set in the mongoose.connect statement in app.js. Modify it if your MongoDB server is running on a different URL.

# Notes
This project demonstrates a basic implementation of authentication and security.
