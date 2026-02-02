
export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  iframeUrl: string;
  category: string;
  isFeatured?: boolean;
}

export type Category = 'All' | 'Action' | 'Strategy' | 'Puzzle' | 'Sports' | 'Retro' | 'Multiplayer';

export const CATEGORIES: Category[] = ['All', 'Action', 'Strategy', 'Puzzle', 'Sports', 'Retro', 'Multiplayer'];
