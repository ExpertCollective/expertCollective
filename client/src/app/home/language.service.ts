import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() { 
    const htmlLang = navigator.language;
    this._lang = htmlLang.slice(0, 2);
    console.log("language ", this._lang);
  }
  
  private _lang : string;
  public get lang() : string {
    return this._lang;
  }
  
}
