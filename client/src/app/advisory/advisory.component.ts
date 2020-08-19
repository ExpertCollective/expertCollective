import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../home/language.service';

@Component({
  selector: 'app-advisory',
  templateUrl: './advisory.component.html',
  styleUrls: ['./advisory.component.scss']
})
export class AdvisoryComponent implements OnInit {

  constructor(languageService: LanguageService, translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang(languageService.lang);

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(languageService.lang);
  }

  ngOnInit() {
  }

}
