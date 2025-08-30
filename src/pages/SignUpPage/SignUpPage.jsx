import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';

import { Button, ButtonConstants, FieldWithLabel, GrowlFns, Input, UserPlusIcon } from '@/components';
import { UserSlice } from '@/store/slices';

import styles from './SignUpPage.module.scss';

const SignUpPage = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const signUpError = useSelector(UserSlice.selectors.selectSignUpError);

  const [ fullName, setFullName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ phoneNumber, setPhoneNumber ] = useState('');
  const [ birthdate, setBirthdate ] = useState('');
  const [ occupation, setOccupation ] = useState('');
  const [ goal, setGoal ] = useState('');
  const [ limitations, setLimitations ] = useState('');
  const [ medicalRestrictions, setMedicalRestrictions ] = useState('');
  const [ medicine, setMedicine ] = useState('');
  const [ confirmInformation, setConfirmInformation ] = useState(false);

  const onSubmitSignUp = useCallback((event) => {
    event.preventDefault();

    if(password != confirmPassword) {
      dispatch(UserSlice.actions.confirmPasswordError());
      return;
    }

    const signUpDate = (new Date()).toISOString();

    dispatch(UserSlice.actions.signUpUser({
      email,
      password,
      fullName,
      phoneNumber,
      birthdate,
      occupation,
      goal,
      limitations,
      medicalRestrictions,
      medicine,
      confirmInformation,
      signUpDate,
    }));
  }, [ birthdate, confirmInformation, confirmPassword, dispatch, email, fullName, goal, limitations, medicalRestrictions, medicine, occupation, password, phoneNumber ]);

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

      <form onSubmit={onSubmitSignUp} className={styles.form}>
        <FieldWithLabel
          label={t('Fullname')}
          field={(
            <Input
              type="text"
              name="email"
              value={fullName}
              required={true}
              onChange={(event) => setFullName(event.target.value)}
            />
          )}
        />

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
          label={t('Phone Number')}
          field={(
            <Input
              type="text"
              name="phone-number"
              maxLength="15"
              value={phoneNumber}
              required={true}
              onChange={(event) => setPhoneNumber(event.target.value)}
            />
          )}
        />

        <FieldWithLabel
          label={t('Birthdate')}
          field={(
            <Input
              type="date"
              name="birthdate"
              value={birthdate}
              required={true}
              onChange={(event) => setBirthdate(event.target.value)}
            />
          )}
        />

        <FieldWithLabel
          label={t('Occupation')}
          field={(
            <Input
              type="text"
              name="occupation"
              value={occupation}
              required={true}
              onChange={(event) => setOccupation(event.target.value)}
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

        <FieldWithLabel
          label={t('Confirm Password')}
          field={(
            <Input
              type="password"
              name="confirm-password"
              value={confirmPassword}
              required={true}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          )}
        />

        <div className={styles.Anamnese}>
          <h3>{t('Anamnese')}</h3>

          <p>{t('In order for you to access your workouts, I\'ll need some information. We\'ll conduct a medical history to ensure training safety. Feel free to share whatever you think is relevant.')}</p>

          <FieldWithLabel
            label={t('What is your goal with training?')}
            field={(
              <Input
                type="text"
                name="goal"
                value={goal}
                required={true}
                onChange={(event) => setGoal(event.target.value)}
              />
            )}
          />

          <FieldWithLabel
            label={t('Do you have any limitations when it comes to exercise?')}
            field={(
              <Input
                type="text"
                name="limitations"
                value={limitations}
                required={true}
                onChange={(event) => setLimitations(event.target.value)}
              />
            )}
          />

          <FieldWithLabel
            label={t('Do you have any medical restrictions?')}
            field={(
              <Input
                type="text"
                name="medical-restrictions"
                value={medicalRestrictions}
                required={true}
                onChange={(event) => setMedicalRestrictions(event.target.value)}
              />
            )}
          />

          <FieldWithLabel
            label={t('Are you taking any medicine?')}
            field={(
              <Input
                type="text"
                name="medicine"
                value={medicine}
                required={true}
                onChange={(event) => setMedicine(event.target.value)}
              />
            )}
          />

          <FieldWithLabel
            label={t('I am aware of and responsible for the information provided here')}
            field={(
              <Input
                type="checkbox"
                name="confirm-information"
                value={confirmInformation}
                required={true}
                onChange={(event) => setConfirmInformation(event.target.value)}
              />
            )}
          />
        </div>

        <p className={styles.disclaimer}>{t('I recommend that you undergo a medical examination before starting training to obtain the professional\'s approval')}</p>

        <Button
          category={ButtonConstants.ButtonCategories.SUCCESS}
          icon={<UserPlusIcon />}
          className={styles.btnSubmit}
        >
          {t('Sign up')}
        </Button>
      </form>

      {GrowlFns.renderErrorGrowl({
        message: signUpError,
        onCloseGrowl: onCloseSignUpErrorGrowl,
      })}
    </div>
  );
};

const SignUpPageMemo = memo(SignUpPage);

export { SignUpPageMemo as SignUpPage };
