import fastifyPassport from '@fastify/passport';
import pkg from 'passport-google-oauth20';
const { Strategy: GoogleStrategy } = pkg;
import dotenv from 'dotenv';
import User from '../model/user.model.js';
import jwt from 'jsonwebtoken';

dotenv.config();


export const passportSetup = (fastify) => {
 
  fastify.register(fastifyPassport.initialize());


  // Configure Google OAuth strategy
  fastifyPassport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback'
  }, async (token, tokenSecret, profile, done) => {
    try {
      let user = await User.findOne({where:({ email: profile.emails[0].value })});

      if (!user) { // Create user if not found
        user = await User.create({
          email: profile.emails[0].value, // Use email from Google profile
          name: profile.displayName, // Use display name from Google profile
          password: 'google-auth', // Temporary password
      });
    }

     const jwtToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
     done(null, { id: user.id, token: jwtToken }); // Return user ID and token
   } catch (err) {
     done(err); // Handle errors
    }
  }));

}; 

export default passportSetup;
