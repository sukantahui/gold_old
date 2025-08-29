export interface CurrentUser {
    uniqueId?: number;
    userName?: string;
    userTypeId?: number;
    employeeId?: number;
    userTypeName?: string;
    employee?: {
        employeeId?: number;
        employeeName?: string;
        nickName?: string;
        designation?: {
            designationId?: number;
            designationName?: string | null;
        };
    };
}
