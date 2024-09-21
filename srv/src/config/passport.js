import passport from 'passport';
import { GoogleStrategy } from 'passport-google-oauth20';

//configuraçao do passport para o oauth para usar o google
export function useGloogle(){
    passport.use(new GoogleStrategy({
      clientId:process.env.GOOGLE_CLIENT_ID,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'https://localhost:3000/auth/google/callback'
    },(accessToken, refreshToken,profile,done) => {
     try{
      const user =  User.findOne({email:{email:profile.emails[0].value}});
    
      if(!user){
        user =  User.create({email:profile.emails[0].value});
      }
      return done(null, user);
      }catch(err){
        return done(err);
      }
     }));
    }

//autentificaçao com o google, caso de um erro o usuario é redirecionado para a rota raiz '/'
export function authGoogle(){ 
    return passport.authenticate('google', {
    failureRedirect: '/',
    scope: ['profile', 'email']
    }
   )
  };



