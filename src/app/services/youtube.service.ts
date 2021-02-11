import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlayListItemsResponse, Video } from '../models/playlistItems-response';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

    /* https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=AIzaSyBmYpcKIGUMuctTuHzMGNRCTDbIrDVFTz8&playlistId=UUuaPTYj15JSkETGnEseaFFg&maxResults=10 */

  private baseUrl: string = 'https://www.googleapis.com/youtube/v3';
  
  params = {
    part: 'snippet',
    key: 'AIzaSyBmYpcKIGUMuctTuHzMGNRCTDbIrDVFTz8',
    playlistId: 'UUuaPTYj15JSkETGnEseaFFg',
    maxResults: '20',
    pageToken: ''
  };

  constructor( private http: HttpClient ) { }

  getVideos(): Observable<Video[]> {
    return this.http.get<PlayListItemsResponse>(`${this.baseUrl}/playlistItems`, { params: this.params })
               .pipe(map(res => {
                  this.params.pageToken = res.nextPageToken;
                  return res.items;
               }), map(items => {
                 return items.map(video => video.snippet);
               }));
  }
}
