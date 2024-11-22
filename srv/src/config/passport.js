import fastifyPassport from '@fastify/passport';
import pkg from 'passport-google-oauth20';
const { Strategy: GoogleStrategy } = pkg;
import dotenv from 'dotenv';
import User from '../model/user.model.js';
import jwt from 'jsonwebtoken';

dotenv.config();

export const passportSetup = (fastify) => {

  // Configuração do Logger do Fastify
  const logger = fastify.log;

  // Configuração da estratégia OAuth do Google
  fastifyPassport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback'
  }, async (token, tokenSecret, profile, done) => {
    try {
      logger.info({ profile }, 'Google profile');

      let user = await User.findOne({ where: { email: profile.emails[0].value } });
      logger.info({ user }, 'User found');

      if (!user) {
        user = await User.create({
          email: profile.emails[0].value,
          name: profile.displayName,
          password: 'google-auth'
        });
        logger.info({ user }, 'Created new user');
      }

      logger.info({ userId: user.id_user }, 'User ID for serialization');

      const jwtToken = jwt.sign({ id: user.id_user }, process.env.JWT_SECRET, { expiresIn: '1h' });
      done(null, { id_user: user.id_user, email: user.email, token: jwtToken });
    } catch (err) {
      done(err);
    }
  }));

  fastifyPassport.registerUserSerializer(async (user) => {
    const userFromDb = await User.findOne({ where: { email: user.email } });
    logger.info({ userFromDb }, 'User found for serialization');

    if (userFromDb) {
      logger.info({ userId: userFromDb.id_user }, 'Serializing user with id');
      return userFromDb.id_user; 
    } else {
      throw new Error('User not found');
    }
  });

  fastifyPassport.registerUserDeserializer(async (id) => {
    logger.info({ id }, 'Deserializing user with id');
    const user = await User.findOne({ where: { id_user: id } });
    logger.info({ user }, 'Deserialized user');
    return user; 
  });

  fastify.register(fastifyPassport.initialize());
  fastify.register(fastifyPassport.secureSession());
};

export default passportSetup;
