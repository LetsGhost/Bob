import { Request, Response } from "express";
import BugReportService from "../services/BugReportService.js";
import logger from "../../config/winstonLogger.js";

class BugReportController {
    async createBugReport(req: Request, res: Response){
        try{
            const {success, code, message} = await BugReportService.createBugReport(req.body);

            if(success){
                logger.info("Bug report created successfully", {service: "BugReportController.createBugReport"})
            }

            return res.status(code).json({success, message});
        } catch(error){
            logger.error("Error creating bug report: ", error, {service: "BugReportController.createBugReport"})
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
            logger.error("Error getting bug reports: ", error, {service: "BugReportController.getBugReports"})
            return res.status(500).json({
                success: false,
                code: 500,
                message: "Internal Server Error"
            });
        }
    }

    async getBugReport(req: Request, res: Response){
        try{
            const {success, code, message, bugReport} = await BugReportService.getBugReport(req.params.bugReportId);
            return res.status(code).json({success, message, bugReport});
        } catch(error){
            logger.error("Error getting bug report: ", error, {service: "BugReportController.getBugReport"})
            return res.status(500).json({
                success: false,
                code: 500,
                message: "Internal Server Error"
            });
        }
    }

    async deleteBugReport(req: Request, res: Response){
        try{
            const {success, code, message} = await BugReportService.deleteBugReport(req.params.bugReportId);

            if(success){
                logger.info("Bug report deleted successfully", {service: "BugReportController.deleteBugReport"})
            }

            return res.status(code).json({success, message});
        } catch(error){
            logger.error("Error deleting bug report: ", error, {service: "BugReportController.deleteBugReport"})
            return res.status(500).json({
                success: false,
                code: 500,
                message: "Internal Server Error"
            });
        }
    }

    async updateBugReport(req: Request, res: Response){
        try{
            const update = req.body; // Get the update from the request body
            const {success, code, message} = await BugReportService.updateBugReport(req.params.bugReportId, update);

            if(success){
                logger.info("Bug report updated successfully", {service: "BugReportController.updateBugReport"})
            }

            return res.status(code).json({success, message});
        } catch(error){
            logger.error("Error updating bug report: ", error, {service: "BugReportController.updateBugReport"})
            return res.status(500).json({
                success: false,
                code: 500,
                message: "Internal Server Error"
            });
        }
    }
}

export default new BugReportController();