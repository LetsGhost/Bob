import BugReportModel from "../models/BugReportModel.js";
import logger from "../../config/winstonLogger.js";

interface IBugReport {
    title: string;
    description: string;
    tags: string[];
    tag: string;
    status: string;
    priority: string;
    reportedBy: string;
    assignedTo?: string;
    createdAt: Date;
}

class BugReportService {
    async createBugReport(bugReport: IBugReport){
        try{
            const newBugReport = new BugReportModel(bugReport);
            await newBugReport.save();

            return {
                success: true,
                code: 201,
            }
        } catch(error){
            logger.error("Error creating bug report: ", error, {service: "BugReportService.createBugReport"})
            return {
                success: false,
                code: 500,
                message: "Internal Server Error"
            }
        }
    }

    async getBugReports(){
        try{
            const bugReports = await BugReportModel.find({});

            return {
                success: true,
                code: 200,
                bugReports
            }
        } catch(error){
            logger.error("Error getting bug reports: ", error, {service: "BugReportService.getBugReports"})
            return {
                success: false,
                code: 500,
                message: "Internal Server Error"
            }
        }
    }

    async getBugReport(bugReportId: string){
        try{
            const bugReport = await BugReportModel.findById(bugReportId);

            if(!bugReport){
                return {
                    success: false,
                    code: 404,
                    message: "Bug report not found"
                }
            }
            
            return {
                success: true,
                code: 200,
                bugReport
            }
        } catch(error){
            logger.error("Error getting bug report: ", error, {service: "BugReportService.getBugReport"})
            return {
                success: false,
                code: 500,
                message: "Internal Server Error"
            }
        }
    }

    async deleteBugReport(bugReportId: string){
        try{
            const bugReport = await BugReportModel.findByIdAndDelete(bugReportId);

            if(!bugReport){
                return {
                    success: false,
                    code: 404,
                    message: "Bug report not found"
                }
            }

            return {
                success: true,
                code: 200,
            }
        } catch(error){
            logger.error("Error deleting bug report: ", error, {service: "BugReportService.deleteBugReport"})
            return {
                success: false,
                code: 500,
                message: "Internal Server Error"
            }
        }
    }

    async updateBugReport(bugReportId: string, update: Partial<IBugReport>){
        try {
            const updatedBugReport = await BugReportModel.findByIdAndUpdate(bugReportId, update, { new: true })
            if (!updatedBugReport) {
                return {
                    success: false,
                    code: 404,
                    message: "Bug report not found"
                }
            }

            return {
                success: true,
                code: 200,
                data: updatedBugReport
            }
        } catch (error) {
            return {
                success: false,
                code: 500,
                message: "Internal Server Error"
            }
        }
    }


    // Doesnt work i dont know why

}

export default new BugReportService();