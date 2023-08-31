import { addArticlesAction } from '../store/reducers/articleReducer';

export async function checkResponseStatus(response) {
  if (!response.ok) {
    throw new Error(`Could not fetch, received ${response.status}`);
  }
  return response.json();
}

export function fetchArticles(offset, token) {
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: null,
  };
  return (dispatch) =>
    fetch(
      `https://blog.kata.academy/api/articles?offset=${offset}&limit=5`,
      options
    )
      .then((response) => response.json())
      .then((json) => dispatch(addArticlesAction(json)))
      .catch((err) => {
        throw new Error(`Could not fetch, received ${err}`);
      });
}

export async function fetchArticle(slug, token) {
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: null,
  };
  const response = await fetch(
    `https://blog.kata.academy/api/articles/${slug}`,
    options
  );
  if (!response.ok) {
    return checkResponseStatus(response);
  }
  const json = await response.json();
  return json;
}

export async function fetchArticleCreate(data, token) {
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(
    'https://blog.kata.academy/api/articles',
    options
  );
  if (!response.ok) {
    return checkResponseStatus(response);
  }
  const json = await response.json();
  return json;
}

export async function fetchEditArticle(data, token, slug) {
  const options = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(
    `https://blog.kata.academy/api/articles/${slug}`,
    options
  );
  if (!response.ok) {
    return checkResponseStatus(response);
  }
  const json = await response.json();
  return json;
}

export async function fetchDeleteArticle(slug, token) {
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
  };
  try {
    await fetch(`https://blog.kata.academy/api/articles/${slug}`, options);
  } catch (err) {
    throw new Error(`Could not fetch, received ${err}`);
  }
}

export async function fetchAddFavoriteArticle(slug, token) {
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
  };

  try {
    await fetch(
      `https://blog.kata.academy/api/articles/${slug}/favorite`,
      options
    );
  } catch (err) {
    throw new Error(`Could not fetch, received ${err}`);
  }
}

export async function fetchDeleteFavoriteArticle(slug, token) {
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
  };
  try {
    await fetch(
      `https://blog.kata.academy/api/articles/${slug}/favorite`,
      options
    );
  } catch (err) {
    throw new Error(`Could not fetch, received ${err}`);
  }
}
