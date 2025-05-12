import { AccountStatus } from "../../../shared/types";
import { Beneficiary } from "../domain/Beneficiary";

export interface BeneficiaryRepo {
    save(beneficiary: Beneficiary): Promise<void>;
    findByEmail(email: string): Promise<Beneficiary | null>;
    findById(id: string): Promise<Beneficiary | null>;
    updateStatus(id: string, beneficiary: Beneficiary, newStatus: AccountStatus): Promise<Beneficiary | null>;
}