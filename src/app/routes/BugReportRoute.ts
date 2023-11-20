import express from 'express';

import AuthenticateToken from '../middleware/AuthenticateToken';
import AuthenticateRole from '../middleware/AuthenticateRole';

const router = express.Router();

export default router