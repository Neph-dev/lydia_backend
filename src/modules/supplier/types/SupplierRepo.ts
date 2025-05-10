import { AccountStatus } from "../../../shared/types";
import { Supplier } from "../domain/Supplier";

export interface SupplierRepo {
    save(supplier: Supplier): Promise<void>;
    findByEmail(email: string): Promise<Supplier | null>;
    findById(id: string): Promise<Supplier | null>;
    updateStatus(id: string, supplier: Supplier, newStatus: AccountStatus): Promise<Supplier | null>;
}