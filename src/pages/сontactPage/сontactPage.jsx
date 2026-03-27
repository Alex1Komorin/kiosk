// src/pages/ContactPage/ContactPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './contactPage.css';

const ContactPage = () => {
  const navigate = useNavigate();

  const handleCardClick = (url) => {
    if (url) {
      navigate(`/external?url=${encodeURIComponent(url)}`);
    }
  };

  return (
    <div className="contact-page-container">
      <div className="contact-grid">
        <div 
          className="contact-card-wrapper"
          onClick={() => handleCardClick('https://kosgos.ru/')}
        >
          <img 
            src="/кгу.png" 
            alt="КГУ" 
            className="contact-image"
          />
          <p className="contact-card-title">Сайт КГУ</p>
        </div>
        
        <div 
          className="contact-card-wrapper"
          onClick={() => handleCardClick('https://itschool.kosgos.ru/')}
        >
          <img 
            src="/ВИТШ.png" 
            alt="ИВИТШ" 
            className="contact-image"
          />
          <p className="contact-card-title">Сайт ИВИТШ</p>
        </div>
      </div>

      <div className="info-grid">
        <div className="info-container">
          <div><b>Директор</b> ул. Ивановская, д. 24а, кабинет 210</div>
          <div><b>Телефон:</b> Нет данных</div>
        </div>

        <div className="info-container">
          <div><b>Дирекция</b></div>
          <div><b>Адрес:</b> ул. Ивановская, д. 24а, кабинет 209</div>
          <div><b>Телефон:</b> +7 (4942) 63-49-00 (доб. 8900)</div>
          <div><b>Время работы:</b> с пн по пт с 9:00 до 17:00</div>
        </div>

        <div className="info-container">
          <div><b>Кафедра информационных систем и технологий</b></div>
          <div><b>Адрес:</b> ул. Ивановская, д. 24а, кабинет 214</div>
          <div><b>Телефон:</b> +7 (4942) 63-49-00 (доб. 8120)</div>
        </div>

        <div className="info-container">
          <div><b>Кафедра прикладной математики и информатики</b></div>
          <div><b>Адрес:</b> ул. Ивановская, д. 24а, кабинет 215</div>
          <div><b>Телефон:</b> +7 (4942) 63-49-00 (доб. 8750)</div>
        </div>

        <div className="info-container">
          <div><b>Кафедра защиты информации</b></div>
          <div><b>Адрес:</b> ул. Ивановская, д. 24а, кабинет 212</div>
          <div><b>Телефон:</b> +7 (4942) 63-49-00 (доб. 8730)</div>
        </div>

        <div className="info-container">
          <div><b>Контактные телефоны</b></div>
          <div>+7 (4942) 63-49-00 (доб. 1010) - ректорат,</div>
          <div>(доб. 643) - отдел кадров по работе с обучающимися,</div>
          <div>(доб. 644) - приемная комиссия,</div>
          <div>(доб. 1400) - канцелярия,</div>
          <div>(доб. 2112, 2113) - бухгалтерия (по оплате за обучение),</div>
          <div>(доб. 2123) - бухгалтерия (по заработной плате),</div>
          <div>(доб. 1110) - отдел кадров</div>
          <div>(доб. 1014) - приемная проректора по образовательной деятельности</div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;