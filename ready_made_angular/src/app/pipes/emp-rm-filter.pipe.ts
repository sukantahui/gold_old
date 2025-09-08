import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'empRmFilter'
})
export class EmpRmFilterPipe implements PipeTransform {
    transform(items: any[] | null | undefined, empFilter: string, rmFilter: string): any[] {
        if (!Array.isArray(items)) { return []; }

        let filtered = items;

        if (empFilter) {
            empFilter = empFilter.toLowerCase();
            filtered = filtered.filter(item =>
                item.emp_name?.toLowerCase().includes(empFilter)
            );
        }

        if (rmFilter) {
            rmFilter = rmFilter.toLowerCase();
            filtered = filtered.filter(item =>
                item.rm_name?.toLowerCase().includes(rmFilter)
            );
        }

        return filtered;
    }
}
