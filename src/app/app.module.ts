import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EmpdetailsComponent } from './empdetails/empdetails.component';
import { UpdatedetailsComponent } from './updatedetails/updatedetails.component';

const MyRoutes: Routes = [{ path: 'empdetails', component: EmpdetailsComponent },
{ path: 'adddetails', component: UpdatedetailsComponent }]

@NgModule({
  declarations: [
    AppComponent,
    EmpdetailsComponent,
    UpdatedetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(MyRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
