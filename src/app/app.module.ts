import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { BASE_URL } from './shared/injectors/base-url';
import { environment } from '../environments/environment';
import { GamesModule } from './features/games/games.module';
import { SOCKET_ENDPOINT } from './shared/injectors/socket-endpoint';
import { LiveFeedModule } from './features/live-feed/live-feed.module';
import { HeaderComponent } from './shared/components/header/header.component';
import { LayoutComponent } from './shared/components/layout/layout.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, LayoutComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    LiveFeedModule,
    GamesModule,
  ],
  providers: [
    { provide: BASE_URL, useValue: environment.baseUrl },
    { provide: SOCKET_ENDPOINT, useValue: environment.socketEndpoint },
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
