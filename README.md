# Super Vite Express App

**Super Vite Express App** is a flexible boilerplate that brings together [Vite](https://vitejs.dev/) for front-end development and [Express](https://expressjs.com/) for backend API routing, with React as the default framework. It’s built to make full-stack JavaScript apps easy to develop, offering clean, customizable API routing on the same origin, powerful dev tools, and workflows you can tailor to your needs.

## TODO!!

### 1. Move Vite to Dev Dependencies 

### 2. Load Vite Only in Development Mode

### 3. Migrate to typescript

### 4. Remove watch-css and Use sass-embedded

***This boilerplate is designed to be flexible, allowing you to experiment with different architectural choices as your project evolves.***

- **Same Origin API Routing Setup**: API routes are auto-loaded from the `api/routes/` folder based on folder names -> file names -> exported paths.
- **Custom Workflows**: Preconfigured scripts for development, production, and deployment allow you to tailor the workflow to suit your project's specific needs.

## Using NPX to Create Your Own Project
```bash
npx create-super-vite-express-app
```
OR within an existing folder
```bash
npx create-super-vite-express-app .
```

## OR clone project directly from here:
```bash
git clone https://github.com/yourusername/super-vite-express-app.git
cd super-vite-express-app
# gitignore the .env files
echo ".env" >> .gitignore
echo ".env.production" >> .gitignore
npm install
```

## Start the Development Server

```bash
npm run dev
```
or 
```bash
npm run start:dev
```

## Build Scripts

To build the project without running it, run this command to generate a bundle in the `dist` folder:

```bash
npm run build
```

## Preview Production
 
To build and run a preview of the production environment:

```bash
npm run prod
```

```bash
npm run start:prod
```

## **Customize API Routes**
Add your API routes to the `api/routes/` directory. Each file in this directory represents a separate API module, and you can organize your backend logic by splitting it into these modules.
    
## **Customize Environment Variables**
    
Set your environment-specific variables in `.env` (for development) and `.env.production` (for production). Example:

```bash
HOST=http://localhost
PORT=3000
VITE_API_URL=http://localhost:3000/api
```
