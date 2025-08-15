import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';

import { Button, ButtonConstants } from '@/components';
import { UserSlice } from '@/store/slices';

import styles from './Header.module.scss';

const Header = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(UserSlice.selectors.isLoggedIn);

  const onLogout = useCallback((event) => {
    event.preventDefault();

    dispatch(UserSlice.actions.signOutUser());
  }, [ dispatch ]);

  return (
    <nav className={styles.Header}>
      <Link to={{ pathname: '/' }}>{t('Home')}</Link>
      <Link to={{ pathname: '/sign-in' }}>{t('Sign in')}</Link>
      <Link to={{ pathname: '/athlete' }}>{t('Athlete')}</Link>
      <Link to={{ pathname: '/training' }}>{t('Training')}</Link>
      <Link to={{ pathname: '/manage/exercises' }}>{t('Manage Exercises')}</Link>

      {
        isLoggedIn ? (
          <Button
            category={ButtonConstants.ButtonCategories.DANGER}
            textOnly={true}
            onClick={onLogout}
          >
            {t('Sign Out')}
          </Button>
        ) : <></>
      }
    </nav>
  );
};

const HeaderMemo = memo(Header);

export { HeaderMemo as Header };
