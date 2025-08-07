<p align="center">
  <img src="https://laravel.com/img/logomark.min.svg" alt="Laravel" width="80" height="80">
  &nbsp;&nbsp;
  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" width="80" height="80">
  &nbsp;&nbsp;
  <img src="https://bun.sh/logo.svg" alt="Bun" width="80" height="80">
</p>


# Template Pos

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
```
### 2. Install dependency PHP dan frontend
```bash
composer install
bun install
```
### 3. Salin file .env dan generate key Laravel
```bash
cp .env.example .env
php artisan key:generate
```
### 4. Konfigurasi database
```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nama_db
DB_USERNAME=user_db
DB_PASSWORD=password_db
```
### 5. Jalankan migration
```bash
php artisan migrate


