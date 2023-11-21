import { Request, Response } from "express";
import BugReportService from "../services/BugReportService";

class BugReportController {
    async createBugReport(req: Request, res: Response){
        try{
            const {success, code, message} = await BugReportService.createBugReport(req.body);
            return res.status(code).json({success, message});
        } catch(error){
            console.log("Error creating bug report: ", error)
            return res.status(500).json({
                success: false,
                code: 500,
                message: "Internal Server Error"
            });
        }
    }

    async getBugReports(req: Request, res: Response){
        try{
            const {success, code, message, bugReports} = await BugReportService.getBugReports();
            return res.status(code).json({success, message, bugReports});
        } catch(error){
            console.log("Error getting bug reports: ", error)
            return res.status(500).json({
                success: false,
                code: 500,
                message: "Internal Server Error"
            });
        }
    }
}

export default new BugReportController();