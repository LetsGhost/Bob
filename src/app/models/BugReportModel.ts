import mongoose, { Document, Model, Schema } from 'mongoose';

interface IBugReportModel {
    title: string;
    description: string;
    tags: string[];
    tag: string;
    status: string;
    priority: string;
    reportedBy: string;
    assignedTo?: string;
}

interface BugReportModelPlanDocument extends Document {
    bugReportModel: IBugReportModel;
    createdAt: Date;
}

interface BugReportModelPlan extends Model<BugReportModelPlanDocument> {}

const BugReportModelSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], required: true },
    tag: { type: String, required: true, default: "nothing"},
    status: { type: String, required: true, default: "open" },
    priority: { type: String, default: "low" },
    reportedBy: { type: String, required: true },
    assignedTo: { type: String },
});

const BugReportModelPlanDocumentSchema = new Schema({
    bugReportModel: { type: BugReportModelSchema, required: true },
    createdAt: { type: Date, default: Date.now },
})

const BugReportModel = mongoose.model<BugReportModelPlan>('BugReport', BugReportModelPlanDocumentSchema);

export default BugReportModel;