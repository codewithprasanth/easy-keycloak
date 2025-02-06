import { Component, OnInit } from '@angular/core';
import { Credentials } from '@keycloak/keycloak-admin-client/lib/utils/auth';
import { GridOptions } from 'ag-grid-community';
import { ConfirmationService } from '../../../../components/confirmation/confirmation.service';
import { ButtonRendererComponent } from '../../../../components/ag-grid/button-renderer/button-renderer.component';
import { defaultGridOptions } from 'src/components/ag-grid/grid-util';
import { AuthService } from 'src/app/auth/auth-service';
import * as moment from 'moment';
import { AgActionButtonsRendererComponent } from 'src/components/ag-grid/ag-action-buttons-renderer/ag-action-buttons-renderer.component';
import { ComplianceRendererComponent } from 'src/components/ag-grid/compliance-renderer/compliance-renderer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ListFilterPipe } from 'ng-multiselect-dropdown/list-filter.pipe';
import { LinkRendererComponent } from 'src/components/ag-grid/link-renderer/link-renderer.component';
import { IconRendererComponent } from 'src/components/ag-grid/icon-renderer/icon-renderer.component';

@Component({
  selector: 'user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss',
})
export class UserManagementComponent implements OnInit {
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
      { field: 'id', headerName: 'Keycloak ID', minWidth: 350 },
      { field: 'firstName', headerName: 'First Name', minWidth: 150 },
      { field: 'lastName', headerName: 'Last Name', minWidth: 150 },
      {
        field: 'username',
        headerName: 'User Name',
        cellRenderer: LinkRendererComponent,
        minWidth: 300,
        cellRendererParams: {
          field1: 'id',
          clicked: (id: string) => {
            this.router.navigate(['./../user-detail', id], {
              relativeTo: this.activatedRoute,
            });
          },
        },
      },
      { field: 'email', headerName: 'Email', minWidth: 300 },
      // {
      //   field: 'createdTimestamp',
      //   valueFormatter: (p) => moment(p.value).format('MMM Do YYYY, h:mm a'),
      //   headerName: 'Created At',
      // },
      {
        field: 'enabled',
        headerName: 'Status',
        cellRenderer: ComplianceRendererComponent,
        cellRendererParams: {
          positiveTooltip: 'Active',
          negativeTooltip: 'InActive',
        },
        minWidth: 75,
      },
      {
        headerName: 'Action',
        cellRenderer: IconRendererComponent,
        minWidth: 50,
        cellRendererParams: {
          src: 'assets/icons/delete-icon.svg',
          tooltip: 'delete',
          field1: 'id',
          field2: 'username',
          clicked: (id: string, username: string) => {
            this.confirmationService
              .confirm(
                'Delete User',
                'Are you sure want to delete the user?',
                true,
                undefined,
                undefined,
                undefined,
                username
              )
              .then(async (val) => {
                if (val) {
                  try {
                    await this.authService.kcAdminClient.users.del({ id });
                    this.toastr.success('User Deleted!');
                    await this.ngOnInit();
                  } catch (err) {
                    this.toastr.error('Failed to delete user!');
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
  count = 0;

  async ngOnInit() {
    try {
      this.spinner.show();
      const rowData = await this.authService.kcAdminClient.users.find();
      this.gridApi.setRowData(rowData);
      this.count = rowData.length;
      this.spinner.hide();
    } catch (e) {
      console.log(e);
      this.toastr.error('Failed to fetch user List.');
    }
  }

  onCreateNewUser() {
    this.router.navigate(['./../create-user'], {
      relativeTo: this.activatedRoute,
    });
  }
}
