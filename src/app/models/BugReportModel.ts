import mongoose, { Document, Model, Schema } from 'mongoose';

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

interface BugReportDocument extends Document, IBugReport {}

const BugReportSchema = new Schema<BugReportDocument>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], required: true },
    tag: { type: String, required: true, default: "nothing"},
    status: { type: String, required: true, default: "open" },
    priority: { type: String, default: "low" },
    reportedBy: { type: String, required: true },
    assignedTo: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const BugReportModel = mongoose.model<BugReportDocument>('BugReport', BugReportSchema);

export default BugReportModel;