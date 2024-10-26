import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  book: Book = { id: 0, title: '', author: '', publicationDate: '' };
  isEdit: boolean = false;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.bookService.getBookById(+id).subscribe((data) => {
        if (data) {
          this.book = data;
        }
      });
    }
  }

  save(): void {
    if (this.bookService.validateBook(this.book)) {
      if (this.isEdit && this.book.id !== undefined) {
        this.bookService.updateBook(this.book.id, this.book).subscribe(() => {
          this.router.navigate(['/']);
        });
      } else {
        this.bookService.addBook(this.book).subscribe(() => {
          this.router.navigate(['/']);
        });
      }
    } else {
      alert('Please fill in all fields.');
    }
  }
}