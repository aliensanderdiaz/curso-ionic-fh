import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from "../../environments/environment";
import { Article, NewsResponse } from '../interfaces';

const API_KEY = environment.API_KEY

@Injectable({
  providedIn: 'root'
})
export class NewsService {


  constructor(
    private http: HttpClient
  ) { }

  getTopHeadlines():Observable<Article[]> {
    return this.http
    .get<NewsResponse>('https://newsapi.org/v2/everything?q=chapo&from=2023-01-01&sortBy=publishedAt',{
      params: {
        apiKey: API_KEY
      }
    })
    .pipe(
      map(({ articles }) => articles)
    )
  }
}
