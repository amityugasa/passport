const router = require('express').Router();
const passport = require('passport');

//auth login
router.get('/login', (req, res) => {
    res.render('login');
});


//auth logout
router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/'); 
});

// auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));


//callback route for google  to direct to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    console.log(req.user);
    // res.send(req.user);
    res.redirect('/profile');
});
//auth with facebook
//

router.get('/facebook', passport.authenticate('facebook',{
     // scope: ['profile']
    
      }));
 
router.get('/facebook/redirect',
  passport.authenticate('facebook'), (req, res) =>{
  console.log(req.user);
   
    // Successful authentication, redirect home.
    res.redirect('/profile');
  });
//auth with twitter
//

router.get('/twitter', passport.authenticate('twitter',{
     scope: ['profile']
    
      }));
 
router.get('/twitter/redirect',
  passport.authenticate('twitter'), (req, res) =>{
  console.log(req.user);
   
    // Successful authentication, redirect home.
    res.redirect('/profile');
  });
module.exports = router;
