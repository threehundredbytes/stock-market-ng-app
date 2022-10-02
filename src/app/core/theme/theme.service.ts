import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private isDarkModeEnabledSubject: BehaviorSubject<boolean>;
  public isDarkModeEnabled$: Observable<boolean>;

  constructor(private localStorageService: LocalStorageService, private overlayContainer: OverlayContainer) {
    let isDarkModeEnabled = this.localStorageService.getItem('is-dark-mode-enabled');

    if (isDarkModeEnabled === {}) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.localStorageService.setItem('is-dark-mode-enabled', true);
      } else {
        this.localStorageService.setItem('is-dark-mode-enabled', false);
      }
    }

    this.isDarkModeEnabledSubject = new BehaviorSubject<boolean>(isDarkModeEnabled);
    this.isDarkModeEnabled$ = this.isDarkModeEnabledSubject.asObservable();

    this.isDarkModeEnabled$.subscribe(isDarkModeEnabled => {
      const classList = this.overlayContainer.getContainerElement().classList;

      const toRemove = Array.from(classList).filter(name => name.includes('-theme'));

      if (toRemove.length) {
        classList.remove(...toRemove);
      }

      classList.add(isDarkModeEnabled ? 'dark-theme' : 'light-theme');
    });
  }

  public toggleTheme() {
    let isDarkModeEnabled = this.isDarkModeEnabledSubject.value;
    isDarkModeEnabled = !isDarkModeEnabled;

    this.isDarkModeEnabledSubject?.next(isDarkModeEnabled);
    this.localStorageService.setItem('is-dark-mode-enabled', isDarkModeEnabled);
  }
}
