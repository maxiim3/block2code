export type OpenAIModel = 'gpt-3.5-turbo' | 'gpt-4';

export interface TranslateBody {
  inputLanguage: string;
  inputCode: string;
}

export interface TranslateResponse {
  code: string;
}
