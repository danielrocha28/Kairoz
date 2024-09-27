import fastifyPassport from '@fastify/passport';
import fastifySession from '@fastify/session';
import pkg from 'passport-google-oauth20';
const { Strategy: GoogleStrategy } = pkg;
import dotenv from 'dotenv';
import User from '../model/user.model.js';



dotenv.config();



console.log('Client ID:', process.env.GOOGLE_CLIENT_ID);
console.log('Client Secret:', process.env.GOOGLE_CLIENT_SECRET);







export const passportSetup = (fastify) => {


    fastify.register(fastifyPassport.initialize());

    
 fastify.register(fastifySession, {
    secret: process.env.SESSION_SECRET || 'default_secret',
    cookie: { secure: false } // Ajuste para true se estiver usando HTTPS
  });


//configuraçao do passport para o oauth para usar o google
      fastifyPassport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback'
    },(accessToken, refreshToken, profile, done) => {
     try{
      const user = User.findOne({email:{email:profile.emails[0].value}});
    
      if(!user){
        user = User.create({email:profile.emails[0].value});
      }

      return done(null, user);

      }catch(err){
        return done(err);
      }
     }))
    };

//autentificaçao com o google, caso de um erro o usuario é redirecionado para a rota raiz '/'


export default passportSetup;




