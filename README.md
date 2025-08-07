# template

Project ini adalah boilerplate modern dengan **Laravel 12+** di sisi backend, **React** untuk frontend, dan menggunakan **Bun** sebagai package manager untuk pengembangan yang lebih cepat.

## 🚀 Fitur Utama

- **Laravel 12+**: Framework PHP populer untuk REST API yang powerful.
- **React**: Library JavaScript modern untuk frontend interaktif.
- **Bun**: Package manager super cepat, pengganti npm/yarn untuk JavaScript/TypeScript.
- **TailwindCSS**: Utility-first CSS framework untuk styling yang mudah dan konsisten.
- **Vite**: Build tool modern untuk hot reload super cepat.
- **TypeScript**: JavaScript yang diketik secara statis untuk codebase yang lebih maintainable.

---

## 🛠️ Instalasi

### 1. Clone repository
```bash
git clone https://github.com/MUHAMAD-NAUFAL-666/template.git
cd template

composer install

bun install

cp .env.example .env
php artisan key:generate


DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nama_db
DB_USERNAME=user_db
DB_PASSWORD=password_db

