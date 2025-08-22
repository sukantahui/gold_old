export interface CashTransaction{
    cash_transaction_id: string;
    payee_id: number;
    payee_name: string;
    payer_id: number;
    payer_name: number;
    cash: number;
    tr_date?: string;
}
