import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';

import { Button, ButtonConstants, FieldWithLabel, GrowlFns, Input, RightToBracketIcon } from '@/components';
import { UserSlice } from '@/store/slices';

import styles from './SignInPage.module.scss';

const SignInPage = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const signInError = useSelector(UserSlice.selectors.selectSignInError);

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const onSubmitSignIn = useCallback((event) => {
    event.preventDefault();

    dispatch(UserSlice.actions.signInUser({
      email,
      password,
    }));
  }, [ dispatch, email, password ]);

  const onCloseSignInErrorGrowl = useCallback(() => {
    dispatch(UserSlice.actions.clearSignInError());
  }, [ dispatch ]);

  return (
    <div className={styles.SignInContainer}>
      <div>
        <h2>{t('Athlete Area')}</h2>
        <p>{t('Access your content')}</p>
      </div>

      <form onSubmit={onSubmitSignIn}>
        <FieldWithLabel
          label={t('Email')}
          field={(
            <Input
              type="email"
              name="email"
              value={email}
              required={true}
              onChange={(event) => setEmail(event.target.value)}
            />
          )}
        />

        <FieldWithLabel
          label={t('Password')}
          field={(
            <Input
              type="password"
              name="password"
              value={password}
              required={true}
              onChange={(event) => setPassword(event.target.value)}
            />
          )}
        />

        <Button
          category={ButtonConstants.ButtonCategories.SUCCESS}
          icon={<RightToBracketIcon />}
        >
          {t('Sign in')}
        </Button>

        <Link to={{ pathname: '/sign-up' }}>
          <Button
            category={ButtonConstants.ButtonCategories.PRIMARY}
            textOnly={true}
          >
            {t('Don\'t have an account? Sign up')}
          </Button>
        </Link>
      </form>

      {GrowlFns.renderErrorGrowl({
        message: signInError,
        onCloseGrowl: onCloseSignInErrorGrowl,
      })}
    </div>
  );
};

const SignInPageMemo = memo(SignInPage);

export { SignInPageMemo as SignInPage };
