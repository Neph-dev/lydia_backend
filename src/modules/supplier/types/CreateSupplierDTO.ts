import { AccountStatus, Address, DonationDays, DonationFrequency, Establishment } from "../../../shared/types";

export interface CreateSupplierDTO {
    name: string;
    establishment: Establishment;
    address: Address;
    phoneNumber: string;
    emailAddress: string;
    description?: string;
    website?: string;
    status: AccountStatus;
    coverPicture?: string;
    donationSchedule: {
        days: DonationDays[];
        frequency: DonationFrequency;
    };
}