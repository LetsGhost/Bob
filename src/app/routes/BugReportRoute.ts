import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import AuthenticateToken from '../middleware/AuthenticateToken.js';
import AuthenticateRole from '../middleware/AuthenticateRole.js';

import BugReportController from '../controllers/BugReportController.js';

const router = express.Router();

if(process.env.NODE_ENV === 'production') {
    router.use(AuthenticateToken.authenticateToken);
    router.use(AuthenticateRole.authenticateRole);
}

router.post("/createBugReport", BugReportController.createBugReport);
router.get("/getBugReports", AuthenticateToken.authenticateToken, BugReportController.getBugReports);
router.get("/getBugReport/:bugReportId", BugReportController.getBugReport);
router.patch("/updateBugReport/:bugReportId", BugReportController.updateBugReport);

export default router