import { Component } from "@angular/core";
import { Blog } from './../adminShared/blog';
import { BlogAdminService } from './../adminShared/blog-admin.service';
import { Router } from '@angular/router';



@Component({
    selector: 'add-menu',
    templateUrl: './blog-add.component.html'
})

export class BlogAddComponent {
    
    imageTitle: string;
    imageSRC: string;
    postTitle: string;
    content: string;
    post: Blog;

    constructor(private blogService: BlogAdminService, private router: Router) { }
    
    fileLoad($event: any) {
        let reader: FileReader = new FileReader();
        let file: File = $event.target.files[0];
        this.imageTitle = file.name;
        reader.readAsDataURL(file);

        reader.onload = (e: any) => { 
            this.imageSRC = e.target.result;
        }
    }

    createPost() { 
        this.post = new Blog(
            this.postTitle,
            this.content,
            this.imageTitle,
            this.imageSRC.substring(23)
        );
        this.blogService.createPost(this.post);
        alert(`${this.postTitle} added to posts`);
        this.router.navigate(['/admin']);
    }

    cancel() { 
        this.router.navigate(['/admin']);
    }
}