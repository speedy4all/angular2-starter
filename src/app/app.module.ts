import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from './start/app.component';

import { NavComponent } from './shared/navbar.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { AppRoutingModule } from './shared/app.routing';
import { AdminModule } from './admin/admin.module';
import { PostDetailComponent } from './blogDetail/blog-detail.component';

@NgModule({
    imports: [
        BrowserModule,
        AdminModule,
        AppRoutingModule,
    ],
    declarations: [
        AppComponent,
        NavComponent,
        HomeComponent,
        ErrorComponent,
        PostDetailComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
