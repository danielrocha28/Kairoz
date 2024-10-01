//import fastifySession from '@fastify/session';
import fastifyPassport from '@fastify/passport';
import pkg from 'passport-google-oauth20';
const { Strategy: GoogleStrategy } = pkg;
import dotenv from 'dotenv';
import User from '../model/user.model.js';
import jwt from 'jsonwebtoken';




dotenv.config();


export const passportSetup = (fastify) => {
 
  fastify.register(fastifyPassport.initialize());
  // fastify.register(fastifyPassport.session());


  // Configuração do Passport para o OAuth do Google
  fastifyPassport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback'
  }, async (token, tokenSecret, profile, done) => {
    try {
      console.log('Google Profile:', profile);
      let user = await User.findOne({where:({ email: profile.emails[0].value })});

      if (!user) {
       user = await User.create({
        email: profile.emails[0].value,
        name: profile.displayName, // Usar o nome do perfil
        password: 'google-auth', // Usar uma senha temporária
      });
    }

      // Gerar um token JWT
      const jwtToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      done(null, { id: user.id, token: jwtToken }); // Retorna o ID do usuário e o token
    } catch (err) {
      done(err);
    }
  }));


  /*
  fastifyPassport.serializeUser((user, done) => {
    done(null, user.id); // Aqui você está serializando o ID do usuário
  });
  
  fastifyPassport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id); // Encontre o usuário pelo ID
      done(null, user); // Retorne o usuário encontrado
    } catch (err) {
      done(err);
    }
  });  
   */
}; 



// Exporta a configuração do Passport
export default passportSetup;
