import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {AuthenticationService} from "./authentication.service";

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let authenticationServiceMock;

  beforeEach(async(() => {
    authenticationServiceMock = jasmine.createSpyObj(['requestLogin']);
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: AuthenticationService, useValue: authenticationServiceMock}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'uiKata'`, () => {
    expect(app.title).toEqual('uiKata');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('uiKata app is running!');
  });

  it('should contain a user name field, which is limited to 20 characters.', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.nativeElement;

    let input = compiled.querySelector('[name="username"]');
    expect(input).toBeTruthy();
    expect(input.maxLength).toEqual(20);
  });

  it('should contain "Log in" button in the bottom right corner of the window.', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.nativeElement;

    let button = compiled.querySelector('[name="login"]');
    expect(button.textContent).toBe("Log in");
  });

  it('should submit credentials on "Log in".', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.nativeElement;

    let input = compiled.querySelector('[name="username"]');
    input.textContent = "user";

    let button = compiled.querySelector('[name="login"]');
    button.click();

    expect(authenticationServiceMock.requestLogin).toHaveBeenCalledWith("user");
  });

});
