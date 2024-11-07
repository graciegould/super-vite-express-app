# Super Vite Express App

**Super Vite Express App** is a flexible boilerplate that brings together [Vite](https://vitejs.dev/) for front-end development and [Express](https://expressjs.com/) for backend API routing, with React as the default framework. It’s built to make full-stack JavaScript apps easy to develop, offering clean, customizable API routing on the same origin, powerful dev tools, and workflows you can tailor to your needs.

This boilerplate is designed to fit a wide range of projects, giving you a simple yet flexible setup for building full-stack applications. Intended to fit the needs of many, this template is built as a starting point for quick development and deployment.

## What This Boilerplate Offers

- **Same Origin API Routing Setup**: API routes are auto-loaded from the `api/routes/` folder based on folder names -> file names -> exported paths. See the dogs payload at route /api/data/dogs. 
- **Enhanced Development Tools**: Utilizes Vite's hot module replacement, SCSS to CSS compilation for a smooth and efficient development experience. Automatic server reloads keep your workflow fast and responsive.
- **Custom Workflows**: Preconfigured scripts for runnning dev, prod, build, and watching SCSS changes. 
- **Quick Deployment**: Includes a production-ready build process, with Express serving the optimized frontend from the `dist` folder. Procfile included to run the deploy script for Heroku.  
- **Extensibility**: Both the frontend and backend components are easily extendable for a wide range of projects.

***This boilerplate is designed to be flexible, allowing you to experiment with different architectural choices as your project evolves.***

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

***Contributions would be appreciated! This boilerplate was initially created for personal convenience and use, but it could benefit from further refinement to achieve a clean structure.** 

