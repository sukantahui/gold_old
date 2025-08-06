export interface RawMaterialModel {
    rm_ID?: number;
    rm_cat_id?: number;
    tech_name?: string;
    rm_name?: string;
    rm_gold?: number;
    rm_silver?: number;
    rm_copper?: number;
    rm_zinc?: number;
    rm_cadeam?: number;
    submitable?: number;
    bill_percentage?: number;
    job_percentage?: number;
    description?: string | null;
}
