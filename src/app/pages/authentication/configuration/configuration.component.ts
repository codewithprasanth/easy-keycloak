import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth-service';

export interface ConfigurationFormType {
  baseUrl: string | null;
  realm: string | null;
}

@Component({
  selector: 'configuration',
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss',
})
export class ConfigurationComponent {
  @Output() submitConfig = new EventEmitter<ConfigurationFormType>();
  @Output() editConfig = new EventEmitter<void>();
  constructor(private readonly authService: AuthService) {}
  configurationSubmitted = false;

  configurationForm = new FormGroup({
    baseUrl: new FormControl('', Validators.required),
    realm: new FormControl('', Validators.required),
  });

  submitConfiguration() {
    this.configurationForm.disable();
    this.configurationSubmitted = true;
    this.authService.baseUrl = this.configurationForm.value.baseUrl as string;
    this.authService.realm = this.configurationForm.value.realm as string;
    this.submitConfig.emit(
      this.configurationForm.value as ConfigurationFormType
    );
  }
  editConfiguration() {
    this.editConfig.emit();
    this.configurationSubmitted = false;
    this.configurationForm.enable();
  }
}
