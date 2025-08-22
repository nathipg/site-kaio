import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './Testimonials.module.scss';

export default function Testimonials() {
  const { t } = useTranslation();

  // TO ADD/EDIT TESTIMONIALS, UPDATE THIS OBJECT AND DON'T FORGET TO UPDATE THE translation.json FILE.
  const testimonials = [
    { name: 'Ana Julia Marques', text: t('The teacher is excellent! I have been with him for over 3 years and the progress is clear! I recommend him for all types of athletes, from beginners to professionals!') },
    { name: 'Eduardo Miranda', text: t('Kaio is incredible. He understands a lot technically, genuinely cares about his students, is super attentive, always pays attention to every detail, and is an amazing person.') },
    { name: 'Luisa Ono de Souza', text: t('Excellent technician, persistent, dedicated, patient, good dynamics.') },
    { name: 'Caio Castro dos Santos', text: t('Kaio has always been very dedicated to the team throughout the entire period I trained with him, and he is undoubtedly the reason for my progress in basketball. He knows how to deal with each member of the team, bringing out the best in us and helping us achieve extraordinary results.') },
    { name: 'Carolina Mucin Uliana', text: t('I have been training with Kaio for years and I would not give him up for anything. He is a highly skilled professional who always strives to do what is best for his students. He helps me a lot with my pain and needs. I highly recommend him!') },
    { name: 'Marilia Pimenta', text: t('Professor Kaio is very attentive and dedicated! He tailors training sessions to suit your current condition, goals, and preferences! He is extremely technically skilled! My results improved dramatically after I started consulting with him about my training! I highly recommend him.') },
  ];

  return (
    <section className={styles.Testimonials}>
      <div className={styles.container}>
        <h2>{t('Testimonials')}</h2>
        <Swiper
          modules={[ Pagination, Autoplay ]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          className={styles.swiper}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <blockquote className={styles.card}>
                <p>“{testimonial.text}”</p>
                <footer>— {testimonial.name}</footer>
              </blockquote>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

const TestimonialsMemo = memo(Testimonials);

export { TestimonialsMemo as Testimonials };