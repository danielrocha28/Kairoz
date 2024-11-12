import fastifyPassport from '@fastify/passport';
import pkg from 'passport-google-oauth20';
const { Strategy: GoogleStrategy } = pkg;
import dotenv from 'dotenv';
import User from '../model/user.model.js';
import jwt from 'jsonwebtoken';

dotenv.config();

export const passportSetup = (fastify) => {
  
  // Configuration of the Google OAuth strategy
  fastifyPassport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback'
  }, async (token, tokenSecret, profile, done) => {
    try {
      console.log("Google profile:", profile);

      let user = await User.findOne({ where: { email: profile.emails[0].value } });
      console.log("User found:", user);

      if (!user) {
        user = await User.create({
          email: profile.emails[0].value,
          name: profile.displayName,
          password: 'google-auth'
        });
        console.log("Created new user:", user);
      }

      console.log("User ID for serialization:", user.id_user);

      const jwtToken = jwt.sign({ id: user.id_user }, process.env.JWT_SECRET, { expiresIn: '1h' });
      done(null, { id_user: user.id_user, email: user.email, token: jwtToken });
    } catch (err) {
      done(err);
    }
  }));

  // Serializer: serializes the user based on `id_user`
  fastifyPassport.registerUserSerializer(async (user) => {
    const userFromDb = await User.findOne({ where: { email: user.email } });
    console.log("User found for serialization:", userFromDb);

    if (userFromDb) {
      console.log("Serializing user with id:", userFromDb.id_user);
      return userFromDb.id_user; // Direct return of the user's ID
    } else {
      throw new Error('User not found');
    }
  });

  // Deserializer: retrieves the user based on `id_user`
  fastifyPassport.registerUserDeserializer(async (id) => {
    console.log("Deserializing user with id:", id);
    const user = await User.findOne({ where: { id_user: id } });
    console.log("Deserialized user:", user);
    return user; // Direct return of the user
  });

  // Registration of fastifyPassport features
  fastify.register(fastifyPassport.initialize());
  fastify.register(fastifyPassport.secureSession());
};

export default passportSetup;
