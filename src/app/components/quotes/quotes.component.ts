import { Component, OnInit } from '@angular/core';
import { QuoteService } from '../../services/quote.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
  quotes: any[] = [];
  newQuote: string = ''; // Input for the new quote


  constructor(private quoteService: QuoteService) {}
  ngOnInit(): void {
    this.fetchQuotes();
  }

  fetchQuotes() {
    this.quoteService.getQuotes().subscribe(data => {
      this.quotes = data;
    });
  }
  addQuote() {
    if (this.newQuote.trim()) {
      this.quoteService.addQuote({ text: this.newQuote }).subscribe((quote) => {
        this.quotes.push(quote); // Add the new quote to the local list
        this.newQuote = ''; // Clear the input field
      });
    } else {
      alert('Please enter a quote!');
    }
  }
}
