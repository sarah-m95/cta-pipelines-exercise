import React from 'react';
import { Box } from '@mui/material';
import { KmxPencilFilled } from '@kmx/mui-icons';
import { Hobby } from '../../types/hobby';

interface HobbyCardProps {
  hobby: Hobby;
  isEditing: boolean;
  onEditClick: (hobby: Hobby) => void;
}

/**
 * HobbyCard displays a single hobby with its information
 * Shows an edit icon when not currently being edited
 */
const HobbyCard: React.FC<HobbyCardProps> = ({ hobby, isEditing, onEditClick }) => {
  return (
    <article className={`${isEditing ? 'editing' : ''} hobby-card`}>
      {/* Show editing overlay when this hobby is being edited */}
      {isEditing && (
        <Box className="editing-overlay">
          <p>Editing...</p>
        </Box>
      )}
      
      {/* Hobby name and edit button */}
      <span className="hobby-header-container">
        <h1 className="hobby-header detail">{hobby.name}</h1>
        {!isEditing && (
          <KmxPencilFilled
            className="hobby-edit-pencil"
            onClick={() => onEditClick(hobby)}
          />
        )}
      </span>
      
      {/* Hobby description */}
      <p>{hobby.description}</p>
    </article>
  );
};

export default HobbyCard;
