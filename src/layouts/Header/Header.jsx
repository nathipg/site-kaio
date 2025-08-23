import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';

import { Button, ButtonConstants, BarsIcon, KaioLogo, XIcon } from '@/components';
import { UserSlice } from '@/store/slices';

import styles from './Header.module.scss';

const Header = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [ isMenuOpen, setIsMenuOpen ] = useState(false);

  const isLoggedIn = useSelector(UserSlice.selectors.isLoggedIn);

  const onLogout = useCallback((event) => {
    event.preventDefault();
    dispatch(UserSlice.actions.signOutUser());
  }, [ dispatch ]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(currentIsMenuOpen => {
      document.body.style.overflow = !currentIsMenuOpen ? 'hidden' : '';
      return !currentIsMenuOpen;
    });
  }, []);

  return (
    <header className={styles.Header}>
      <div className={styles.logo} title='Kaio Guerrero Personal Trainer'>
        <Link to={{ pathname: '/' }} onClick={isMenuOpen ? toggleMenu : ''}>
          <KaioLogo width='1.5rem' color='white' />
          <span>Kaio Guerrero</span>
        </Link>
      </div>
      
      <button className={styles.menuToggle} onClick={toggleMenu}>
        {isMenuOpen ?
          <XIcon color='white' /> :
          <BarsIcon color='white' />
        }
      </button>

      <nav className={`${styles.nav} ${isMenuOpen ? styles.active : ''}`}>
        <Link to={{ pathname: '/sign-in' }} onClick={toggleMenu}>{t('Sign in')}</Link>
        <Link to={{ pathname: '/athlete' }} onClick={toggleMenu}>{t('Athlete')}</Link>
        <Link to={{ pathname: '/training' }} onClick={toggleMenu}>{t('Training')}</Link>
        <Link to={{ pathname: '/manage/exercises' }} onClick={toggleMenu}>{t('Manage Exercises')}</Link>
        <Link to={{ pathname: '/manage/workouts' }} onClick={toggleMenu}>{t('Manage Workouts')}</Link>
        <Link to={{ pathname: '/manage/users-workouts' }} onClick={toggleMenu}>{t('Manage Users Workouts')}</Link>

        {isLoggedIn && (
          <Button
            category={ButtonConstants.ButtonCategories.DANGER}
            textOnly={true}
            onClick={onLogout}
          >
            {t('Sign Out')}
          </Button>
        )}
      </nav>
    </header>
  );
};

const HeaderMemo = memo(Header);

export { HeaderMemo as Header };
