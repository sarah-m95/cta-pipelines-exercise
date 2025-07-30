# Skills Page

This folder contains all the components and styles for the Skills management page.

## Files Overview

### `Skills.tsx` - Main Page Component

- **Purpose**: Main container component that manages all skill-related state and API calls
- **Key Features**:
  - Loads and displays all skills from the API
  - Manages "add" vs "edit" mode state
  - Handles create, update, and delete operations
  - Coordinates between the form and skill list

### `SkillsForm.tsx` - Form Component

- **Purpose**: Reusable form for both creating new skills and editing existing ones
- **Key Features**:
  - Automatically switches between "Add" and "Edit" modes based on props
  - Uses Material-UI components for consistent styling
  - Validates required fields
  - Clears form after successful operations

### `SkillCard.tsx` - Individual Skill Display

- **Purpose**: Displays a single skill with its information and edit functionality
- **Key Features**:
  - Shows skill name, proficiency level, and description
  - Displays edit icon when not in editing mode
  - Shows visual overlay when being edited

### `styles.css` - Component Styles

- **Purpose**: All CSS styles for the skills page components
- **Organization**:
  - Page layout styles
  - Form component styles
  - Skill list and card styles
  - Editing state styles

## Component Hierarchy

```
Skills (main page)
├── SkillsForm (add/edit form)
└── SkillCard[] (list of skills)
```

## Data Flow

1. **Loading**: `Skills` component fetches all skills on mount
2. **Creating**: User fills form → `SkillsForm` calls `handleCreateSkill` → `Skills` calls API → refreshes list
3. **Editing**: User clicks edit icon → `Skills` sets `skillBeingEdited` → `SkillsForm` populates fields
4. **Updating**: User submits form → `SkillsForm` calls `handleEditSkill` → `Skills` calls API → refreshes list
5. **Deleting**: User clicks delete → `SkillsForm` calls `handleDeleteSkill` → `Skills` calls API → refreshes list

## Key Concepts for New Developers

- **State Management**: React `useState` for component state, `useEffect` for side effects
- **Props**: Data flows down from parent to child components via props
- **Event Handling**: User actions trigger functions that update state
- **API Integration**: All data operations go through the `api/service.ts` file
- **Conditional Rendering**: UI changes based on current state (add vs edit mode)

## Common Tasks

### Adding a new field to skills

1. Update the `Skill` type in `types/skill.ts`
2. Add the new field to `SkillsForm.tsx`
3. Update `SkillCard.tsx` to display the new field
4. Add CSS styling if needed

### Changing form layout

1. Modify the JSX structure in `SkillsForm.tsx`
2. Update corresponding CSS classes in `styles.css`

### Adding validation

1. Add validation logic in `SkillsForm.tsx` before calling the handler functions
2. Use Material-UI's error props to show validation messages
