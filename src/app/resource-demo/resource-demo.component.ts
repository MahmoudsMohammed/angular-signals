import {
  Component,
  effect,
  inject,
  OnInit,
  resource,
  signal,
} from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { environment } from '../../environments/environment';
import { Lesson } from '../models/lesson.model';
import { MessagesService } from '../messages/messages.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';

@Component({
  selector: 'resource-demo',
  templateUrl: './resource-demo.component.html',
  styleUrls: ['./resource-demo.component.scss'],
  imports: [MatProgressSpinner],
})
export class ResourceDemoComponent implements OnInit {
  env = environment;
  search = signal<string>('');
  _messageService = inject(MessagesService);
  _http = inject(HttpClient);
  count = signal<number>(0);
  lessons = resource<Lesson[], { search: string; count: number }>({
    request: () => ({ search: this.search(), count: this.count() }),
    loader: async (options) => {
      console.log('Request =====> ', options.request);
      const httpRequest = this._http
        .get(
          `${this.env.apiRoot}/search-lessons?query=${options.request.search}`
        )
        .pipe(map((data: any) => data?.lessons));
      return firstValueFrom(httpRequest);
    },
  });

  constructor() {}

  ngOnInit(): void {}

  searchLessons(search: string) {
    this.search.set(search);
  }

  reset() {
    this.count.update((c) => ++c);
  }

  reload() {
    this.lessons.reload();
  }
}
