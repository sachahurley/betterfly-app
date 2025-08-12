# Version Management Guide

## How to Switch Between Versions

### Quick Start
To switch between versions of the onboarding or dashboard flows, simply edit the `src/config/versions.json` file:

1. Open `src/config/versions.json`
2. Find the flow you want to change (onboarding or dashboard)
3. Change the `"active"` value from `"v1"` to `"v2"` (or any version you want)
4. Save the file
5. Refresh your browser

### Example
To switch onboarding to version 2:
```json
"onboarding": {
  "active": "v2",  // <- Change this from "v1" to "v2"
  ...
}
```

## Current Structure

```
src/
├── flows/
│   ├── onboarding/
│   │   ├── v1/          <- Current stable version
│   │   │   ├── welcome.html
│   │   │   ├── questionnaire.html
│   │   │   └── ...
│   │   └── v2/          <- Your new iteration goes here
│   │       └── (empty - ready for new files)
│   │
│   └── dashboard/
│       ├── v1/          <- Current stable version
│       │   ├── index.html
│       │   ├── script.js
│       │   └── styles.css
│       └── v2/          <- Your new iteration goes here
│           └── (empty - ready for new files)
│
└── config/
    └── versions.json    <- Control which version is active

```

## Creating a New Version

### For Onboarding v2:
1. Copy files from `v1/` to `v2/` if you want to start from the existing version
2. Or create new files directly in `v2/`
3. Edit files in `v2/` without affecting `v1/`
4. When ready to test, change `versions.json` to point to `v2`

### For Dashboard v2:
Same process as above, but in the dashboard folder

## Benefits
- **Safe Iteration**: Work on v2 without breaking v1
- **Easy Rollback**: Switch back to v1 instantly if needed
- **Parallel Development**: Keep multiple versions for testing
- **Clean History**: Each version's changes are isolated

## Tips
- Always test v1 still works before starting v2
- Document what changes you're making in each version
- You can have v1 onboarding with v2 dashboard (mix and match!)
- Consider copying v1 to v2 as a starting point for iterations