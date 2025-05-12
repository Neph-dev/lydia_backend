import { Document } from "mongoose";
import { BeneficiaryBase } from "./BeneficiaryBase";

export interface BeneficiaryDocument extends BeneficiaryBase, Document {
    createdAt: Date;
    updatedAt: Date;
}