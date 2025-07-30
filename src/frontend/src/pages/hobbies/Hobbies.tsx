import React, { useEffect, useState } from 'react';
import api from '../../api/service';
import { Hobby } from '../../types/hobby';
import HobbiesForm from './HobbiesForm';
import HobbyCard from './HobbyCard';
import './styles.css';

/**
 * Hobbies page - displays a form to add/edit hobbies and a list of all hobbies
 */
const Hobbies: React.FC = () => {
  // State to store all hobbies
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  // State to track which hobby is being edited (null = creating new hobby)
  const [hobbyBeingEdited, setHobbyBeingEdited] = useState<Hobby | null>(null);

  // Determine if we're in "Add" or "Edit" mode for the page title
  const pageMode = hobbyBeingEdited ? 'Edit' : 'Add';

  // Load hobbies when component first mounts
  useEffect(() => {
    loadHobbies();
  }, []);

  /**
   * Fetch all hobbies from the API and update state
   */
  const loadHobbies = async () => {
    try {
      const hobbiesData = await api.getHobbies();
      setHobbies(hobbiesData);
      setHobbyBeingEdited(null); // Clear any editing state
    } catch (error) {
      console.error('Failed to load hobbies:', error);
    }
  };

  /**
   * Create a new hobby
   */
  const handleCreateHobby = async (hobby: Hobby) => {
    try {
      await api.createHobby(hobby);
      await loadHobbies(); // Refresh the list
    } catch (error) {
      console.error('Failed to create hobby:', error);
    }
  };

  /**
   * Update an existing hobby
   */
  const handleUpdateHobby = async (hobby: Hobby) => {
    try {
      await api.editHobby(hobby);
      await loadHobbies(); // Refresh the list
    } catch (error) {
      console.error('Failed to update hobby:', error);
    }
  };

  /**
   * Delete a hobby by ID
   */
  const handleDeleteHobby = async () => {
    if (!hobbyBeingEdited) return;

    try {
      await api.deleteHobby(hobbyBeingEdited.id);
      await loadHobbies(); // Refresh the list
    } catch (error) {
      console.error('Failed to delete hobby:', error);
    }
  };

  /**
   * Start editing a hobby (populate form with hobby data)
   */
  const handleEditHobby = (hobby: Hobby) => {
    setHobbyBeingEdited({ ...hobby }); // Create a copy to avoid mutation
  };

  /**
   * Cancel editing (clear form and go back to "add" mode)
   */
  const handleCancelEdit = () => {
    setHobbyBeingEdited(null);
  };

  return (
    <div className="hobbies-container">
      {/* Page title */}
      <h1 className="hobbies-header">{pageMode} Hobbies Page</h1>

      {/* Form for adding/editing hobbies */}
      <HobbiesForm
        handleCreateHobby={handleCreateHobby}
        handleDeleteHobby={handleDeleteHobby}
        handleEditHobby={handleUpdateHobby}
        handleCancelEdit={handleCancelEdit}
        hobbyBeingEdited={hobbyBeingEdited}
      />

      {/* List of all hobbies */}
      <ul className="hobbies-list">
        {hobbies.map(hobby => {
          const isEditing = hobby.id === hobbyBeingEdited?.id;
          return (
            <li key={hobby.id} className="hobbies-list-item">
              <HobbyCard
                hobby={hobby}
                isEditing={isEditing}
                onEditClick={handleEditHobby}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Hobbies;
