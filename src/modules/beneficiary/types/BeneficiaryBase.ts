import { AccountStatus, Address } from "../../../shared/types";

export interface BeneficiaryBase {
    name: string;
    address: Address;
    phoneNumber: string;
    emailAddress: string;
    description?: string;
    website?: string;
    coverPicture?: string;
    status: AccountStatus;
}