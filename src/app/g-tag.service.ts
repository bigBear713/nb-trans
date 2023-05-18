import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import { NbTransService } from 'nb-trans';
dayjs.extend(utc);

const defaultGtag = () => { };
const gtag = (window as any).gtag || defaultGtag;

@Injectable({
  providedIn: 'root'
})
export class GTagService {

  website_id = '@bigbear713/nb-trans';

  constructor(
    private router: Router,
    private transService: NbTransService,
  ) { }

  trackPage(props: object): void {
    this.trackEvent('View_Page', props);
  }

  trackButton(props: object): void {
    this.trackEvent('Click_Button', props);
  }

  trackLink(props: object): void {
    this.trackEvent('Visit_Link', props);
  }

  private trackEvent(eventName: string, props: object): void {
    const trackProps = {
      datetime: dayjs().utc().format(),
      website_id: this.website_id,
      url: this.router.url,
      language: this.transService.lang,
      ...props,
    };
    gtag('event', eventName, trackProps);
  }

}
