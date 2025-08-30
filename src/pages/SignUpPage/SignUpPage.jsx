import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';

import { Button, ButtonConstants, GrowlFns, UserForm, UserFormConstants } from '@/components';
import { UserSlice } from '@/store/slices';

import styles from './SignUpPage.module.scss';

const SignUpPage = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const signUpError = useSelector(UserSlice.selectors.selectSignUpError);

  const onSubmitSignUp = useCallback((data) => {
    const { password, confirmPassword, confirmInformation, ...otherData } = data;

    if(!confirmInformation) {
      dispatch(UserSlice.actions.missingConfirmError());
      return;
    }

    if(password != confirmPassword) {
      dispatch(UserSlice.actions.confirmPasswordError());
      return;
    }

    const signUpDate = (new Date()).toISOString();

    dispatch(UserSlice.actions.signUpUser({
      ...otherData,
      password,
      confirmInformation,
      signUpDate,
    }));
  }, [ dispatch ]);

  const onCloseSignUpErrorGrowl = useCallback(() => {
    dispatch(UserSlice.actions.clearSignUpError());
  }, [ dispatch ]);

  return (
    <div className={styles.SignUpContainer}>
      <div>
        <h2>{t('Create an Account')}</h2>

        <Link to={{ pathname: '/sign-in' }}>
          <Button
            category={ButtonConstants.ButtonCategories.PRIMARY}
            textOnly={true}
            className={styles.btnSignIn}
          >
            {t('Already have an account? Sign in')}
          </Button>
        </Link>
      </div>

      <UserForm
        mode={UserFormConstants.USER_FORM_MODES.SIGN_UP}
        onSubmit={onSubmitSignUp}
      />

      {GrowlFns.renderErrorGrowl({
        message: signUpError,
        onCloseGrowl: onCloseSignUpErrorGrowl,
      })}
    </div>
  );
};

const SignUpPageMemo = memo(SignUpPage);

export { SignUpPageMemo as SignUpPage };
