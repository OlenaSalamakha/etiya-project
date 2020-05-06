import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatStepperModule } from "@angular/material/stepper";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { MainComponent } from "./main/main.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { FooterComponent } from "./footer/footer.component";
import { CreateUserComponent } from "./main/create-user/create-user.component";
import { MainPageComponent } from "./main/main-page/main-page.component";
import { CompareValidatorDirective } from "./shared/directives/compare-validator.directive";
import { AddressComponent } from "./main/address/address.component";

import { UserInfoComponent } from "./main/user-info/user-info.component";
import { LoadingSpinnerComponent } from "./shared/loading-spinner/loading.spinner.component";
import { RegistrationComponent } from "./main/registration/registration.component";
import { CountryService } from "./shared/services/country.service";
import { MatConfirmDialogComponent } from "./main/mat-confirm-dialog/mat-confirm-dialog.component";
import { EditUserComponent } from "./main/edit-user/edit-user.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    SidebarComponent,
    FooterComponent,
    CreateUserComponent,
    MainPageComponent,
    CompareValidatorDirective,
    AddressComponent,
    UserInfoComponent,
    LoadingSpinnerComponent,
    RegistrationComponent,
    MatConfirmDialogComponent,
    EditUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule,
  ],
  providers: [CountryService],
  bootstrap: [AppComponent],
  entryComponents: [
    UserInfoComponent,
    MatConfirmDialogComponent,
    EditUserComponent,
  ],
})
export class AppModule {}
