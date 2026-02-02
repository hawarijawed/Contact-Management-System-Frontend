# Contact Management System Frontend

A modern, responsive Contact Management System frontend built with React, Vite, and Tailwind CSS. This application allows users to manage their contacts efficiently with a clean and user-friendly interface.

## Features

- **Add Contact**: Create new contacts with ease.
- **List Contacts**: View all your contact details in a structured list.
- **Update Contact**: Edit existing contact information.
- **Search Contact**: Quickly find contacts by name or details.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [React Toastify](https://fkhadra.github.io/react-toastify/)

## Project Structure

```
src/
├── components/      # Reusable UI components (Navbar, SideBar, Button)
├── layouts/         # Layout components
├── pages/           # Application pages (AddContact, ListContact, SearchContact)
├── services/        # API services (contactService.js)
├── assets/          # Static assets
└── App.jsx          # Main application component and routing
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cms_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

## Building for Production

To create a production build:

```bash
npm run build
```

## Linting

To run the linter:

```bash
npm run lint
```
