import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MenunavComponent } from './menunav.component';
import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { HttpLoaderFactory } from 'src/app/app.module';

xdescribe('MenunavComponent', () => {
  let component: MenunavComponent;
  let fixture: ComponentFixture<MenunavComponent>;
  let translations: any = {"TEST": "This is a test"};

  class FakeLoader implements TranslateLoader {
    getTranslation(lang: string): Observable<any> {
      return of(translations);
    }
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forChild({
          loader: {provide: HttpLoaderFactory, useClass: FakeLoader}
        })
      ],
      providers: [TranslateService, TranslateStore],
      declarations: [ MenunavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenunavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
