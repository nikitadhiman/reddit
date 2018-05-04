import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { debug } from 'util';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css'],
  providers: [DataService]
})
export class MainpageComponent implements OnInit {
  firstPage:any = [];
  size:any;
  title:any;
  atLeastOnce:any = false;
  firstPageData:any = [];
  fullPost:any = [];
  fullPostObject:any = [];
  fullPageCommentsObject:any = [];
  fullPageCommentsArray:any = [];
  fullPostComments:any = [];
  constructor(private router : Router,private dataService: DataService) { }

  ngOnInit() {
    this.getFirstPage();
  }

  getFirstPage()
  {
    this.dataService.getFirstPageData()
    .subscribe(res => {
      this.size = res.data.dist;
      this.firstPage = res.data.children;
      this.buildFirstPageData();

    });
  }

  buildFirstPageData()
  {
    for(var i =0; i<this.size;i++)
    {
      var imageExists = this.firstPage[i].data.preview;
      var rawTime = new Date(this.firstPage[i].data.created);
      var date = rawTime.getDate();
      var month = rawTime.getMonth();
      var year = rawTime.getFullYear();

      var formattedDate = date + "-" + month + "-"+ year;

      if(!imageExists){imageExists = 'assets/images/noimage.png';}
      else{
        if(imageExists.images[0].variants.gif){imageExists = 'assets/images/noimage.png';}else{
        imageExists = this.firstPage[i].data.preview.images[0].source.url;}
      }
     
      var obj = { 
        'title' : this.firstPage[i].data.title,
        'id' : this.firstPage[i].data.id,
        'likes': this.firstPage[i].data.ups,
        'created' : formattedDate,
        'comments': this.firstPage[i].data.num_comments,
        'permalink': this.firstPage[i].data.permalink,
        'image' : imageExists,
        'author': this.firstPage[i].data.author,
        'source':this.firstPage[i].data.domain,
        'subreddit_type':'',
        'url' : this.firstPage[i].data.url
      }

      this.firstPageData.push(obj);
    }
  }

  goToPost(event)
  {
    this.atLeastOnce = true;
    var target = event.target || event.srcElement || event.currentTarget;
    var postLink = target.id;
    this.dataService.getPostPage(postLink)
    .subscribe(res => {
      this.fullPost = res[0];
      this.fullPostComments = res[1];

      this.renderFullPostData();
      this.renderFullPostComments();
    });
  }

  renderFullPostData()
  {
    console.log(this.fullPost);
    var imageExists = this.fullPost.data.children[0].data.preview;

    if(!imageExists){imageExists = 'assets/images/noimage.png';}
      else{
        if(imageExists.images[0].variants.gif){imageExists = 'assets/images/noimage.png';}else{
        imageExists = this.fullPost.data.children[0].data.preview.images[0].source.url;}
      }


    this.fullPostObject = {
      'title': this.fullPost.data.children[0].data.title,
      'likes': this.fullPost.data.children[0].data.ups,
      'comments' : this.fullPost.data.children[0].data.num_comments,
      'time' : this.fullPost.data.children[0].data.created,
      'author': this.fullPost.data.children[0].data.author,
      'bannerImage':imageExists

    }

    console.log(this.fullPostObject);
    
  }

  renderFullPostComments()
  {
    var parentComments = this.fullPostComments.data.children;

    
    for(var i=0;i<parentComments.length;i++)
    {
      var wholeObject = [];
      var level1 = [];
      var parent = {
      'parentCommentTitle' :parentComments[i].data.body,
      'author': parentComments[i].data.author
       }

       wholeObject['parent'] = parent;

      if(parentComments[i].data.replies)
      {
        for(var j = 0; j< parentComments[i].data.replies.data.children.length;j++)
        {
        var level_1 = {
        'levelauthor_1' : parentComments[i].data.replies.data.children[j].data.author,
        'leveltitle_1' : parentComments[i].data.replies.data.children[j].data.body}
        level1[j] = level_1;
      
    //   if(parentComments[i].data.replies.data.children[j].data.replies)
  //{
    //debugger;
   //for(var k= 0 ;k<parentComments[i].data.replies.data.children[j].data.replies.data.children.length;k++){
          //var level_2 = {'levelauthor_2' : parentComments[i].data.replies.data.children[j].data.replies.data.children[k].data.author,
         //'leveltitle_2' : parentComments[i].data.replies.data.children[j].data.replies.data.children[k].data.title}
          //level2[k] = level_2;
         //}

        //level1.push(level2);
        // }
        }
        wholeObject.push(level1);
      }
      this.fullPageCommentsArray.push(wholeObject);
    }
    
    this.fullPageCommentsObject = this.toObject(this.fullPageCommentsArray);
    console.log(this.fullPageCommentsObject);
  }

  toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
      rv[i] = arr[i];
    return rv;
  }
}
