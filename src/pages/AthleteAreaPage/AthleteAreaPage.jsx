import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router';

import { ActionCard, AvatarPlaceholder, CalendarIcon, ClipboardCheckIcon, ClipboardListIcon, Image, LocationPinIcon, UserIcon } from '@/components';
import { UserSlice } from '@/store/slices';
import { utils } from '@/utils';

import styles from './AthleteAreaPage.module.scss';

const AthleteAreaPage = () => {
  const { t } = useTranslation();

  const [ searchParams ] = useSearchParams();

  const athleteId = searchParams.get('uid') || null;

  const loggedUser = useSelector(UserSlice.selectors.selectLoggedUser);
  const selectedAthlete = useSelector(UserSlice.selectors.selectUserByUid(athleteId));

  const athleteData = useMemo(() => {
    if(!athleteId) {
      return {
        plan: '',
        frequency: '',
        ...(loggedUser || {}),
        age: utils.calculateAge(loggedUser?.birthdate),
      };
    }

    return {
      plan: '',
      frequency: '',
      ...(selectedAthlete || {}),
      age: utils.calculateAge(loggedUser?.birthdate),
    };
  }, [ athleteId, loggedUser, selectedAthlete ]);

  return (
    <div className={styles.AthleteAreaPage}>
      <h1>{t('Athlete')}</h1>

      <div className={styles.AthleteCard}>
        <div className={styles.content}>
          <div className={styles.profileInfo}>
            <div className={styles.profileAvatar}>
              {athleteData.avatar
                ? <Image src={athleteData.avatar} />
                : <AvatarPlaceholder userName={athleteData.fullName} />
              }
            </div>

            <div className={styles.profileDetails}>
              <h2 className={styles.profileName}>{athleteData.fullName}</h2>

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
              </div>

              <div className={styles.objective}>
                <p>
                  <strong>{t('Objective')}:</strong> {athleteData.goal}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.ActionsGrid} ${styles.grid3Cols}`}>
        <ActionCard
          renderIcon={(props) => <ClipboardListIcon {...props} />}
          title={t('Training')}
          description={t('Access your workouts')}
          to={{ pathname: '/workout' }}
        />

        <ActionCard
          renderIcon={(props) => <ClipboardCheckIcon {...props} />}
          title="Check-ins"
          description={t('Check-in history')}
          to={{ pathname: '/check-ins' }}
        >
          {/* <div className={styles.actionCardMeta}>
            <div className={styles.label}>{t('Last check-in')}:</div>
            <div className={styles.value}>15 de Janeiro, 2025</div>
          </div> */}
        </ActionCard>

        {/* TODO: Confirm with Kaio how the Physical Assessment page will look. */}
        {/* <ActionCard
          renderIcon={(props) => <RankingStarIcon className='CSJ' {...props} />}
          title={t('Physical Assessment')}
          description={t('Assessment history')}
        >
          <div className={styles.actionCardMeta}>
            <div className={styles.label}>{t('Latest tests')}:</div>
          </div>
        </ActionCard> */}
      </div>
    </div>
  );
};

const AthleteAreaPageMemo = memo(AthleteAreaPage);

export { AthleteAreaPageMemo as AthleteAreaPage };
