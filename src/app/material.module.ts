import {
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatStepperModule,
    MatListModule,
    MatCardModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule
} from '@angular/material';
import { NgModule } from '@angular/core';


@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatInputModule, MatSelectModule, MatChipsModule, MatStepperModule, MatListModule,
        MatCardModule, MatSnackBarModule, MatToolbarModule, MatIconModule],
    exports: [MatButtonModule, MatCheckboxModule, MatInputModule, MatSelectModule, MatChipsModule, MatStepperModule, MatListModule,
        MatCardModule, MatSnackBarModule, MatToolbarModule, MatIconModule],
})
export class MaterialModule { }
