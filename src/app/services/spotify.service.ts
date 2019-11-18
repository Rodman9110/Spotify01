import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';

//el map permite filtar los resultados de la API
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  getQuery(query: string){
    const url = `https://api.spotify.com/v1/${query}`;

    //la autorizacion caduca cada hora , se tiene que cambiar
    const headers = new HttpHeaders({
      Authorization:
      "Bearer BQBdwyDYoD4jds0prcN1at7uYwXIKnIe7Qte3-MkKKE2ezMQWPeNwq4Km4uyguBcfwu0zi79w6QbV2pwmng"
    });
    return this.http.get(url,{headers});

  }
  
  //Cuando API Spotify envia la respuesta envia demasiada informacion y MAP
  //simplemente me filtra lo que a mi me sirve

  getNewReleases() {
    return this.getQuery("browse/new-releases?limit=20").pipe(
      map(data => data["albums"].items)
    );
  }

  // Referente al Search

  getArtistas(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`).pipe(
      map(data => data["artists"].items)
    );
  }

  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);
     //.pipe( map( data => data['artists'].items));
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`).pipe(
      map(data => data["tracks"])
    );
  }
}
