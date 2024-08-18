import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)

// import { bootstrapApplication } from '@angular/platform-browser';

//only for standalone components
// bootstrapApplication(AppComponent)
//   .catch(err => console.error(err));
