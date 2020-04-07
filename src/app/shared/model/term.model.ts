export class EnglishTermApi {
  _id: string;
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
  dateCreated: Date;
  dateRevised: Date;
  fieldOfStudy?: string;
  helpYes?: number;
  helpNo?: number;
  definitions?: [Definition];
}

export class NonEnglishTermApi {
  _id: string;
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
  dateCreated: Date;
  dateRevised: Date;
  fieldOfStudy?: string;
  helpYes?: number;
  helpNo?: number;
  definitions: [Definition];
  termEnglishId: string;
}

export class EnglishTermRequest {
  wordEnglish: string = '';
  wordNonEnglish: string;
  wordExpanded: string;
  languageCode = 'en';
  image: string;
  imageType: string;
  audio: string;
  audioType: string;
  linkAuthoritative: string;
  linkWikipedia: string;
  linkYouTube: string;
  authorName: string;
  fieldOfStudy: string;
  helpYes: number;
  helpNo: number;
  definitions: [DefinitionRequest];
}

export class NonEnglishTermRequest {
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
  definitions: [DefinitionRequest];
  termEnglishId: string;
}

export class Definition {
  _id: string;
  authorName: string;
  definition: string;
  quality?: number;
  likes?: number;
  dateCreated: Date;
}

export class DefinitionRequest {
  authorName: string;
  definition: string;

  likes?: number = 0;
}

export class IncrementRequest {
  _id: string;
}

export class ISOLanguageCodeAPI {
  _id: string;
  name: string;
  code: string;
}
