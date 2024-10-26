export interface Book {
  id?: number;                // Optional for new books (not yet saved)
  title: string;              // Title of the book
  author: string;             // Author of the book
  publicationDate: string;    // Publication date of the book
}
