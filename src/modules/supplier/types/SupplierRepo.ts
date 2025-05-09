import { Supplier } from "../domain/Supplier";
import { SupplierStatus } from "./SupplierStatus";

export interface SupplierRepo {
    save(supplier: Supplier): Promise<void>;
    findByEmail(email: string): Promise<Supplier | null>;
    findById(id: string): Promise<Supplier | null>;
    updateStatus(id: string, supplier: Supplier, newStatus: SupplierStatus): Promise<Supplier | null>;
}