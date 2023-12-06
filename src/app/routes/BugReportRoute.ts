import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import AuthenticateToken from '../middleware/AuthenticateToken';
import AuthenticateRole from '../middleware/AuthenticateRole';

import BugReportController from '../controllers/BugReportController';

const router = express.Router();

if(process.env.NODE_ENV === 'production') {
    router.use(AuthenticateToken.authenticateToken);
    router.use(AuthenticateRole.authenticateRole);
}

router.post("/createBugReport", BugReportController.createBugReport);
router.get("/getBugReports", AuthenticateToken.authenticateToken, BugReportController.getBugReports);
router.get("/getBugReport/:bugReportId", BugReportController.getBugReport);
router.patch("/updatePriority/:bugReportId", BugReportController.updatePritoity);

export default router