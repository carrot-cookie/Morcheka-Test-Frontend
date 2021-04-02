import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pageable} from '../../../entities/pageable';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Input() pageable: EventEmitter<Pageable<any>> = null;
  @Output() contentChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  currentPage: number;

  pages: number[];

  constructor() { }

  ngOnInit(): void {
    this.pageable.subscribe(next => {
      this.pages = Array(next.totalPages);
      this.currentPage = next.number;
      this.contentChange.emit(next.content);
    });
  }

  public changePage(pageNumber: number): void {
    this.pageChange.emit(pageNumber);
  }
}
