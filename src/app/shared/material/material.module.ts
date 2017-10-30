import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatInputModule
} from '@angular/material';

@NgModule({
    imports: [
      MatButtonModule,
      MatCardModule,
      MatGridListModule,
      MatInputModule
    ],
    declarations: [],
    exports: [
      MatButtonModule,
      MatCardModule,
      MatGridListModule,
      MatInputModule
    ]
}) export class MaterialModule {}
