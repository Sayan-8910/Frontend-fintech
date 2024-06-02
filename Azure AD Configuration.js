const passport = require('passport');
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;

passport.use(new OIDCStrategy({
    identityMetadata: 'https://login.microsoftonline.com/YOUR_TENANT_ID/v2.0/.well-known/openid-configuration',
    clientID: 'YOUR_CLIENT_ID',
    responseType: 'code',
    responseMode: 'form_post',
    redirectUrl: 'http://localhost:3000/auth/openid/return',
    allowHttpForRedirectUrl: true,
    clientSecret: 'YOUR_CLIENT_SECRET',
    validateIssuer: false,
    passReqToCallback: false,
    scope: ['openid', 'profile']
}, (iss, sub, profile, accessToken, refreshToken, done) => {
    return done(null, profile);
}));

app.get('/login', passport.authenticate('azuread-openidconnect'));

app.post('/auth/openid/return', 
    passport.authenticate('azuread-openidconnect', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/');
    }
);
