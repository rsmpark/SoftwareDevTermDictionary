export class EnglishTerm {
  wordEnglish: string;
  wordNonEnglish?: string;
  wordExpanded?: string;
  languageCode: string;
  image?: string;
  imageType?: string;
  audio?: string;
  audioType?: string;
  linkAuthoritative?: string;
  linkWikipedia?: string;
  linkYouTube?: string;
  authorName: string;
  fieldOfStudy?: string;
  helpYes?: number;
  helpNo?: number;
  definitions?: [Definition];
}

export class NonEnglishTerm {
  wordEnglish: string;
  wordNonEnglish?: string;
  wordExpanded?: string;
  languageCode: string;
  image?: string;
  imageType?: string;
  audio: string;
  audioType?: string;
  linkAuthoritative?: string;
  linkWikipedia?: string;
  linkYouTube?: string;
  authorName: string;

  fieldOfStudy?: string;
  helpYes?: number;
  helpNo?: number;
  definitions: [Definition];
  termEnglishId: string;
}

export class Definition {
  authorName: string;
  definitio?: string;
  quality?: number;
  likes?: number;
}

export class EnglishTermCreate {
  authorName: string;
  wordEnglish: string;
  wordExpanded?: string;
  definition?: string;
  linkAuthoritative?: string;
  linkWikipedia?: string;
  linkYoutube?: string;
}

export class DefinitionRequest {
  definition: string;
}

export class IncrementRequest {
  _id: string;
}
