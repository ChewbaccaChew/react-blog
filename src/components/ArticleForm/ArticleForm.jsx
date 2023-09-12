import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import LinearProgress from '@mui/material/LinearProgress';
import uniqid from 'uniqid';

import { selectIsLogIn } from '../../store/selectors/selectors';

import './ArticleForm.scss';

export default function ArticleForm({
  formTitle,
  submitForm,
  isLoading,
  title,
  body,
  description,
  listTags,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const [tags, setTags] = useState(listTags);
  const [primitiveString, setPrimitiveString] = useState({ tag: '' });
  const isLoginIn = useSelector(selectIsLogIn);

  const handleAddTag = (tag) => {
    if (!primitiveString.tag.trim()) {
      return;
    }
    setTags([...tags, tag]);
  };

  const handleDeleteTag = (index) => {
    const newTags = tags.filter((_, ind) => ind !== index);
    setTags(newTags);
  };

  if (isLoginIn) {
    return (
      <div className={`wrapper-form ${isLoading ? 'active' : ''}`}>
        <div className='form-container'>
          <span className='form__name'>{formTitle}</span>
          <form
            className='form'
            id='article-create-form'
            onSubmit={handleSubmit((data) => submitForm(data, tags))}
          >
            <label className='form__label'>
              Title
              <input
                {...register('title', {
                  required: 'empty',
                })}
                type='text'
                className='form__input'
                placeholder='Title'
                name='title'
                disabled={isLoading}
                defaultValue={title}
              />
              {errors.title && (
                <span className='form__message' style={{ color: 'red' }}>
                  {errors.title.message}
                </span>
              )}
            </label>
            <label className='form__label'>
              Short description
              <input
                {...register('description', {
                  required: 'empty',
                })}
                type='text'
                className='form__input'
                placeholder='Short description'
                disabled={isLoading}
                defaultValue={description}
              />
              {errors.description && (
                <span className='form__message' style={{ color: 'red' }}>
                  {errors.description.message}
                </span>
              )}
            </label>
            <label className='form__label'>
              Text
              <textarea
                {...register('body', {
                  required: 'empty',
                })}
                type='text'
                className='form__input'
                placeholder='Text'
                disabled={isLoading}
                defaultValue={body}
              />
              {errors.body && (
                <span className='form__message' style={{ color: 'red' }}>
                  {errors.body.message}
                </span>
              )}
            </label>
          </form>
          <form
            className='form tag'
            onSubmit={(evt) => {
              evt.preventDefault();
              handleAddTag(evt.target.tag.value);
              evt.target.tag.value = '';
            }}
          >
            <label className='form__label tag'>
              Tags
              <input
                type='text'
                name='tag'
                className='form__input'
                placeholder='Tag'
                onChange={(e) => {
                  const trimmedValue = e.target.value.trim();
                  setPrimitiveString({ tag: trimmedValue });
                }}
                required
                disabled={isLoading}
              />
            </label>
            <input className='button tag' type='submit' value='Add tag' />
          </form>
          {tags.map((item, ind) => (
            <div className='tags' key={uniqid()}>
              <span className='tags__name'>{item}</span>
              <button
                className='tags__button'
                type='button'
                onClick={() => handleDeleteTag(ind)}
              >
                Delete
              </button>
            </div>
          ))}
          <input
            className='button'
            type='submit'
            value='Send'
            form='article-create-form'
          />
          {isLoading && <LinearProgress color='secondary' />}
        </div>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', paddingTop: '5px', fontSize: '20px' }}>
      Page not found!
    </div>
  );
}
