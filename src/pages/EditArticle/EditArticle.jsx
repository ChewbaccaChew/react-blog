import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';

import { fetchArticle, fetchEditArticle } from '../../api/articles';
import ArticleForm from '../../components/ArticleForm';

export default function EditArticle() {
  const [tags, setTags] = useState([]);
  const [editArticle, setEditArticle] = useState();
  const [isLoading, setIsLoading] = useState();
  const { slug } = useParams();
  const history = useNavigate();

  useEffect(() => {
    fetchArticle(slug).then((body) => {
      setEditArticle(body);
      setTags([...body.article.tagList]);
    });
  }, [slug]);

  if (!editArticle) {
    return <LinearProgress color='secondary' />;
  }

  const { title, description, body } = editArticle.article;

  const submitForm = (data, listTags) => {
    setIsLoading(true);
    const token = JSON.parse(localStorage.getItem('currentUser'));
    fetchEditArticle({ article: { ...data, tagList: listTags } }, token, slug);
    history(`/article/${slug}`);
    setIsLoading(false);
  };

  return (
    <ArticleForm
      formTitle='Edit article'
      submitForm={submitForm}
      isLoading={isLoading}
      title={title}
      description={description}
      body={body}
      listTags={tags}
    />
  );
}
