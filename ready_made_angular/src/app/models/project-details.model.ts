export interface ProjectDetailsModel {
    projectHeading: string;
    contact: string;

    fineToNinetyTwoRatio: {
        fine: number;
        copper: number;
    };

    dalCreationRation: {
        silver: number;
        copper: number;
        zinc: number;
        copperToSilverRatio: number;
        zincToSilver: number;
        dalToSilverRatio: number;
    };

    managerToEmployeeMaterial: {
        employees: number[];
        materialsToSend: number[];
    };

    employeeToManagerMaterial: {
        employees: number[];
        materialsToSend: number[];
    };
    managerCashWithdrawn: {
        employees: number[];
    };
    ownerCashWithdrawnFromManager: {
        employees: number[];
    };
}
