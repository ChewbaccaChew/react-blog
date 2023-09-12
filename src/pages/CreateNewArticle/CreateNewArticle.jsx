import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchArticleCreate } from '../../api/articles';
import ArticleForm from '../../components/ArticleForm';

export default function CreateNewArticle() {
  const history = useNavigate();
  const [isLoading, setIsLoading] = useState();

  const submitForm = (data, tags) => {
    setIsLoading(true);
    const token = JSON.parse(localStorage.getItem('currentUser'));
    fetchArticleCreate({ article: { ...data, tagList: tags } }, token).then(
      (response) => {
        history(`/article/${response.article.slug}`);
      }
    );
    setIsLoading(false);
  };

  return (
    <ArticleForm
      formTitle='Create new article'
      submitForm={submitForm}
      isLoading={isLoading}
      listTags={[]}
    />
  );
}
