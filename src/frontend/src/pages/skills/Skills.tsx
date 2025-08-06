import React, { useEffect, useState } from 'react';
import api from '../../api/service';
import { Skill } from '../../types/skill';
import SkillsForm from './SkillsForm';
import SkillCard from './SkillCard';
import './styles.css';

/**
 * Skills page - displays a form to add/edit skills and a list of all skills
 */
const Skills: React.FC = () => {
  // State to store all skills
  const [skills, setSkills] = useState<Skill[]>([]);
  // State to track which skill is being edited (null = creating new skill)
  const [skillBeingEdited, setSkillBeingEdited] = useState<Skill | null>(null);

  // Determine if we're in "Add" or "Edit" mode for the page title
  const pageMode = skillBeingEdited ? 'Edit' : 'Add';

  // Load skills when component first mounts
  useEffect(() => {
    loadSkills();
  }, []);

  /**
   * Fetch all skills from the API and update state
   */
  const loadSkills = async () => {
    try {
      const skillsData = await api.getSkills();
      setSkills(skillsData);
      setSkillBeingEdited(null); // Clear any editing state
    } catch (error) {
      console.error('Failed to load skills:', error);
    }
  };

  /**
   * Create a new skill
   */
  const handleCreateSkill = async (skill: Skill) => {
    try {
      await api.createSkill(skill);
      await loadSkills(); // Refresh the list
    } catch (error) {
      console.error('Failed to create skill:', error);
    }
  };

  /**
   * Update an existing skill
   */
  const handleUpdateSkill = async (skill: Skill) => {
    try {
      await api.editSkill(skill);
      await loadSkills(); // Refresh the list
    } catch (error) {
      console.error('Failed to update skill:', error);
    }
  };

  /**
   * Delete a skill by ID
   */
  const handleDeleteSkill = async () => {
    if (!skillBeingEdited) return;

    try {
      await api.deleteSkill(skillBeingEdited.id);
      await loadSkills(); // Refresh the list
    } catch (error) {
      console.error('Failed to delete skill:', error);
    }
  };

  /**
   * Start editing a skill (populate form with skill data)
   */
  const handleEditSkill = (skill: Skill) => {
    setSkillBeingEdited({ ...skill }); // Create a copy to avoid mutation
  };

  /**
   * Cancel editing (clear form and go back to "add" mode)
   */
  const handleCancelEdit = () => {
    setSkillBeingEdited(null);
  };

  return (
    <div className="skills-container">
      {/* Page title */}
      <h1 className="skills-header">{pageMode} Skills Page</h1>

      {/* Display HTML-only version in iframe */}
      {/* <iframe
        style={{ border: 'none', width: '100%', height: '500px' }}
        src="/src/pages/skills/skills-html-only.html"
      /> */}

      {/* Form for adding/editing skills */}
      <SkillsForm
        handleCreateSkill={handleCreateSkill}
        handleDeleteSkill={handleDeleteSkill}
        handleEditSkill={handleUpdateSkill}
        handleCancelEdit={handleCancelEdit}
        skillBeingEdited={skillBeingEdited}
      />

      {/* List of all skills */}
      <ul className="skills-list">
        {skills.map(skill => {
          const isEditing = skill.id === skillBeingEdited?.id;
          return (
            <li key={skill.id} className="skills-list-item">
              <SkillCard
                skill={skill}
                isEditing={isEditing}
                onEditClick={handleEditSkill}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Skills;
