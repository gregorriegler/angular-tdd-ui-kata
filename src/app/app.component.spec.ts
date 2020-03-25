import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthenticationService } from './authentication.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let authenticationServiceMock: AuthenticationService;

  beforeEach(async(() => {
    authenticationServiceMock = jasmine.createSpyObj(['requestLogin']);
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  // Window title or page title or border title is "Login to Clean Code Center"
  describe('Title', () => {

    it(`should have as title 'Login to Clean Code Center'`, () => {
      expect(app.title).toEqual('Login to Clean Code Center');
    });

    it('should render title', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('.content span').textContent).toContain('Login to Clean Code Center app is running!');
    });
  });

  it('should contain a user name field, which is limited to 20 characters.', () => {
    const compiled = fixture.nativeElement;

    const input = compiled.querySelector('[name="username"]');
    expect(input).toBeTruthy();
    expect(input.maxLength).toEqual(20);
  });

  it('should contain "Log in" button in the bottom right corner of the window.', () => {
    const compiled = fixture.nativeElement;

    const button = compiled.querySelector('[name="login"]');
    expect(button.textContent).toBe('Log in');
  });

  it('should submit credentials on "Log in".', () => {
    const compiled = fixture.nativeElement;

    const input = compiled.querySelector('[name="username"]');
    input.textContent = 'user';

    const button = compiled.querySelector('[name="login"]');
    button.click();

    expect(authenticationServiceMock.requestLogin).toHaveBeenCalledWith('user');
  });

});
