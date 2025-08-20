import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AddInteractComponent } from './add-interact/add-interact.component';

@NgModule({
  imports: [BrowserModule],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  declarations: [
    AddInteractComponent
  ],
})
export class AppModule {}
