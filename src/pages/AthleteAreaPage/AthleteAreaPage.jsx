import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AvatarPlaceholder, Button, CalendarIcon, ClipboardCheckIcon, ClipboardListIcon, GrowlFns, Image, LinkCard, LocationPinIcon, UserIcon } from '@/components';
import { CheckInSlice } from '@/store/slices';

import styles from './AthleteAreaPage.module.scss';

const AthleteAreaPage = () => {
  // TODO: Get real data and remove this placeholder object
  const athleteData = {
    name: 'Cauê da Silva',
    age: 28,
    plan: 'Presencial 2x/semana',
    frequency: '5x semana',
    trainingNumber: '#1/2025',
    objective: 'Fortalecer ombro e joelho, definição e prevenção de lesão',
    production: '11/1',
    // avatar: '/professional-athlete-portrait.png',
  };

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const saveWorkoutMessage = useSelector(CheckInSlice.selectors.selectSaveCheckInMessage);

  const onCloseSaveWorkoutSuccessGrowl = useCallback(() => {
    dispatch(CheckInSlice.actions.clearSaveCheckInMessage());
  }, [ dispatch ]);

  return (
    <div className={styles.AthleteAreaPage}>
      <h1>{t('Athlete')}</h1>

      {/* Athlete Info Card - TODO: Create new component for this */}
      <div className={styles.AthleteCard}>
        <div className={styles.content}>
          <div className={styles.profileInfo}>
            <div className={styles.profileAvatar}>
              {athleteData.avatar
                ? <Image src={athleteData.avatar} />
                : <AvatarPlaceholder userName={athleteData.name} />
              }
            </div>

            <div className={styles.profileDetails}>
              <h2 className={styles.profileName}>{athleteData.name}</h2>

              <div className={styles.profileGrid}>
                <div>
                  <div className={styles.profileField}>
                    <UserIcon />
                    <span className={styles.profileFieldLabel}>{t('Age')}:</span>
                    <span>{athleteData.age} {t('years old')}</span>
                  </div>
                  <div className={styles.profileField}>
                    <CalendarIcon />
                    <span className={styles.profileFieldLabel}>{t('Plan')}:</span>
                    <span>{athleteData.plan}</span>
                  </div>
                  <div className={styles.profileField}>
                    <LocationPinIcon />
                    <span className={styles.profileFieldLabel}>{t('Frequency')}:</span>
                    <span>{athleteData.frequency}</span>
                  </div>
                </div>

                <div>
                  <div className={styles.profileField}>
                    <span className={styles.profileFieldLabel}>{t('Trainning #')}:</span>
                    <span className={styles.badge}>{athleteData.trainingNumber}</span>
                  </div>
                  <div className={styles.profileField}>
                    <span className={styles.profileFieldLabel}>{t('Production')}:</span>
                    <span>{athleteData.production}</span>
                  </div>
                </div>
              </div>

              <div className={styles.objective}>
                <p>
                  <strong>{t('Objective')}:</strong> {athleteData.objective}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Cards Grid - TODO: Create new component for this */}
      <div className={`${styles.ActionsGrid} ${styles.grid3Cols}`}>
        {/* Training Card */}
        <div className={`${styles.AthleteCard} ${styles.hoverable}`}>
          <div className={`${styles.content} ${styles.contentCompact}`}>
            <div className={styles.actionCardHeader}>
              <div className={styles.icon}>
                <ClipboardListIcon />
              </div>
              <div className={styles.actionCardInfo}>
                <h3>{t('Training')}</h3>
                <p>{t('Access your workouts')}</p>
              </div>
            </div>
            <div className={styles.actionCardButtons}>
              <Button className={styles.button}>Treino A</Button>
              <Button className={styles.button}>Treino B</Button>
            </div>
          </div>
        </div>

        {/* Check-ins Card */}
        <div className={`${styles.AthleteCard} ${styles.hoverable}`}>
          <div className={`${styles.content} ${styles.contentCompact}`}>
            <div className={styles.actionCardHeader}>
              <div className={styles.icon}>
                <ClipboardCheckIcon />
              </div>
              <div className={styles.actionCardInfo}>
                <h3>Check-ins</h3>
                <p>{t('Check-in history')}</p>
              </div>
            </div>
            <div className={styles.actionCardMeta}>
              <div className={styles.label}>{t('Last check-in')}:</div>
              <div className={styles.value}>15 de Janeiro, 2025</div>
            </div>
          </div>
        </div>

        {/* Tests Card */}
        <div className={`${styles.AthleteCard} ${styles.hoverable}`}>
          <div className={`${styles.content} ${styles.contentCompact}`}>
            <div className={styles.actionCardHeader}>
              <div className={styles.icon}>
                {/* <Target /> */}
              </div>
              <div className={styles.actionCardInfo}>
                <h3>{t('Physical Assessment')}</h3>
                <p>{t('Assessment history')}</p>
              </div>
            </div>
            <div className={styles.actionCardMeta}>
              <div className={styles.label}>{t('Latest tests')}:</div>
            </div>
          </div>
        </div>
      </div>

      <LinkCard
        text={t('Workout')}
        to={{ pathname: '/workout' }}
        renderIcon={(props) => <ClipboardListIcon {...props} />}
      />

      <LinkCard
        text={t('Check-ins')}
        to={{ pathname: '/check-ins' }}
        renderIcon={(props) => <ClipboardCheckIcon {...props} />}
      />

      {GrowlFns.renderSuccessGrowl({
        message: saveWorkoutMessage,
        onCloseGrowl: onCloseSaveWorkoutSuccessGrowl,
      })}
    </div>
  );
};

const AthleteAreaPageMemo = memo(AthleteAreaPage);

export { AthleteAreaPageMemo as AthleteAreaPage };
