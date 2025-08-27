export interface EmployeeCashBalance {
    emp_id: number;
    emp_name?: string;
    op_balance: number;
    inward: number;
    outward: number;
    balance: number;
    tr_date: string; // ISO timestamp string (e.g. "2025-08-27 13:56:59")
}
