import express from 'express';
const router = express.Router();
import usersCtrl  from '../../controllers/users.js';

router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);

export default router;