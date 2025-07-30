import {InstructionListType, ProfileInstructionsConfig, ProfileRoutes} from "../types/config.ts";

const HomeInstructions =  {
    heading: 'Home Instructions',
    listType: InstructionListType.Numbered,
    instructions: [
        'Here you need to update this page with whatever',
        'You also need to do this',
        'And then do this...'
    ]
}

const HobbiesInstructions =  {
    heading: 'Hobbies Instructions',
    listType: InstructionListType.Bulleted,
    instructions: [
        'Here you need to update this page with whatever',
        'Then you need to do this',
        'Then you need to do this',
        'Then you need to do this',
        'Then you need to do this',
        'Then you need to do this',
        'Then you need to do this',
        'Then you need to do this',
        'Then you need to do this',
        'Then you need to do this',
    ]
}

const SkillsInstructions =  {
    heading: 'Skills Instructions',
    listType: InstructionListType.Bulleted,
    instructions: [
        'Here you need to update the skills page with your own skils',
        'You also need to do this',
        'And then do this...'
    ]
}
const INSTRUCTIONS_CONFIG: ProfileInstructionsConfig = {
    [ProfileRoutes.Home]: HomeInstructions,
    [ProfileRoutes.Hobbies]: HobbiesInstructions,
    [ProfileRoutes.Skills] : SkillsInstructions
}

export default INSTRUCTIONS_CONFIG;
