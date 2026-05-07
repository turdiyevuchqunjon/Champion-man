'use client';

import { useState, useEffect } from 'react';
import {
  trackPixelEvent,
  generateEventId,
} from '@/components/MetaPixel';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Cookie helper
function getCookie(name: string): string {
  if (typeof document === 'undefined') return '';
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
  return '';
}

const REGIONS = [
  { value: 'Toshkent shahar', label: '🏙️ Toshkent shahar' },
  { value: 'Toshkent viloyati', label: '🏞️ Toshkent viloyati' },
  { value: 'Samarqand', label: '🕌 Samarqand' },
  { value: 'Buxoro', label: '📿 Buxoro' },
  { value: 'Andijon', label: '🍎 Andijon' },
  { value: "Farg'ona", label: '🌸 Farg\'ona' },
  { value: 'Namangan', label: '🏔️ Namangan' },
  { value: 'Qashqadaryo', label: '🐪 Qashqadaryo' },
  { value: 'Surxondaryo', label: '🌄 Surxondaryo' },
  { value: 'Xorazm', label: '🏜️ Xorazm' },
  { value: 'Navoiy', label: '⛏️ Navoiy' },
  { value: 'Jizzax', label: '🌾 Jizzax' },
  { value: 'Sirdaryo', label: '🌊 Sirdaryo' },
  { value: "Qoraqalpog'iston", label: '🏕️ Qoraqalpog\'iston' },
];

export default function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [age, setAge] = useState('');
  const [region, setRegion] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<{
    text: string;
    color: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  // Modal ochilganda body scroll'ni o'chirish
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset
      setStatus(null);
      // Pixel: InitiateCheckout event
      const eventId = generateEventId();
      trackPixelEvent(
        'InitiateCheckout',
        {
          content_name: 'Champion Man',
          content_category: 'Mens Health',
        },
        eventId
      );
      // CAPI ga ham yuborish
      const fbp = getCookie('_fbp');
      const fbc = getCookie('_fbc');
      fetch('/api/meta-capi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventName: 'InitiateCheckout',
          eventId,
          fbp,
          fbc,
          eventSourceUrl: window.location.href,
          customData: {
            content_name: 'Champion Man',
            content_category: 'Mens Health',
          },
        }),
      }).catch(() => {});
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Telefon raqami input - faqat raqamlar
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 9);
    setPhone(value);
  };

  // Modal tashqarisiga bosilganda yopish
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validatsiya (client-side)
    if (!name.trim()) {
      setStatus({ text: '❌ Ismingizni kiriting!', color: '#e74c3c' });
      return;
    }
    const ageNum = parseInt(age, 10);
    if (!age || isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
      setStatus({
        text: "❌ Yoshingiz 18-100 oralig'ida bo'lishi kerak!",
        color: '#e74c3c',
      });
      return;
    }
    if (!region) {
      setStatus({ text: '❌ Viloyatingizni tanlang!', color: '#e74c3c' });
      return;
    }
    if (phone.length !== 9) {
      setStatus({
        text: "❌ Telefon 9 raqam bo'lishi kerak",
        color: '#e74c3c',
      });
      return;
    }
    const pattern = /^(90|91|93|94|95|97|98|99|33|88|77|50|55)\d{7}$/;
    if (!pattern.test(phone)) {
      setStatus({
        text: "❌ Faqat O'zbekiston raqamlari",
        color: '#e74c3c',
      });
      return;
    }

    setStatus({ text: '⏳ Yuborilmoqda...', color: '#3498db' });
    setLoading(true);

    // Pixel + CAPI: Lead event (deduplication uchun bir xil eventId)
    const eventId = generateEventId();
    trackPixelEvent(
      'Lead',
      {
        content_name: 'Champion Man',
        content_category: 'Mens Health',
        content_type: 'product',
      },
      eventId
    );

    try {
      const fbp = getCookie('_fbp');
      const fbc = getCookie('_fbc');

      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          surname,
          age,
          region,
          phone,
          fbp,
          fbc,
          eventId,
          eventSourceUrl:
            typeof window !== 'undefined' ? window.location.href : '',
        }),
      });
      const data = await res.json();

      if (data.ok) {
        setStatus({
          text: "✅ Sizning soʻrovingiz qabul qilindi! Tez orada bogʻlanamiz.",
          color: '#27ae60',
        });
        // Forma reset
        setTimeout(() => {
          onClose();
          setName('');
          setSurname('');
          setAge('');
          setRegion('');
          setPhone('');
          setStatus(null);
          setLoading(false);
        }, 2500);
      } else {
        setStatus({
          text: `❌ ${data.error || 'Xatolik yuz berdi.'}`,
          color: '#e74c3c',
        });
        setLoading(false);
      }
    } catch (err) {
      setStatus({
        text: '❌ Xatolik yuz berdi. Qaytadan urining.',
        color: '#e74c3c',
      });
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="orderModal"
      className="modal active"
      onClick={handleBackdropClick}
    >
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="modal-icon">
          <i className="fas fa-clipboard-list"></i>
        </div>
        <h3>Buyurtma berish</h3>
        <p className="modal-product-text">
          Mahsulot: <strong>Champion Man</strong>
        </p>

        <form id="orderForm" onSubmit={handleSubmit}>
          <div className="input-group">
            <i className="fas fa-user"></i>
            <input
              type="text"
              id="name"
              placeholder="Ismingiz *"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <i className="fas fa-user-tag"></i>
            <input
              type="text"
              id="surname"
              placeholder="Familiyangiz"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>

          <div className="input-group">
            <i className="fas fa-calendar-alt"></i>
            <input
              type="number"
              id="age"
              placeholder="Yoshingiz *"
              min={18}
              max={100}
              required
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div className="input-group">
            <i className="fas fa-map-marker-alt"></i>
            <select
              id="region"
              required
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="" disabled>
                Viloyatingizni tanlang *
              </option>
              {REGIONS.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group phone-group">
            <i className="fas fa-phone"></i>
            <span className="phone-code">+998</span>
            <input
              type="tel"
              id="phone"
              placeholder="90 123 45 67"
              maxLength={9}
              inputMode="numeric"
              required
              value={phone}
              onChange={handlePhoneChange}
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
            id="submitBtn"
            disabled={loading}
          >
            <i className="fas fa-paper-plane"></i> Yuborish
          </button>
        </form>
        {status && (
          <div
            id="formStatus"
            className="status"
            style={{ color: status.color }}
          >
            {status.text}
          </div>
        )}
      </div>
    </div>
  );
}
