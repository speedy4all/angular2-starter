import { Component, OnInit } from "@angular/core";
import { Blog } from './../admin/adminShared/blog';
import { ActivatedRoute, Router } from "@angular/router";
import * as firebase from 'firebase';

@Component({
    templateUrl: './blog-detail.component.html',
    styleUrls: ['./blog-detail.component.css']
})

export class PostDetailComponent implements OnInit {
    singlePost: Blog;

    constructor(private route: ActivatedRoute, private router: Router) { }
    
    ngOnInit() {
        let postId = this.route.snapshot.params['id'];
        this.getSingle(postId);
    }

    getSingle(id: string) {
        const db = firebase.database().ref('blogPosts');
        db.orderByChild('id')
            .equalTo(id)
            .once('value')
            .then((snapshot) => { 
                let tmp = snapshot.val();
                let transform = Object.keys(tmp).map(key => tmp[key]);
                let title = transform[0].title;
                let content = transform[0].content;
                let imgTitle = transform[0].imgTitle;
                let img = transform[0].img;
                this.singlePost = new Blog(title, content, imgTitle, img);
            });
    }

}