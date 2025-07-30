import { FileRoutesByPath } from "@tanstack/react-router";

type InstructionConfig = {
    heading: string;
    listType: InstructionListType;
    instructions: Array<string>;
}

export type ProfileInstructionsConfig = Record<keyof FileRoutesByPath, InstructionConfig>;

export enum ProfileRoutes {
    Home = '/',
    Hobbies = '/hobbies',
    Skills = '/skills',
}

export enum InstructionListType {
    Bulleted = 'bulleted',
    Numbered = 'numbered',
}
