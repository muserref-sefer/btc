export interface INewsSource {
  category: string;
  country: string;
  description: string;
  id: string;
  language: string;
  name: string;
  url: string;
}

export type NewsContextType = {
  news: INews[];
  newsSources: INewsSource[];
  setNews: React.Dispatch<React.SetStateAction<INews[]>>
  setNewsSources: React.Dispatch<React.SetStateAction<INewsSource[]>>
  filteredNewsSources: INewsSource[];
  filterNewsSourcesByCategory: (categories: string[]) => void
};

export interface INews {
  source: {
    id: string,
    name: string
  },
  author: string,
  title: string,
  description: string,
  url: string,
  urlToImage: string,
  publishedAt: string,
  content: string
}