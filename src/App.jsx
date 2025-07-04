import { useTranslation } from 'react-i18next';

import './global.scss';

const App = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t('Home Page Here')}</h1>
    </>
  );
};

export { App };
