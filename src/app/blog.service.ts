import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  blogData = {};

  constructor(
    private http: HttpClient,
  ) { }

  getBlogData() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }
}