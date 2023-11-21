import BugReportModel from "../models/BugReportModel";

interface BugReportModel {
    title: string;
    description: string;
    tags: string[];
    reportedBy: string;
}

interface BugReportModelPlanDocument extends Document {
    bugReportModel: BugReportModel;
    createdAt: Date;
}

class BugReportService {
    async createBugReport(bugReport: BugReportModelPlanDocument){
        try{
            const newBugReport = new BugReportModel({
                bugReportModel: bugReport
            });
            newBugReport.save();

            return {
                success: true,
                code: 201,
            }
        } catch(error){
            console.log("Error creating bug report: ", error)
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
            console.log("Error getting bug reports: ", error)
            return {
                success: false,
                code: 500,
                message: "Internal Server Error"
            }
        }
    }

    async updateTags(bugReportId: string, tags: string){

    }

    async updateStatus(bugReportId: string, status: string){

    }

    async updatePriority(bugReportId: string, priority: string){
        const bugReport = await BugReportModel.findById(bugReportId);

        if(!bugReport){
            return {
                success: false,
                code: 404,
                message: "Bug Report not found"
            }
        }

        
    }
}

export default new BugReportService();