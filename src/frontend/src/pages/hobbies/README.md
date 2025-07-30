# Hobbies Page

This folder contains all the components and styles for the Hobbies management page.

## Files Overview

### `Hobbies.tsx` - Main Page Component

- **Purpose**: Main container component that manages all hobby-related state and API calls
- **Key Features**:
  - Loads and displays all hobbies from the API
  - Manages "add" vs "edit" mode state
  - Handles create, update, and delete operations
  - Coordinates between the form and hobby list

### `HobbiesForm.tsx` - Form Component

- **Purpose**: Reusable form for both creating new hobbies and editing existing ones
- **Key Features**:
  - Automatically switches between "Add" and "Edit" modes based on props
  - Uses Material-UI components for consistent styling
  - Validates required fields
  - Clears form after successful operations

### `HobbyCard.tsx` - Individual Hobby Display

- **Purpose**: Displays a single hobby with its information and edit functionality
- **Key Features**:
  - Shows hobby name and description
  - Displays edit icon when not in editing mode
  - Shows visual overlay when being edited

### `styles.css` - Component Styles

- **Purpose**: All CSS styles for the hobbies page components
- **Organization**:
  - Page layout styles
  - Form component styles
  - Hobby list and card styles
  - Editing state styles

## Component Hierarchy

```text
Hobbies (main page)
├── HobbiesForm (add/edit form)
└── HobbyCard[] (list of hobbies)
```

## Data Flow

1. **Loading**: `Hobbies` component fetches all hobbies on mount
2. **Creating**: User fills form → `HobbiesForm` calls `handleCreateHobby` → `Hobbies` calls API → refreshes list
3. **Editing**: User clicks edit icon → `Hobbies` sets `hobbyBeingEdited` → `HobbiesForm` populates fields
4. **Updating**: User submits form → `HobbiesForm` calls `handleEditHobby` → `Hobbies` calls API → refreshes list
5. **Deleting**: User clicks delete → `HobbiesForm` calls `handleDeleteHobby` → `Hobbies` calls API → refreshes list

## Key Differences from Skills Page

- **No proficiency level**: Hobbies don't have skill levels, so the form only has name and description fields
- **Simpler data model**: The `Hobby` type only contains `id`, `name`, and `description`
- **Form layout**: The form is more compact since there's one less field

## Key Concepts for New Developers

- **State Management**: React `useState` for component state, `useEffect` for side effects
- **Props**: Data flows down from parent to child components via props
- **Event Handling**: User actions trigger functions that update state
- **API Integration**: All data operations go through the `api/service.ts` file
- **Conditional Rendering**: UI changes based on current state (add vs edit mode)

## Common Tasks

### Adding a new field to hobbies

1. Update the `Hobby` type in `types/hobby.ts`
2. Add the new field to `HobbiesForm.tsx`
3. Update `HobbyCard.tsx` to display the new field
4. Add CSS styling if needed

### Changing form layout

1. Modify the JSX structure in `HobbiesForm.tsx`
2. Update corresponding CSS classes in `styles.css`

### Adding validation

1. Add validation logic in `HobbiesForm.tsx` before calling the handler functions
2. Use Material-UI's error props to show validation messages
