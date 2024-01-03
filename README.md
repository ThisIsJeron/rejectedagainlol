# RejectedAgain.lol

This project is a Next.js application designed for photo sharing and text posting, similar in functionality to platforms like Reddit and Instagram. It integrates with Supabase for backend services, including authentication, database, and storage. The application is set up for deployment on Netlify, showcasing server-side rendering and static generation capabilities of Next.js.

## Features

- **User Authentication**: Users can sign up and log in using their email and password, with authentication managed through Supabase Auth.
- **Content Upload**: Users can upload either text or images. Images are stored in Supabase Storage, and references, along with text content, are stored in a Supabase table.
- **Dynamic Content Rendering**: The homepage displays a timeline-like feed of posts with support for both image and text content.
- **Responsive Layout**: Styled using Tailwind CSS for a modern and responsive user interface.

## Key Components

- `Header`: A responsive header that displays the user's email when logged in.
- `Footer`: A simple footer component with a custom message.
- `Login`: A page for user authentication, including login and registration functionality.
- `Upload`: Allows authenticated users to upload either text or image content, with a toggle to select the content type.

## Getting Started

To run the development server:

```bash
npm run dev
# or
yarn dev
```

Open http://localhost:3000 in your browser to see the result. Edit pages/index.js to see auto-updating changes.

## Installation
### Manual clone:

1. Clone this repo.
0. Navigate to the directory and run npm install or yarn install.
0. Create a .env.local file at the root and add your Supabase credentials.
0. Run npm run dev or yarn dev to start the development server.

## Supabase Setup

Ensure the following are set up in your Supabase project:

- User authentication.
- A storage bucket for image uploads.
- A database table to store posts.
## Deployment
Configured for deployment on Netlify, leveraging serverless functions and edge capabilities for a full-stack experience.

## Testing

### Included Default Testing

We’ve included some tooling that helps us maintain these templates. This template currently uses:

- [Renovate](https://www.mend.io/free-developer-tools/renovate/) - to regularly update our dependencies
- [Cypress](https://www.cypress.io/) - to run tests against how the template runs in the browser
- [Cypress Netlify Build Plugin](https://github.com/cypress-io/netlify-plugin-cypress) - to run our tests during our build process

If your team is not interested in this tooling, you can remove them with ease!

### Removing Renovate

In order to keep our project up-to-date with dependencies we use a tool called [Renovate](https://github.com/marketplace/renovate). If you’re not interested in this tooling, delete the `renovate.json` file and commit that onto your main branch.

### Removing Cypress

For our testing, we use [Cypress](https://www.cypress.io/) for end-to-end testing. This makes sure that we can validate that our templates are rendering and displaying as we’d expect. By default, we have Cypress not generate deploy links if our tests don’t pass. If you’d like to keep Cypress and still generate the deploy links, go into your `netlify.toml` and delete the plugin configuration lines:

```diff
[[plugins]]
  package = "netlify-plugin-cypress"
-  [plugins.inputs.postBuild]
-    enable = true
-
-  [plugins.inputs]
-    enable = false
```

If you’d like to remove the `netlify-plugin-cypress` build plugin entirely, you’d need to delete the entire block above instead. And then make sure sure to remove the package from the dependencies using:

```bash
npm uninstall -D netlify-plugin-cypress
```

And lastly if you’d like to remove Cypress entirely, delete the entire `cypress` folder and the `cypress.config.ts` file. Then remove the dependency using:

```bash
npm uninstall -S cypress
```
