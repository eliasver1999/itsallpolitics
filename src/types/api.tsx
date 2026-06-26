export enum ApiKind {
  GETBLOGS = "getblog",
  GETCATEGORIES = "getcategory",
  SENDEMAIL = "contact",
  // Images are served by the backend; paths are relative (e.g. "images/foo.jpg").
  // Trailing slash is required. Local backend below; prod commented.
  // IMAGE = "http://127.0.0.1:8000/",
  IMAGE = "https://api.itsallpolitics.gr/",
}
