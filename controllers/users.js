import User from '../models/user.js'
import jwt from 'jsonwebtoken'
const SECRET = process.env.SECRET;



export default {
  signup,
  login
};


async function signup(req, res) {
  console.log(req.body, "req.body")
  
  const user = new User(req.body);
  console.log(user, "in controller");
  try {
    console.log("try hit awaiting save")
    await user.save();
    console.log("saved!")
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    // Probably a duplicate email
    console.log(err, "error in signup controller catch")
    res.status(400).json(err);
  }
}

async function login(req, res) {
 
  try {
    const user = await User.findOne({email: req.body.email});
   
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.password, (err, isMatch) => {
      
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}


