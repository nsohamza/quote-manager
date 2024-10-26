export interface Quote {
  id?: number;                // Optional for new quotes
  text: string;               // The quote text
  author: string;             // The author of the quote
  bookId: number;             // The ID of the book associated with the quote
}
