import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";


export abstract class BaseEntityService<T> {
    protected readonly http = inject(HttpClient);

    constructor(protected resourceUrl:string){};

    abstract getIdentity(entity:T):string | number;

    create(entity:Omit<T, 'id'>):Observable<T>{
        return this.http.post<T>(this.resourceUrl, entity);
    }

    update(entity:T):Observable<T> {
        const id = this.getIdentity(entity);
        return this.http.put<T>(`${this.resourceUrl}/${id}` ,entity);
    }

    find(id: string | number):Observable<T>{
        return this.http.get<T>(`${this.resourceUrl}/${id}`);
    }

    query():Observable<T[]>{
        return this.http.get<T[]>(this.resourceUrl);
    }

    delete(id:string | number):Observable<void>{
        return this.http.delete<void>(`${this.resourceUrl}/${id}`);
    }
}