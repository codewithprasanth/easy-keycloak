import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth-service';
import { ComplianceRendererComponent } from 'src/components/ag-grid/compliance-renderer/compliance-renderer.component';
import { defaultGridOptions } from 'src/components/ag-grid/grid-util';
import { IconRendererComponent } from 'src/components/ag-grid/icon-renderer/icon-renderer.component';
import { ConfirmationService } from 'src/components/confirmation/confirmation.service';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrl: './role-management.component.scss',
})
export class RoleManagementComponent {
  constructor(
    private confirmationService: ConfirmationService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  gridApi: any;
  gridOptions: GridOptions = {
    ...defaultGridOptions,
    columnDefs: [
      { field: 'id', headerName: 'Role ID', minWidth: 350 },
      { field: 'name', headerName: 'Role Name', minWidth: 300 },
      {
        field: 'composite',
        headerName: 'Composite Role',
        cellRenderer: ComplianceRendererComponent,
        cellRendererParams: {
          positiveTooltip: 'Yes',
          negativeTooltip: 'No',
        },
        minWidth: 75,
      },
      {
        headerName: 'Delete',
        cellRenderer: IconRendererComponent,
        minWidth: 50,
        cellRendererParams: {
          src: 'assets/icons/delete-icon.svg',
          tooltip: 'delete',
          field1: 'id',
          field2: 'name',
          clicked: (id: string, name: string) => {
            this.confirmationService
              .confirm(
                'Delete Role',
                'Are you sure want to delete the role?',
                true,
                undefined,
                undefined,
                undefined,
                name
              )
              .then(async (val) => {
                if (val) {
                  try {
                    await this.authService.kcAdminClient.roles.delById({ id });
                    this.toastr.success('Role Deleted!');
                    await this.ngOnInit();
                  } catch (err) {
                    this.toastr.error('Failed to delete role!');
                  }
                }
              });
          },
        },
      },
    ],
    onGridReady: (param) => {
      this.gridApi = param.api;
      this.gridApi.setDomLayout('autoHeight');
    },
  };

  async ngOnInit() {
    try {
      this.spinner.show();
      const rowData = await this.authService.kcAdminClient.roles.find();
      console.log(rowData);
      this.gridApi.setRowData(rowData);
      this.spinner.hide();
    } catch (e) {
      console.log(e);
      this.toastr.error('Failed to fetch Role List.');
    }
  }

  onCreateNewRole() {
    this.router.navigate(['./../create-role'], {
      relativeTo: this.activatedRoute,
    });
  }
}
