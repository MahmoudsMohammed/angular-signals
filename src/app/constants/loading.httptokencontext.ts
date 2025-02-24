import { HttpContextToken } from '@angular/common/http';

export const displayLoader = new HttpContextToken(() => true);
