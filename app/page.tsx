'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Counter from '@/components/Counter';
import OrderModal from '@/components/OrderModal';

declare global {
  interface Window {
    AOS: any;
  }
}

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);

  // AOS init
  useEffect(() => {
    const initAOS = () => {
      if (typeof window !== 'undefined' && window.AOS) {
        window.AOS.init({ duration: 800, once: true, offset: 50 });
      }
    };
    // Biroz kutamiz AOS yuklanguncha
    const timer = setTimeout(initAOS, 100);
    // Va keyinchalik ham
    const timer2 = setTimeout(initAOS, 1000);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <Navbar onOrderClick={openModal} />

      {/* HERO */}
      <section id="home" className="hero">
        <div className="container">
          <div className="hero-content" data-aos="fade-right">
            <div className="tagline">🍃 100% TABIIY | HALOL</div>
            <h1>
              CHAMPION <span className="highlight">MAN</span>
            </h1>

            <div className="hero-main-text">
              <p>
                <strong>
                  🏠 Uy sharoitida ortiqcha xarajat va harakatlarsiz tabiiy va
                  halol mahsulot bilan davolanish vaqti keldi!
                </strong>
              </p>
              <p>
                Jinsiy zaiflik va prostata muammolarini Germaniya texnologiyasi
                asosida ishlab chiqarilgan va sinovdan o'tgan{' '}
                <strong>CHAMPION MAN</strong> mahsuloti bilan davolang.
              </p>
              <p>
                <strong>CHAMPION MAN</strong> - Tezkor tabiiy yechim va uzoq
                muddatli kafolat
              </p>
            </div>

            <div className="hero-badges">
              <div className="badge">
                <i className="fas fa-leaf"></i> 100% Tabiiy
              </div>
              <div className="badge">
                <i className="fas fa-flask"></i> Germaniya texnologiyasi
              </div>
              <div className="badge">
                <i className="fas fa-shield-alt"></i> Sinovdan o'tgan
              </div>
              <div className="badge">
                <i className="fas fa-hand-peace"></i> Halol mahsulot
              </div>
            </div>

            <div className="product-types">
              <span className="product-type">
                <i className="fas fa-capsules"></i> Kapsula
              </span>
              <span className="product-type">
                <i className="fas fa-jar"></i> Asal aralashmasi
              </span>
            </div>
          </div>
          <div className="hero-image" data-aos="fade-left">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/image.png"
              alt="Champion Man"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://placehold.co/400x450/2c1810/d4a017?text=CHAMPION+MAN';
              }}
            />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card" data-aos="zoom-in">
              <i className="fas fa-smile"></i>
              <h3>
                <Counter target={12000} />+
              </h3>
              <p>Mamnun mijozlar</p>
            </div>
            <div className="stat-card" data-aos="zoom-in" data-aos-delay="100">
              <i className="fas fa-leaf"></i>
              <h3>
                <Counter target={28} />+
              </h3>
              <p>Tabiiy komponent</p>
            </div>
            <div className="stat-card" data-aos="zoom-in" data-aos-delay="200">
              <i className="fas fa-trophy"></i>
              <h3>
                <Counter target={98} />%
              </h3>
              <p>Mijozlar mamnuniyati</p>
            </div>
            <div className="stat-card" data-aos="zoom-in" data-aos-delay="300">
              <i className="fas fa-clock"></i>
              <h3>
                <Counter target={30} /> kun
              </h3>
              <p>Kafolat</p>
            </div>
          </div>
        </div>
      </section>

      {/* INGREDIENTS */}
      <section id="ingredients" className="ingredients">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2>
              Tabiiy <span style={{ color: '#d4a017' }}>Tarkib</span>
            </h2>
            <div className="underline"></div>
            <p>28 dan ortiq qimmatbaho o'simlik ekstraktlari</p>
          </div>
          <div className="ingredients-grid">
            <div className="ingredient-card" data-aos="flip-left">
              <i className="fas fa-seedling"></i>
              <h4>Tribulus</h4>
              <p>Testosteron ishlab chiqaradi</p>
            </div>
            <div
              className="ingredient-card"
              data-aos="flip-left"
              data-aos-delay="50"
            >
              <i className="fas fa-leaf"></i>
              <h4>Yohimbe</h4>
              <p>Jinsiy quvvatni oshiradi</p>
            </div>
            <div
              className="ingredient-card"
              data-aos="flip-left"
              data-aos-delay="100"
            >
              <i className="fas fa-tree"></i>
              <h4>Epimedium</h4>
              <p>Erkaklik kuchini faollashtiradi</p>
            </div>
            <div
              className="ingredient-card"
              data-aos="flip-left"
              data-aos-delay="150"
            >
              <i className="fas fa-root"></i>
              <h4>Jenshen</h4>
              <p>Energiya va chidamlilik</p>
            </div>
            <div
              className="ingredient-card"
              data-aos="flip-left"
              data-aos-delay="200"
            >
              <i className="fas fa-seedling"></i>
              <h4>Qora sedana</h4>
              <p>Sperma sifatini yaxshilaydi</p>
            </div>
            <div
              className="ingredient-card"
              data-aos="flip-left"
              data-aos-delay="250"
            >
              <i className="fas fa-apple-alt"></i>
              <h4>Uzum danagi</h4>
              <p>Qon aylanishni yaxshilaydi</p>
            </div>
            <div
              className="ingredient-card"
              data-aos="flip-left"
              data-aos-delay="300"
            >
              <i className="fas fa-mortar-board"></i>
              <h4>Kist al-Hindi</h4>
              <p>Immunitet va jinsiy faollik</p>
            </div>
            <div
              className="ingredient-card"
              data-aos="flip-left"
              data-aos-delay="350"
            >
              <i className="fas fa-bee"></i>
              <h4>Asalari gul changi</h4>
              <p>Tabiiy energiya</p>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section id="benefits" className="benefits">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2>
              Nima uchun{' '}
              <span style={{ color: '#d4a017' }}>Champion Man?</span>
            </h2>
            <div className="underline"></div>
          </div>
          <div className="benefits-grid">
            <div className="benefit-card" data-aos="zoom-in">
              <i className="fas fa-chart-line"></i>
              <h4>Testosteronni oshiradi</h4>
              <p>Tabiiy ravishda erkaklik gormoni darajasini ko'taradi</p>
            </div>
            <div
              className="benefit-card"
              data-aos="zoom-in"
              data-aos-delay="50"
            >
              <i className="fas fa-heartbeat"></i>
              <h4>Prostata sog'lig'i</h4>
              <p>Prostata bezini mustahkamlaydi</p>
            </div>
            <div
              className="benefit-card"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <i className="fas fa-dna"></i>
              <h4>Sperma sifatini yaxshilaydi</h4>
              <p>Urug' hujayralarining soni va harakatchanligini oshiradi</p>
            </div>
            <div
              className="benefit-card"
              data-aos="zoom-in"
              data-aos-delay="150"
            >
              <i className="fas fa-bolt"></i>
              <h4>Energiya va chidamlilik</h4>
              <p>Kundalik faollik va charchoqni kamaytiradi</p>
            </div>
            <div
              className="benefit-card"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <i className="fas fa-brain"></i>
              <h4>Stressni kamaytiradi</h4>
              <p>Asab tizimini tinchlantiradi</p>
            </div>
            <div
              className="benefit-card"
              data-aos="zoom-in"
              data-aos-delay="250"
            >
              <i className="fas fa-tint"></i>
              <h4>Qon aylanishini yaxshilaydi</h4>
              <p>Qon tomirlarni kengaytiradi</p>
            </div>
          </div>
        </div>
      </section>

      {/* SCIENTIFIC */}
      <section className="scientific">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2>
              Ilmiy <span style={{ color: '#d4a017' }}>asos</span>
            </h2>
            <div className="underline"></div>
          </div>
          <div className="scientific-grid">
            <div className="scientific-card" data-aos="fade-right">
              <h3>
                <i className="fas fa-microscope"></i> Tribulus terrestris
              </h3>
              <ul>
                <li>Testosteron ishlab chiqarilishini kuchaytiradi</li>
                <li>Mushak kuchini va potensiyani oshiradi</li>
                <li>Libidoni tabiiy ravishda faollashtiradi</li>
              </ul>
            </div>
            <div className="scientific-card" data-aos="fade-left">
              <h3>
                <i className="fas fa-flask"></i> Qora sedana yog'i
              </h3>
              <ul>
                <li>Sperma soni va harakatchanligini yaxshilaydi</li>
                <li>
                  Timoxinon antioksidant oksidativ zarardan himoya qiladi
                </li>
                <li>Kortizol darajasini pasaytiradi</li>
              </ul>
            </div>
            <div
              className="scientific-card"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <h3>
                <i className="fas fa-seedling"></i> Qovun urug'i
              </h3>
              <ul>
                <li>Sink, magniy, arginin va omega yog' kislotalariga boy</li>
                <li>Spermatogenezni faollashtiradi</li>
                <li>Spermogramma ko'rsatkichlarini yaxshilaydi</li>
              </ul>
            </div>
            <div
              className="scientific-card"
              data-aos="fade-left"
              data-aos-delay="100"
            >
              <h3>
                <i className="fas fa-tree"></i> Kist al-Hindi (Costus)
              </h3>
              <ul>
                <li>Immunitet tizimini mustahkamlaydi</li>
                <li>Jinsiy faollikni oshiradi</li>
                <li>Sperma ishlab chiqarishni ko'paytiradi</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HOW TO USE */}
      <section id="howtouse" className="howtouse">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2>Qanday ishlatiladi?</h2>
            <div className="underline"></div>
          </div>
          <div className="use-grid">
            <div className="use-card" data-aos="fade-right">
              <i className="fas fa-capsules"></i>
              <h3>Kapsula</h3>
              <p>
                Kuniga 2 marta, ovqatdan keyin
                <br />1 kapsuladan iliq suv bilan
              </p>
            </div>
            <div className="use-card" data-aos="fade-left">
              <i className="fas fa-jar"></i>
              <h3>Asal aralashmasi</h3>
              <p>
                Kuniga 2 marta, ovqatdan keyin
                <br />1 choy qoshiqdan
              </p>
            </div>
          </div>
          <div className="warning">
            <i className="fas fa-exclamation-triangle"></i>
            <p>
              <strong>⚠️ Ehtiyot chorasi:</strong> 18 yoshdan kichiklar,
              homilador va emizikli ayollar uchun tavsiya etilmaydi. Qon bosimi
              baland bo'lganda shifokor bilan maslahatlashing.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container" data-aos="zoom-in">
          <h2>
            Hoziroq <span className="highlight">buyurtma bering!</span>
          </h2>
          <p>Cheklangan taklif — 30 kunlik kafolat bilan sinab ko'ring</p>
          <button className="btn-order" id="ctaOrderBtn" onClick={openModal}>
            <i className="fas fa-shopping-cart"></i> BUYURTMA BERISH
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h4>🏆 Champion Man</h4>
              <p>Erkaklar salomatligi uchun tabiiy yechim</p>
            </div>
            <div className="footer-col">
              <h4>Menyu</h4>
              <a href="#home">Bosh sahifa</a>
              <a href="#ingredients">Tarkibi</a>
              <a href="#benefits">Foydalari</a>
              <a href="#howtouse">Qo'llanma</a>
            </div>
            <div className="footer-col">
              <h4>Bog'lanish</h4>
              <p>
                <i className="fas fa-phone"></i> +998 55 515 90 96
              </p>
              <a
                href="https://t.me/champion_men_uzb"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-telegram"></i> Telegram
              </a>
              <a
                href="https://www.instagram.com/champion_men_uz"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i> Instagram
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              &copy; 2026 Champion Man. Barcha huquqlar himoyalangan. | 100%
              Tabiiy mahsulot
            </p>
          </div>
        </div>
      </footer>

      {/* MODAL */}
      <OrderModal isOpen={modalOpen} onClose={closeModal} />
    </>
  );
}
