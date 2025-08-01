import {
  InstructionConfig,
  InstructionListType,
  ProfileInstructionsConfig,
  ProfileRoutes
} from "../types/config.ts";

const HomeInstructions: InstructionConfig = {
  heading: 'Home Instructions',
  goalImgSrc: '/finished/home.png',
  topics: [{
    name: 'HTML',
    listType: InstructionListType.Numbered,
    topicGoalImgSrc: '/finished/home.png',
    instructions: [
      'Replace the photo with your own :)',
      'Add a bio about yourself',
      'You can also add a link to your social media if you\'d like',
    ],
  },
    {
      name: 'CSS',
      listType: InstructionListType.Bulleted,
      topicGoalImgSrc: '/finished/home.png',
      instructions: [
        'Replace the photo with your own :)',
        'Add a bio about yourself',
        'You can also add a link to your social media if you\'d like',
      ],
    },
    {
      name: 'Javaaaascript',
      listType: InstructionListType.Numbered,
      instructions: [
        'Replace the photo with your own :)',
        'Add a bio about yourself',
        'You can also add a link to your social media if you\'d like',
      ],
    }],
}

const HobbiesInstructions: InstructionConfig = {
  heading: 'Hobbies Instructions',
  topics: [{
    name: 'HTML',
    listType: InstructionListType.Bulleted,
    instructions: [
      'Replace the photo with your own :)',
      'Add a bio about yourself',
      'You can also add a link to your social media if you\'d like',
    ],
  }],
}

const SkillsInstructions: InstructionConfig = {
  heading: 'Skills Instructions',
  goalImgSrc: '/finished/skills.png',
  topics: [{
    name: 'HTML',
    listType: InstructionListType.Bulleted,
    topicGoalImgSrc: '/finished/skills.png',
    instructions: [
      'Here you need to update the skills page with your own skils',
      'You also need to do this',
      'And then do this...'
    ]
  }],
}
const INSTRUCTIONS_CONFIG: ProfileInstructionsConfig = {
  [ProfileRoutes.Home]: HomeInstructions,
  [ProfileRoutes.Hobbies]: HobbiesInstructions,
  [ProfileRoutes.Skills]: SkillsInstructions
}

export default INSTRUCTIONS_CONFIG;
