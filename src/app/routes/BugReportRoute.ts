import express from 'express';

import AuthenticateToken from '../middleware/AuthenticateToken';
import AuthenticateRole from '../middleware/AuthenticateRole';

import BugReportController from '../controllers/BugReportController';

const router = express.Router();

router.post("/createBugReport", BugReportController.createBugReport);
router.get("/getBugReports", BugReportController.getBugReports);

export default router