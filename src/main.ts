import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
.catch(err => console.error(err));

/// the bootstrapfile which is main.ts
// the point of this file is to what will be loaded up
// at the start of the application. 

// calls the bootstrapapplication and passes the appcomponent 
// at the applications entry point. 
