import { Component, OnInit } from '@angular/core';
import { Credentials } from '@keycloak/keycloak-admin-client/lib/utils/auth';
import { GridOptions } from 'ag-grid-community';
import { ConfirmationService } from '../../../components/confirmation/confirmation.service';
import { ButtonRendererComponent } from '../../../components/ag-grid/button-renderer/button-renderer.component';
import { defaultGridOptions } from 'src/components/ag-grid/grid-util';
import { AuthService } from 'src/app/auth/auth-service';
import * as moment from 'moment';
import { AgActionButtonsRendererComponent } from 'src/components/ag-grid/ag-action-buttons-renderer/ag-action-buttons-renderer.component';
import { ComplianceRendererComponent } from 'src/components/ag-grid/compliance-renderer/compliance-renderer.component';

@Component({
  selector: 'user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss',
})
export class UserManagementComponent implements OnInit {
  constructor(
    private confirmationService: ConfirmationService,
    private authService: AuthService
  ) {}

  geodb = {
    dev: {
      base: {
        baseUrl: 'https://digitalauthdev.olamnet.com/auth',
        realmName: 'geodb-dev',
      },
      specific: {
        username: 'super_admin',
        password: 'Geodb@123',
        grantType: 'password',
        clientId: 'ofi-portal',
      } as Credentials,
    },
    sit: {
      base: {
        baseUrl: 'https://digitalauthdev.olamnet.com/auth',
        realmName: 'geodb-sit',
      },
      specific: {
        username: 'super_admin',
        password: 'Geodb@123',
        grantType: 'password',
        clientId: 'ofi-portal',
      } as Credentials,
    },
    uat: {
      base: {
        baseUrl: 'https://digitalauthdev.olamnet.com/auth',
        realmName: 'geodb-uat',
      },
      specific: {
        username: 'super_admin',
        password: 'Geodb@123',
        grantType: 'password',
        clientId: 'ofi-portal',
      } as Credentials,
    },
    prod: {
      base: {
        baseUrl: 'https://digitalauth.olamnet.com/auth',
        realmName: 'geodb',
      },
      specific: {
        username: 'super_admin',
        password: 'Geodb@123',
        grantType: 'password',
        clientId: 'ofi-portal',
      } as Credentials,
    },
  };

  gridApi: any;
  gridOptions: GridOptions = {
    ...defaultGridOptions,
    columnDefs: [
      { field: 'id', headerName: 'Keycloak ID' },
      { field: 'firstName', headerName: 'First Name' },
      { field: 'lastName', headerName: 'Last Name' },
      { field: 'username', headerName: 'User Name' },
      { field: 'email', headerName: 'Email' },
      {
        field: 'createdTimestamp',
        valueFormatter: (p) => moment(p.value).format('MMM Do YYYY, h:mm a'),
        headerName: 'Created At',
      },
      {
        field: 'enabled',
        headerName: 'Status',
        cellRenderer: ComplianceRendererComponent,
      },
      {
        headerName: 'Action',
        cellRenderer: ButtonRendererComponent,
        cellRendererParams: {
          field1: 'id',
          clicked: (id: string) => {
            // this.router.navigate(['./../view-user', userId], {
            //   relativeTo: this.activatedRoute,
            // });
            alert(id);
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
      const rowData = await this.authService.kcAdminClient.users.find();
      console.log(rowData);
      this.gridApi.setRowData(rowData);
    } catch (e) {
      console.log(e);
    }
  }
}
