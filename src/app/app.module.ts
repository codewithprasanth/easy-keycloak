import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgbDropdownModule,
  NgbModalModule,
  NgbPaginationModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgGridModule } from 'ag-grid-angular';
import { KeycloakAngularModule } from 'keycloak-angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { ToggleRendererComponent } from 'src/components/ag-grid/toggle-renderer/toggle-renderer.component';
import { GdbCheckboxComponent } from 'src/components/gdb-checkbox/gdb-checkbox.component';
import { PageSizeComponent } from 'src/components/page-size/page-size.component';
import { SearchBoxComponent } from 'src/components/search-box/search-box.component';
import { SelectionCheckboxComponent } from 'src/components/selection-checkbox/selection-checkbox.component';
import { ToggleComponent } from 'src/components/toggle/toggle.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { AgTooltipComponent } from '../components/ag-grid/ag-tooltip/ag-tooltip.component';
import { LinkRendererComponent } from '../components/ag-grid/link-renderer/link-renderer.component';
import { ConfirmationComponent } from '../components/confirmation/confirmation.component';
import { GdbBtnComponent } from '../components/gdb-btn/gdb-btn.component';
import { SelectionToggleComponent } from '../components/selection-toggle/selection-toggle.component';
import { CountPipe } from '../pipes/count.pipe';
import { ButtonRendererComponent } from 'src/components/ag-grid/button-renderer/button-renderer.component';
import { ComplianceRendererComponent } from 'src/components/ag-grid/compliance-renderer/compliance-renderer.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { YearPickerComponent } from 'src/components/year-picker/year-picker.component';
import { TabComponent } from 'src/components/tab/tab.component';
import { AgInfoIconRendererComponent } from 'src/components/ag-grid/ag-info-icon-renderer/ag-info-icon-renderer.component';
import { AgActionButtonsRendererComponent } from 'src/components/ag-grid/ag-action-buttons-renderer/ag-action-buttons-renderer.component';
import { NumberInputDirective } from 'src/components/number-input/number-input.directive';
import { NumberInputComponent } from 'src/components/number-input/number-input.component';
import { AgFlagOverrideRendererComponent } from 'src/components/ag-grid/ag-flag-override-renderer/ag-flag-override-renderer.component';
import { TextInputComponent } from 'src/components/text-input/text-input.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TokenGenComponent } from './pages/token-gen/token-gen.component';
import { AuthComponent } from './pages/auth/auth.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ConfigurationComponent } from './page-chunks/configuration/configuration.component';
import { LoginComponent } from './page-chunks/login/login.component';
import { StartComponent } from './page-chunks/start/start.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { CreateRoleComponent } from './pages/create-role/create-role.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBoxComponent,
    GdbCheckboxComponent,
    SelectionCheckboxComponent,
    PageSizeComponent,
    ToggleComponent,
    ToggleRendererComponent,
    LinkRendererComponent,
    ConfirmationComponent,
    CountPipe,
    SelectionToggleComponent,
    GdbBtnComponent,
    AgTooltipComponent,
    ButtonRendererComponent,
    ComplianceRendererComponent,
    YearPickerComponent,
    TabComponent,
    AgInfoIconRendererComponent,
    AgActionButtonsRendererComponent,
    NumberInputComponent,
    NumberInputDirective,
    AgFlagOverrideRendererComponent,
    TextInputComponent,
    UserManagementComponent,
    ProfileComponent,
    TokenGenComponent,
    AuthComponent,
    DashboardComponent,
    ConfigurationComponent,
    LoginComponent,
    StartComponent,
    UserDetailComponent,
    CreateUserComponent,
    EditUserComponent,
    CreateRoleComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    NgSelectModule,
    NgbPaginationModule,
    NgbModalModule,
    KeycloakAngularModule,
    BreadcrumbModule,
    HttpClientModule,
    KeycloakAngularModule,
    AgGridModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-center',
    }),
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgbDropdownModule,
    NgbTooltipModule,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
