# ChezFlora 🌸  
*Modern e-commerce platform for floral decoration and event services*

![ChezFlora Logo](https://via.placeholder.com/1200x630.png?text=ChezFlora)

---

## Project Overview  
ChezFlora is a web application designed to modernize floral decoration and event services. It enables clients to shop, request quotes for custom services, and engage with the brand through a blog, while administrators manage inventory, orders, and promotions seamlessly. Built with modern technologies like React, Express.js, and PostgreSQL, the platform prioritizes security, user experience, and scalability.

---

## Key Features  

### Client-Side Features
- **E-Commerce Experience**  
  - Dynamic product catalog with categories (fresh flowers, bouquets, plants, decor items)  
  - Customizable cart with real-time updates  
  - Secure checkout with payment integration (to be added)  

- **Service Management**  
  - Quote request system for event decoration (e.g., weddings, corporate events)  
  - Devis generation and confirmation workflow  

- **Engagement Tools**  
  - Blog with categorized articles (flower care, trends, gift ideas)  
  - User accounts with order history, delivery tracking, and profile management  

### Admin-Side Features
- **Inventory & Product Management**  
  - CRUD operations for products, categories, and promotions  
  - Low-stock alerts and automated email notifications  

- **Order & Quote Tracking**  
  - Real-time order status updates (preparation, delivery, etc.)  
  - Devis management (view, respond, confirm)  

- **Content & User Control**  
  - Blog post scheduling and moderation  
  - User account management (banning, deletion)  
  - Site-wide settings (slogan, "About Us" updates)

---

## Design System  
ChezFlora’s design reflects nature, elegance, and simplicity.

**Color Palette:**  
- Primary: Soft Green (`#B2DFDB`)  
- Secondary: Pale Pink (`#F8BBD0`), Beige (`#F5F5DC`)  
- Accent: Warm Brown (`#75472A`)

**Typography:**  
- **Titles:** Handwritten font (e.g., *Great Vibes*) for an artisanal touch  
- **Body Text:** Modern sans-serif (e.g., *Roboto*) for readability

**Visual Elements:**  
- Floral motifs in backgrounds and buttons  
- High-quality product images with lightbox previews

---

## Tech Stack  
**Frontend (Client & Admin):**  
- React.js (with TypeScript)  
- Tailwind CSS (for responsive design)  
- Redux Toolkit (state management)  
- React Router (navigation)

**Backend:**  
- Node.js with Express.js  
- MongoDB (ORM: Prisma)  
- JWT Authentication (with cookie-based sessions)

**CMS & Tools:**  
- Swagger/OpenAPI for API documentation  
- Docker for containerization  
- PM2 for production process management

---

## Installation  
### Prerequisites
- Node.js and npm installed  
- MOngoDb database setup

### Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/DimitriTedom/ChezFlora.git
   cd ChezFlora
   ```
2. Install dependencies:
   ```bash
   # /client/
   npm install

   # /Server/
   yarn
   ```
3. Create a `.env` file in the root directory and configure the following environment variables:
   ```env
   NODE_ENV=development
   PORT=5000
   JWT_SECRET=your-secret-key
   DATABASE_URL=postgresql://user:password@localhost:5432/chezflora
   SMTP_HOST=smtp.example.com
   SMTP_PORT=587
   SMTP_USER=your-email@example.com
   SMTP_PASS=your-password
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

---

## API Documentation  
**Key Endpoints**  
| Method | Endpoint              | Description                     |
|--------|-----------------------|---------------------------------|
| POST   | `/api/auth/login`     | User login                      |
| POST   | `/api/devis`          | Submit a quote request          |
| GET    | `/api/admin/products` | List all products (admin)       |
| POST   | `/api/blog/publish`   | Schedule a blog post            |

For complete API details, refer to the [Swagger/OpenAPI documentation](http://localhost:5000/api-docs).

---

## Security  
- HTTPS enforced via Nginx reverse proxy  
- Input validation with Joi (backend)  
- SQL injection protection via Prisma ORM  
- Rate limiting (100 requests/minute)

---

## Site Structure  
```mermaid
graph TD
    A[Client-Side] -->|Pages| B[Home, Boutique, Blog, Contact]
    B --> C[Product Categories]
    C --> D[Fresh Flowers, Bouquets, Plants, Décor]
    A --> E[Admin Dashboard]
    E --> F[Orders, Products, Devis, Users]
```

---

## Contributing  
Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) before submitting a pull request. Ensure adherence to design and coding standards.

---

## License  
MIT License

---

## Acknowledgments  
- **Tools:** Prisma, React, Express.js  
- **Design Inspiration:**  
  - [Bakker](https://fr-fr.bakker.com/)  
  - [Interflora](https://www.interflora.fr/)  
  - [Aquarelle](https://www.aquarelle.com/)

---

## Support  
Questions? Contact **support@chezflora.com** or join our Discord community.
