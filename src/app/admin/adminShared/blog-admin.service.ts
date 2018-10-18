import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Blog } from './blog';

@Injectable()

export class BlogAdminService {

    createPost(post: Blog) {
        const storageRef = firebase.storage().ref();
        storageRef.child(`images/${post.imgTitle}`).putString(post.img, 'base64')
            .then((snapshot) => {
                let url = snapshot.metadata.downloadURLs[0];
                const dbRef = firebase.database().ref('blogPosts/');
                const newPost = dbRef.push();
                newPost.set({
                    title: post.title,
                    content: post.content,
                    imgTitle: post.imgTitle,
                    img: url,
                    id: newPost.key
                });
            })
            .catch((error) => {
                alert(`failed upload ${error.message}`);
            });
    }

    editPost(post: Blog) {
        firebase.database().ref('/blogPosts').child(post.id)
            .update({
                title: post.title,
                content: post.content
            });
        alert(`post updated`);
    }

    removePost(post: Blog) {
        firebase.database().ref('/blogPosts').child(post.id).remove((error) => {
            if (error) { alert(`error: ${error}`) }
            alert(`Deleted post`);
        });
        firebase.storage().ref().child(`images/${post.imgTitle}`).delete()
            .then(() => alert(`Image deleted from storage`))
            .catch((error) => { alert(`Error deleting img: ${error.message}`) });
        
    }
}