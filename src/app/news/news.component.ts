import { Component, OnInit } from '@angular/core';

import { BlogService } from '../blog.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  blogData: any[] = [];

  constructor(
    private blogService: BlogService
  ) {
    this.blogService.getBlogData().subscribe((data:any) => {
      this.blogData = data;
    });
  }

  ngOnInit(): void {
  }

}
