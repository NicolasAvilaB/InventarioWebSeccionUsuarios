import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosModificarComponent } from './usuarios-modificar.component';

describe('UsuariosModificarComponent', () => {
  let component: UsuariosModificarComponent;
  let fixture: ComponentFixture<UsuariosModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosModificarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
