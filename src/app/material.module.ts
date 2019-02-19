import {
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatStepperModule,
    MatListModule,
    MatCardModule,
    MatSnackBarModule
} from '@angular/material';
import { NgModule } from '@angular/core';


@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatInputModule, MatSelectModule, MatChipsModule, MatStepperModule, MatListModule,
        MatCardModule, MatSnackBarModule],
    exports: [MatButtonModule, MatCheckboxModule, MatInputModule, MatSelectModule, MatChipsModule, MatStepperModule, MatListModule,
        MatCardModule, MatSnackBarModule],
})
export class MaterialModule { }
