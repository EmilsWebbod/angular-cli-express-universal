import {NgModule} from '@angular/core';
import {MdButtonModule, MdCardModule, MdGridListModule, MdInputModule} from '@angular/material';

@NgModule({
    imports: [
      MdCardModule,
      MdGridListModule,
      MdInputModule,
      MdButtonModule
    ],
    declarations: [],
    exports: [
      MdCardModule,
      MdGridListModule,
      MdInputModule,
      MdButtonModule
    ]
}) export class MaterialModule {}
