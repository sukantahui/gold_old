export interface MaterialBetweenEmployeeTransaction {
    transaction_id: number;
    transaction_number: string;
    transaction_date: string;   // keep as string (ISO datetime), or convert to Date
    emp_id: number;
    emp_name: string;
    rm_id: number;
    rm_name: string;
    outward: number;
    inward: number;
}
