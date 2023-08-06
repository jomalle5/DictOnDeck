declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

export interface DictEntry {
  expression: string;
  reading: string;
  definitionTags: string;
  rules: string;
  score: number;
  glossary: string[];
  sequence: number;
  termTags: string;
}