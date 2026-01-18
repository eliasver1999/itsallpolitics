import { blogType } from "../types/blog";

export const getRelatedArticles = (
  currentArticle: blogType,
  allArticles: blogType[],
  limit: number = 6
): blogType[] => {
  // Filter out current article
  const otherArticles = allArticles.filter(article => article.id !== currentArticle.id);
  
  // Score articles based on relevance
  const scoredArticles = otherArticles.map(article => {
    let score = 0;
    
    // Same category gets highest score
    if (article.category.id === currentArticle.category.id) {
      score += 10;
    }
    
    // Same author gets medium score
    const currentAuthors = currentArticle.creator.map(c => c.name);
    const articleAuthors = article.creator.map(c => c.name);
    const commonAuthors = currentAuthors.filter(author => articleAuthors.includes(author));
    score += commonAuthors.length * 5;
    
    // Common tags get score (if tags exist)
    if (currentArticle.tags && article.tags) {
      const currentTags = currentArticle.tags.map(t => t.id);
      const articleTags = article.tags.map(t => t.id);
      const commonTags = currentTags.filter(tag => articleTags.includes(tag));
      score += commonTags.length * 3;
    }
    
    // Recent articles get slight boost
    const daysDiff = Math.abs(
      new Date(currentArticle.created_at).getTime() - new Date(article.created_at).getTime()
    ) / (1000 * 60 * 60 * 24);
    
    if (daysDiff <= 7) score += 2;
    else if (daysDiff <= 30) score += 1;
    
    // Title similarity (basic keyword matching)
    const currentWords = currentArticle.title.toLowerCase().split(' ');
    const articleWords = article.title.toLowerCase().split(' ');
    const commonWords = currentWords.filter(word => 
      word.length > 3 && articleWords.includes(word)
    );
    score += commonWords.length * 1;
    
    return { article, score };
  });
  
  // Sort by score and return top articles
  return scoredArticles
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.article);
};