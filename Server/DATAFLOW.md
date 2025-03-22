```mermaid
erDiagram
    USER {
      String id PK
      String email UNIQUE
      String name
      String password
      Role role
      DateTime createdAt
      DateTime updatedAt
    }
    
    PRODUCT {
      String id PK
      String name
      Float price
      Float? saleprice
      Int stock
      Category category
      EventType event
      String image
      DateTime createdAt
      DateTime updatedAt
    }
    
    ORDER {
      String id PK
      String userId FK
      Json products
      Status status
      Float total
      DateTime createdAt
    }
    
    ADDRESS {
      String id PK
      String userId FK
      String street
      String city
      String postalCode
      String country
      Boolean isDefault
      DateTime createdAt
      DateTime updatedAt
    }
    
    COMMENT {
      String id PK
      String userId FK
      String? productId FK
      String? articleId FK
      String content
      DateTime createdAt
      DateTime updatedAt
    }
    
    ARTICLE {
      String id PK
      String title
      String content
      String authorId FK
      ArticleCategory category
      DateTime publishedAt
      DateTime createdAt
      DateTime updatedAt
    }
    
    QUOTEREQUEST {
      String id PK
      String userId FK
      DateTime eventDate
      EventType eventType
      String description
      Status status
      DateTime createdAt
      DateTime updatedAt
    }
    
    CART {
      String id PK
      String userId FK
      DateTime createdAt
      DateTime updatedAt
    }
    
    CARTITEM {
      String id PK
      String cartId FK
      String productId FK
      Int quantity
    }
    
    REVIEW {
      String id PK
      String userId FK
      String productId FK
      Int rating
      String content
      DateTime createdAt
      DateTime updatedAt
    }
    
    %% Relationships for User
    USER ||--o{ ORDER : "places"
    USER ||--o{ ADDRESS : "has"
    USER ||--o{ COMMENT : "writes"
    USER ||--o{ ARTICLE : "authors"
    USER ||--o{ QUOTEREQUEST : "submits"
    USER ||--o{ CART : "owns"
    USER ||--o{ REVIEW : "writes"
    
    %% Relationships for Product
    PRODUCT ||--o{ COMMENT : "receives"
    PRODUCT ||--o{ REVIEW : "receives"
    PRODUCT ||--o{ CARTITEM : "is added to"
    
    %% Relationships for Article
    ARTICLE ||--o{ COMMENT : "receives"
    
    %% Relationships for Cart and CartItem
    CART ||--o{ CARTITEM : "contains"
    
    %% Relationships for Orders, Addresses, QuoteRequests
    ORDER }|..|{ USER : "belongs to"
    ADDRESS }|..|{ USER : "belongs to"
    QUOTEREQUEST }|..|{ USER : "belongs to"
    
    %% Relationship for Reviews
    REVIEW }|--|| PRODUCT : "reviews"
```

---

- **USER:**  
  Represents both customers and administrators. A user can place orders, have addresses, write comments, articles, reviews, own a cart, and submit quote requests.
  and admins on their sides have CRUD operations on all .

- **PRODUCT:**  
  Each product can receive comments, reviews, and can be added as an item in a cart.

- **ORDER:**  
  Represents finalized purchases by a user, storing products (as JSON for flexibility), total price, and status.

- **ADDRESS:**  
  Contains delivery addresses related to a user.

- **COMMENT:**  
  Can be associated with either a Product or an Article, reflecting user feedback or questions.

- **ARTICLE:**  
  Represents blog articles with an author and can receive comments.

- **QUOTEREQUEST:**  
  Captures service/devis requests from users.

- **CART & CARTITEM:**  
  Model a shopping cart where a user can add multiple items, each linked to a product.

- **REVIEW:**  
  Users write reviews (with a rating and content) linked to products, and products have an array of reviews.
