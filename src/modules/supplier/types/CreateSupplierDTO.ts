import { Address, Establishment } from "../../../shared/types";
import { SupplierStatus } from "./SupplierStatus";

export interface CreateSupplierDTO {
    name: string;
    establishment: Establishment;
    address: Address;
    phoneNumber: string;
    emailAddress: string;
    description?: string;
    website?: string;
    status: SupplierStatus;
    coverPicture?: string;
}