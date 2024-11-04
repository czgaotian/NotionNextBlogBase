import type { FC } from 'react';
import type {
  ThemeArchiveProps,
  ThemeCategoryProps,
  ThemeCategoryDetailProps,
  ThemeHomeProps,
  ThemePageNotFoundProps,
  ThemePageProps,
  ThemeCategoryPageProps,
  ThemeTagDetailProps,
} from '@/pages/types';

export type ArchiveComponent = FC<ThemeArchiveProps>;
export type CategoryComponent = FC<ThemeCategoryProps>;
export type CategoryDetailComponent = FC<ThemeCategoryDetailProps>;
export type CategoryPageComponent = FC<ThemeCategoryPageProps>;
export type HomeComponent = FC<ThemeHomeProps>;
export type PageNotFoundComponent = FC<ThemePageNotFoundProps>;
export type PostComponents = FC;
export type PostListComponent = FC<ThemePageProps>;
export type SearchComponent = FC;
export type TagComponent = FC;
export type TagDetailComponent = FC<ThemeTagDetailProps>;
