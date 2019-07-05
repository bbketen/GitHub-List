import { Pipe, PipeTransform } from '@angular/core';
import { User } from './user';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {


  transform(value: User[], filterText?: string): User[] {
    if(filterText.length > 2){
      filterText = filterText?filterText.toLocaleLowerCase():null;
      let userstmp = localStorage.getItem('favourites'); 
      let user = JSON.parse(userstmp);
      return filterText?value.filter((u:any) => u.login.toLocaleLowerCase().indexOf(filterText)!==-1):value;
    }
  }

}
