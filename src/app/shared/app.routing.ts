import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { ErrorComponent } from '../error/error.component';
import { PostDetailComponent } from '../blogDetail/blog-detail.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'post/:id' , component: PostDetailComponent},
            { path: '', component: HomeComponent },
            { path: '**' , component: ErrorComponent }
        ])    
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}

