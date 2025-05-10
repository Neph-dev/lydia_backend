import { Document } from 'mongoose';
import { AccountStatus, Address, DonationDays, DonationFrequency, Establishment } from "../../../shared/types";

export interface SupplierDocument extends Document {
    name: string;
    establishment: Establishment;
    address: Address;
    phoneNumber: string;
    emailAddress: string;
    description?: string;
    website?: string;
    coverPicture?: string;
    status: AccountStatus;
    donationSchedule: {
        days: DonationDays[];
        frequency: DonationFrequency;
    };
    createdAt: Date;
    updatedAt: Date;
}