import { Router } from 'express';
import User from '../models/User';
import passport from '../passport';

const router = Router();

const authCheck = (req, res, next) => {
    if (!req.user) {
      // if the user is not connected, redirect him
      res.redirect('/');
    } else {
      // if he is connected, jump out of that middleware
      next();
    }
  };

router.get('/profile', (req, res) => {    
    const { user } = req;

    // console.log('Utilisateur:', user);
    
    if (user) {
        return res.json({ user });
    } else {
        return res.json({ user: null })
    }
});

router.post('/signup', (req, res) => {
    const { username, displayName, email, password } = req.body;

    User.findOne({ username }, (err, userMatch) => {
        if (userMatch) {
            return res.json({ error: `Sorry, already a user with the username: ${username}` })
        }
        const newUser = new User({
            username,
            displayName,
            email,
            password
        });
        newUser.save((err, savedUser) => {
            if (err) return res.json(err);
            res.redirect('/');
        })
    })
});

router.post('/login',    
    (req, res, next) => {
        console.log('HEREEEEEE:', req.body);
        next()
    },
    passport.authenticate('local', {
        successRedirect: '/#/accueil',
        failureRedirect: '/'
    }),
    (req, res) => {
        console.log('/login called()');
        console.log(req.user);
        res.redirect('/')
    }
);

router.post('/logout', (req, res) => {
    if (req.user) {
        req.session.destroy();
        res.clearCookie('connect.sid', {path: '/', domain: 'localhost:8080'});
        return res.json({ message: 'Logged out!' })
    } else {
        return res.json({ message: 'No user to log out ...' })
    }
})

// TODO: HANDLE FAILURE LOGIN
const authenticateWithStrategy = (strategy, authRoute, callbackRoute, scopes) => {
    router.get(authRoute, passport.authenticate(strategy, scopes));
    router.get(callbackRoute, passport.authenticate(strategy), (req, res) => res.redirect('/#/accueil'));
}

authenticateWithStrategy('google', '/google', '/google/callback',{
    scope: ['profile', 'email']
});
authenticateWithStrategy('facebook', '/facebook', '/facebook/callback');
authenticateWithStrategy('twitter', '/twitter', '/twitter/callback');
authenticateWithStrategy('instagram', '/instagram', '/instagram/callback');
authenticateWithStrategy('github', '/github', '/github/callback');
authenticateWithStrategy('twitch', '/twitch', '/twitch/callback');
authenticateWithStrategy('spotify', '/spotify', '/spotify/callback', {
    scope: ['user-read-email', 'user-read-private'],
    showDialog: true
});

export default router;