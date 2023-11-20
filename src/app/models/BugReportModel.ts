import mongoose, { Document, Model, Schema } from 'mongoose';

interface BugReportModel {
    title: string;
    description: string;
    tags: string[];
    tag: string;
    status: string;
    priority: string;
    reportedBy: string;
}

interface BugReportModelPlanDocument extends Document {
    bugReportModel: BugReportModel;
    createdAt: Date;
}

interface BugeReportModel extends Model<BugReportModelPlanDocument> {}

const BugReportModelSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], required: true },
    tag: { type: String, required: true },
    status: { type: String, required: true },
    priority: { type: String, required: true },
    reportedBy: { type: String, required: true },
});

const BugReportModelPlanDocument = new Schema({
    bugReportModel: { type: BugReportModelSchema, required: true },
    createdAt: { type: Date, default: Date.now },
})

const BugReportModel = mongoose.model<BugReportModelPlanDocument>('BugReport', BugReportModelPlanDocument);

export default BugReportModel;