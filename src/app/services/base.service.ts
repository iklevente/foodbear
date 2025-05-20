import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';


export abstract class BaseService<EntityType> {



  constructor(protected http: HttpClient, protected endPoint:string) { 
  
  }

  create(entity:any){
      return lastValueFrom(this.http.post<EntityType>(`/api/create${this.endPoint}`, entity));
  }

  get(id:number){
    return lastValueFrom(this.http.get<EntityType>(`/api/${this.endPoint}/${id}`));
  }

  getAll(){
    return lastValueFrom(this.http.get<EntityType[]>(`/api/${this.endPoint}`));
  }

  delete(id:number){
    return lastValueFrom(this.http.delete(`/api/${this.endPoint}/${id}`));
  }

  update(entity:any){
    return lastValueFrom(this.http.put<EntityType>(`/api/${this.endPoint}/${(entity as any).id}`, entity));
  }
}
