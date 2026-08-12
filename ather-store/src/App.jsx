import React, { useState } from 'react';

// Importation directe des images depuis src/uploads
import imgS from './uploads/11.jpeg';
import imgM from './uploads/12.jpeg';
import imgL from './uploads/13.jpeg';

export default function App() {
  const [selectedSize, setSelectedSize] = useState('M'); // S, M, أو L
  const [selectedColor, setSelectedColor] = useState('أبيض'); // Couleur par défaut
  const [formData, setFormData] = useState({
    fullname: '',
    phone: '',
    state: '',
    address: ''
  });

  // Gestion dynamique des images, prix et dimensions selon S, M, L
  const getProductInfo = () => {
    switch (selectedSize) {
      case 'S':
        return {
          image: imgS,
          name: 'المصحف الشريف - المقاس الصغير (12/17)',
          price: 70
        };
      case 'M':
        return {
          image: imgM,
          name: 'المصحف الشريف - المقاس المتوسط (14/20)',
          price: 80
        };
      case 'L':
        return {
          image: imgL,
          name: 'المصحف الشريف - المقاس الكبير (17/24)',
          price: 90
        };
      default:
        return {
          image: imgM,
          name: 'المصحف الشريف - المقاس المتوسط (14/20)',
          price: 80
        };
    }
  };

  const product = getProductInfo();
  const shippingFee = 8; // Frais de livraison fixes
  const totalAmount = product.price + shippingFee;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Contrôle : Vérifier que le numéro comporte exactement 8 chiffres et pas de lettres
    const phoneRegex = /^[0-9]{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert("الرجاء إدخال رقم هاتف صحيح يتكون من 8 أرقام בדיוק (بدون حروف أو رموز).");
      return; // Bloque l'envoi si le format est incorrect
    }

    const phoneNumber = "21655553905"; // Numéro WhatsApp
    
    const message = `🛍️ *طلب جديد من موقع أثر (Ather)*\n\n` +
                    `📦 *المنتج:* ${product.name}\n` +
                    `📏 *المقاس:* ${selectedSize}\n` +
                    `🎨 *اللون:* ${selectedColor}\n` +
                    `💰 *المجموع:* ${totalAmount} د.ت\n\n` +
                    `👤 *الاسم:* ${formData.fullname}\n` +
                    `📞 *الهاتف:* ${formData.phone}\n` +
                    `📍 *الولاية:* ${formData.state}\n` +
                    `🏠 *العنوان:* ${formData.address}`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="page-container">
      
      <div className="top-banner">
        ✨ توصيل سريع (24h/48h) و الدفع عند الاستلام 🇹🇳 ✨
      </div>

      <header className="header">
        <h1 className="logo">أثر</h1>
      </header>

      <div className="product-hero">
        <h2 className="product-title">صندوق خشبي فاخر + كتاب القرآن بالتفسير والتقسيم الموضوعي 🎁</h2>
        <div className="price-box">
          <span className="current-price">{product.price}.00 د.ت</span>
          <span className="old-price">120.00 د.ت</span>
          <span className="discount-badge">-25%</span>
        </div>
      </div>

      {/* Image principale */}
      <div className="main-image-container">
        <img 
          src={product.image} 
          alt={product.name} 
          className="main-image" 
        />
      </div>

      {/* Miniatures */}
      <div className="thumbnails">
        <img src={imgS} alt="S" className={`thumb ${selectedSize === 'S' ? 'active' : ''}`} onClick={() => setSelectedSize('S')} />
        <img src={imgM} alt="M" className={`thumb ${selectedSize === 'M' ? 'active' : ''}`} onClick={() => setSelectedSize('M')} />
        <img src={imgL} alt="L" className={`thumb ${selectedSize === 'L' ? 'active' : ''}`} onClick={() => setSelectedSize('L')} />
      </div>

      <div className="features-section">
        <h3>التقسيم الموضوعي</h3>
        <p>ألوان لكل موضوع: تميز بصري يسهل فهم الموضوعات ويقرب معنى الآيات.<br />تفسير مبسط: يساعد على فهم المعنى العام لكل آية بسهولة ووضوح.</p>
      </div>

      <div className="trust-badges">
        <div className="badge-item"><span>🇹🇳</span>صنع في تونس</div>
        <div className="badge-item"><span>🚚</span>توصيل سريع</div>
        <div className="badge-item"><span>💬</span>دعم فوري</div>
        <div className="badge-item"><span>🎁</span>هدية مع كل طلب</div>
      </div>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} id="order-form" className="order-form">
        
        {/* Choix des tailles S, M, L avec dimensions */}
        <div className="form-group">
          <label>الْحَجْمُ</label>
          <div className="options-grid">
            <label className={`option-card ${selectedSize === 'S' ? 'selected' : ''}`}>
              <input type="radio" name="size" checked={selectedSize === 'S'} onChange={() => setSelectedSize('S')} />
              صغير
              <span>12/17 سم</span>
            </label>
            <label className={`option-card ${selectedSize === 'M' ? 'selected' : ''}`}>
              <input type="radio" name="size" checked={selectedSize === 'M'} onChange={() => setSelectedSize('M')} />
              متوسط
              <span>14/20 سم</span>
            </label>
            <label className={`option-card ${selectedSize === 'L' ? 'selected' : ''}`}>
              <input type="radio" name="size" checked={selectedSize === 'L'} onChange={() => setSelectedSize('L')} />
              كبير
              <span>17/24 سم</span>
            </label>
          </div>
        </div>

        {/* Choix des couleurs */}
        <div className="form-group">
          <label>الْلَّوْنُ</label>
          <div className="colors-grid">
            
            <label className={`color-card ${selectedColor === 'أبيض' ? 'selected' : ''}`}>
              <input type="radio" name="color" checked={selectedColor === 'أبيض'} onChange={() => setSelectedColor('أبيض')} />
              <span className="color-dot" style={{ backgroundColor: '#ffffff' }}></span>
              أبيض
            </label>

            <label className={`color-card ${selectedColor === 'أصفر' ? 'selected' : ''}`}>
              <input type="radio" name="color" checked={selectedColor === 'أصفر'} onChange={() => setSelectedColor('أصفر')} />
              <span className="color-dot" style={{ backgroundColor: '#facc15' }}></span>
              أصفر
            </label>

            <label className={`color-card ${selectedColor === 'رمادي' ? 'selected' : ''}`}>
              <input type="radio" name="color" checked={selectedColor === 'رمادي'} onChange={() => setSelectedColor('رمادي')} />
              <span className="color-dot" style={{ backgroundColor: '#9ca3af' }}></span>
              رمادي
            </label>

            <label className={`color-card ${selectedColor === 'وردي' ? 'selected' : ''}`}>
              <input type="radio" name="color" checked={selectedColor === 'وردي'} onChange={() => setSelectedColor('وردي')} />
              <span className="color-dot" style={{ backgroundColor: '#f472b6' }}></span>
              وردي
            </label>

            <label className={`color-card ${selectedColor === 'أحمر' ? 'selected' : ''}`}>
              <input type="radio" name="color" checked={selectedColor === 'أحمر'} onChange={() => setSelectedColor('أحمر')} />
              <span className="color-dot" style={{ backgroundColor: '#ef4444' }}></span>
              أحمر
            </label>

          </div>
        </div>

        <h3 style={{ fontSize: '1.1rem', marginBottom: '15px', color: '#374151', borderTop: '1px solid #eee', paddingTop: '15px' }}>
          المعلومات الشخصية
        </h3>

        <div className="form-group">
          <label>الاسم الكامل</label>
          <input type="text" name="fullname" required placeholder="أدخل اسمك" value={formData.fullname} onChange={handleChange} className="text-input" />
        </div>

        <div className="form-group">
          <label>الهاتف</label>
          <input 
            type="tel" 
            name="phone" 
            required 
            maxLength="8" 
            placeholder="أدخل رقم هاتفك (8 أرقام)" 
            value={formData.phone} 
            onChange={handleChange} 
            className="text-input" 
          />
        </div>

        <div className="form-group">
          <label>الولاية</label>
          <input type="text" name="state" required placeholder="أدخل ولايتك" value={formData.state} onChange={handleChange} className="text-input" />
        </div>

        <div className="form-group">
          <label>العنوان</label>
          <input type="text" name="address" required placeholder="العنوان بالتفصيل" value={formData.address} onChange={handleChange} className="text-input" />
        </div>

        <div className="summary-box">
          <div className="summary-row">
            <span>المجموع الفرعي</span>
            <span>{product.price}.00 د.ت</span>
          </div>
          <div className="summary-row">
            <span>التوصيل</span>
            <span>{shippingFee}.00 د.ت</span>
          </div>
          <div className="summary-total">
            <span>المجموع</span>
            <span>{totalAmount}.00 د.ت</span>
          </div>
        </div>

      </form>

      <div className="fixed-bottom-bar">
        <button type="submit" form="order-form" className="buy-now-btn">
          اشتري الآن 🛍️
        </button>
      </div>

      <footer className="footer">
        <p>© 2026 أثر (Ather) - جميع الحقوق محفوظة</p>
      </footer>

    </div>
  );
}