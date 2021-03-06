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

  it(`should have title 'Login to Clean Code Center'`, () => {
    expect(app.title).toEqual('Login to Clean Code Center');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;

    expect(compiled.querySelector('.content span').textContent).
      toBe('Login to Clean Code Center');
  });

  it('should contain a user name field, which is limited to 20 characters.', () => {
    const compiled = fixture.nativeElement;

    const input = compiled.querySelector('[name="username"]');
    expect(input).toBeTruthy();
    expect(input.maxLength).toEqual(20);
  });

  it('should contain label "Phone, email or username" left, next to the input field.', () => {
    const compiled = fixture.nativeElement;

    const labels: NodeList = compiled.querySelectorAll('label');
    const userNameLabel = Array.from(labels).
      find((label) => label.textContent === 'Phone, email or username');
    const id = (userNameLabel as Element).getAttribute('for');
    const input = compiled.querySelector('[id="' + id + '"]');
    expect(input.name).toBe('username');
  });

  it('should contain "Log in" button in the bottom right corner of the window.', () => {
    const compiled = fixture.nativeElement;

    const button = compiled.querySelector('[name="login"]');
    expect(button.textContent).toBe('Log in');
  });

  describe('button "Log in" clicked', () => {
    // User name and password given, button "Log in" clicked, backend reports success, then the form is closed.

    it('should submit credentials.', () => {
      const compiled = fixture.nativeElement;

      const input = compiled.querySelector('[name="username"]');
      input.textContent = 'user';

      const button = compiled.querySelector('[name="login"]');
      button.click();

      expect(authenticationServiceMock.requestLogin).toHaveBeenCalledWith('user');
    });

  });
});
