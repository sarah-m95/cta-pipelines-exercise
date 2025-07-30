export type Skill = {
    id: string;
    name: string;
    description: string;
    skillLevel: SkillLevel
}

export enum SkillLevel {
    Basic,
    Novice,
    Intermediate,
    Advanced,
    Expert
}