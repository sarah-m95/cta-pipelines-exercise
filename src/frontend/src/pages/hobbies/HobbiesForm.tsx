import React, { useState, useEffect } from 'react';
import { Paper, TextField, Button, Box } from '@mui/material';
import { Hobby } from '../../types/hobby';
import './styles.css';

type HobbiesFormProps = {
  handleCreateHobby: (hobby: Hobby) => void;
  handleDeleteHobby: () => void;
  handleEditHobby: (hobby: Hobby) => void;
  handleCancelEdit: () => void;
  hobbyBeingEdited: Hobby | null;
};

/**
 * HobbiesForm - A form component for creating and editing hobbies
 *
 * When hobbyBeingEdited is null: Shows "Add Hobby" mode
 * When hobbyBeingEdited has a hobby: Shows "Edit Hobby" mode with Update/Delete/Cancel buttons
 */
export const HobbiesForm: React.FC<HobbiesFormProps> = ({
  handleCreateHobby,
  handleDeleteHobby,
  handleEditHobby,
  handleCancelEdit,
  hobbyBeingEdited,
}) => {
  // Form field state
  const [hobbyName, setHobbyName] = useState('');
  const [description, setDescription] = useState('');

  // Update form fields when hobbyBeingEdited changes
  useEffect(() => {
    if (hobbyBeingEdited) {
      // Edit mode: populate form with existing hobby data
      setHobbyName(hobbyBeingEdited.name);
      setDescription(hobbyBeingEdited.description);
    } else {
      // Add mode: clear the form
      clearForm();
    }
  }, [hobbyBeingEdited]);

  /**
   * Handle creating a new hobby
   */
  const handleAddClick = () => {
    handleCreateHobby({
      id: '', // API will generate the ID
      name: hobbyName,
      description: description,
    });

    clearForm();
  };

  /**
   * Handle updating an existing hobby
   */
  const handleUpdateClick = () => {
    if (!hobbyBeingEdited) return;

    handleEditHobby({
      id: hobbyBeingEdited.id,
      name: hobbyName,
      description: description,
    });

    clearForm();
  };

  /**
   * Clear all form fields and reset to default values
   */
  const clearForm = () => {
    setHobbyName('');
    setDescription('');
  };

  return (
    <Paper elevation={3} className="hobbies-form-container">
      <Box component="form" className="hobbies-form">
        <TextField
          label="Hobby Name"
          value={hobbyName}
          onChange={e => setHobbyName(e.target.value)}
          required
          variant="outlined"
          size="small"
          className="hobbies-form-name-input"
        />

        <TextField
          label="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
          variant="outlined"
          size="small"
          multiline
          rows={1}
          className="hobbies-form-description-input"
        />

        {hobbyBeingEdited ? (
          <Box className="hobbies-form-actions">
            <Button
              type="button"
              variant="outlined"
              onClick={handleUpdateClick}
            >
              Update
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="error"
              onClick={handleDeleteHobby}
            >
              Delete
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              onClick={handleCancelEdit}
            >
              Cancel
            </Button>
          </Box>
        ) : (
          <Button
            type="button"
            variant="contained"
            color="primary"
            size="medium"
            className="hobbies-form-submit-button"
            onClick={handleAddClick}
          >
            Add Hobby
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default HobbiesForm;
