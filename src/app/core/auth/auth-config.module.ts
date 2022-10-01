import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';

@NgModule({
  imports: [AuthModule.forRoot({
    config: {
        authority: 'http://localhost:8180/realms/stock-market',
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'stock-market-frontend',
        scope: 'openid profile offline_access', // 'openid profile offline_access ' + your scopes
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        renewTimeBeforeTokenExpiresInSeconds: 30,
      }
    })],
  exports: [AuthModule],
})
export class AuthConfigModule {}
