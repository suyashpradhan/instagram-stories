## [StageGram](https://stagegram.netlify.app/)

StageGram is a React application build for Stage OTT platform which is similar to the Instagram Stories feature. Users
can view a list of stories, navigate through them manually or automatically.

### Tech Stack

1. Reactjs
2. Typescript
3. Vanilla CSS
4. Cypress

## Component Structure

```md
instagram-stories/
├── cypress/
│ ├── e2e/
│ │ └── stories.cy.ts
│ ├── fixtures/
│ ├── support/
│ │ ├── commands.ts
│ │ └── e2e.ts
├── public/
│ ├── data/
│ │ └── stories.json
│ └── index.html
├── src/
│ ├── components/
│ │ ├── App.tsx
│ │ ├── StoryList/
│ │ │ ├── StoryList.tsx
│ │ │ └── StoryList.module.css
│ │ └── StoryViewer/
│ │ ├── StoryViewer.tsx
│ │ └── StoryViewer.module.css
│ ├── types/
│ │ └── story.ts
│ ├── index.tsx
│ └── ...
├── .gitignore
├── cypress.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

### Deployed on Netlify