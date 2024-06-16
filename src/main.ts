import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Add cookie parser middleware
  app.use(cookieParser());

  // Add CSRF protection middleware
  // app.use(csurf({ cookie: true }));

  // Middleware to set the CSRF token cookie
  // app.use((req, res, next) => {
  //   const csrfToken = req.csrfToken();
  //   res.cookie('XSRF-TOKEN', csrfToken);
  //   next();
  // });

  // Middleware to handle CSRF token errors
  // app.use((err, req, res, next) => {
  //   if (err.code === 'EBADCSRFTOKEN') {
  //     // CSRF token errors handling
  //     console.error('Invalid CSRF token:', err);
  //     return res.status(403).json({ message: 'Invalid CSRF token' });
  //   } else {
  //     next(err);
  //   }
  // });

  // Start the app
  await app.listen(3000);
}

bootstrap();
