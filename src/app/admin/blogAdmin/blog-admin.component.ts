import { Component, OnInit } from '@angular/core';
import { UserService } from '../adminShared/user.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { BlogAdminService } from './../adminShared/blog-admin.service';
import { Blog } from '../adminShared/blog';

@Component({
    templateUrl: './blog-admin.component.html',
    styleUrls: ['./blog-admin.component.css']
})

export class BlogAdminComponent implements OnInit {
    theUser: string;
    menuChoice: string;
    blogPosts: Blog[];
    formDisplay: boolean = true;
    singlePost: Blog;

    constructor(
        private userService: UserService,
        private router: Router,
        private blogService: BlogAdminService
    ) { }
    
    logout() {
        this.userService.logout();
        this.router.navigate(['']);
    }

    chooseMode(mode: string) {
        this.menuChoice = mode;
    }

    ngOnInit() {
        this.theUser = this.userService.loggedInUser;
        this.getPosts();
    }

    getPosts() { 
        const dbRef = firebase.database().ref('blogPosts/');
        dbRef.once('value')
            .then((snapshot) => {
                let tmp: string[] = snapshot.val();
                this.blogPosts = Object.keys(tmp).map(key => tmp[key]);
            });
    }

    editPost(post: Blog) {
        this.singlePost = post;
        this.formDisplay = false;
    }

    cancelEdit() {
        this.formDisplay = true;
    }

    updatePost(post: Blog) {
        this.blogService.editPost(post);
        this.formDisplay = true;
    }

    deletePost(post: Blog) {
        let verify = confirm(`Are you sure to delete this post ?`);
        if (verify) {
            this.blogService.removePost(post);
            this.router.navigate(['/admin/']);
        } else { 
            alert(`Deletion aborted`);
        }
    }
}