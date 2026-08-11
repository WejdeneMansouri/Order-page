import React, { useState } from 'react';

export default function App() {
  const [selectedSize, setSelectedSize] = useState('medium'); // 'small', 'medium', 'large', 'complete'
  const [hasBox, setHasBox] = useState('with-box'); // 'with-box', 'without-box'
  const [formData, setFormData] = useState({
    fullname: '',
    phone: '',
    state: '',
    address: ''
  });

  // Gestion dynamique de l'image et des infos selon le choix
  const getProductInfo = () => {
    switch (selectedSize) {
      case 'small':
        return {
          image: '/11.jpeg',
          name: 'المصحف الشريف - الحجم الصغير',
          price: 70
        };
      case 'medium':
        return {
          image: '/12.jpeg',
          name: 'المصحف الشريف - الحجم المتوسط',
          price: 90
        };
      case 'large':
        return {
          image: '/13.jpeg',
          name: 'المصحف الشريف - الحجم الكبير',
          price: 110
        };
      case 'complete':
        return {
          image: '/10.jpeg',
          name: 'المجموعة الكاملة (3 أحجام + هدية)',
          price: 240
        };
      default:
        return {
          image: '/10.jpeg',
          name: 'صندوق خشبي فاخر + كتاب القرآن بالتفسير',
          price: 90
        };
    }
  };

  const product = getProductInfo();
  
  // Calcul du total (Frais de livraison fixe : 8 د.ت، أو مجاني إذا اختار المجموعة الكاملة)
  const shippingFee = selectedSize === 'complete' ? 0 : 8;
  const boxExtra = (hasBox === 'with-box' && selectedSize !== 'complete') ? 0 : 0;
  const subTotal = product.price + boxExtra;
  const totalAmount = subTotal + shippingFee;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const phoneNumber = "21628660398"; // Ton numéro WhatsApp
    
    const message = `🛍️ *طلب جديد من موقع أثر (Ather)*\n\n` +
                    `📦 *المنتج:* ${product.name}\n` +
                    `🪵 *الصندوق:* ${hasBox === 'with-box' ? 'مع الصندوق' : 'بدون الصندوق'}\n` +
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
      
      {/* 1. Bannière haut */}
      <div className="top-banner">
        ✨ توصيل سريع (24h/48h) و الدفع عند الاستلام 🇹🇳 ✨
      </div>

      {/* 2. Header */}
      <header className="header">
        <h1 className="logo">أثر</h1>
        <div className="header-icons">
          <button className="icon-btn">🔍</button>
          <button className="icon-btn">☰</button>
        </div>
      </header>

      {/* 3. Titre et Prix */}
      <div className="product-hero">
        <h2 className="product-title">صندوق خشبي فاخر + كتاب القرآن بالتفسير والتقسيم الموضوعي 🎁</h2>
        <div className="price-box">
          <span className="current-price">{product.price}.00 د.ت</span>
          <span className="old-price">130.00 د.ت</span>
          <span className="discount-badge">-31%</span>
        </div>
      </div>

      {/* 4. Image principale dynamique */}
      <div className="main-image-container">
        <img 
          src={product.image} 
          alt={product.name} 
          className="main-image" 
        />
      </div>

      {/* Miniatures cliquables */}
      <div className="thumbnails">
        <img src="/10.jpeg" alt="Ather 10" className={`thumb ${selectedSize === 'complete' ? 'active' : ''}`} onClick={() => setSelectedSize('complete')} />
        <img src="/11.jpeg" alt="Ather 11" className={`thumb ${selectedSize === 'small' ? 'active' : ''}`} onClick={() => setSelectedSize('small')} />
        <img src="/12.jpeg" alt="Ather 12" className={`thumb ${selectedSize === 'medium' ? 'active' : ''}`} onClick={() => setSelectedSize('medium')} />
        <img src="/13.jpeg" alt="Ather 13" className={`thumb ${selectedSize === 'large' ? 'active' : ''}`} onClick={() => setSelectedSize('large')} />
      </div>

      {/* 5. Section Avantages (style Na9sha) */}
      <div className="features-section">
        <h3>التقسيم الموضوعي</h3>
        <p>ألوان لكل موضوع: تميز بصري يسهل فهم الموضوعات ويقرب معنى الآيات.<br />تفسير مبسط: يساعد على فهم المعنى العام لكل آية بسهولة ووضوح.</p>
      </div>

      {/* Badges de confiance */}
      <div className="trust-badges">
        <div className="badge-item">
          <span>🇹🇳</span>
          صنع في تونس
        </div>
        <div className="badge-item">
          <span>🚚</span>
          توصيل سريع لباب دارك
        </div>
        <div className="badge-item">
          <span>💬</span>
          خدمة حرفاء متوفرة دائماً
        </div>
        <div className="badge-item">
          <span>🎁</span>
          هدية مع كل طلبية
        </div>
      </div>

      {/* 6. Formulaire de commande interactif */}
      <form onSubmit={handleSubmit} id="order-form" className="order-form">
        
        {/* Choix de la taille */}
        <div className="form-group">
          <label>الْحَجْمُ</label>
          <div className="options-grid">
            <label className={`option-card ${selectedSize === 'small' ? 'selected' : ''}`}>
              <input type="radio" name="size" checked={selectedSize === 'small'} onChange={() => setSelectedSize('small')} />
              صغير
            </label>
            <label className={`option-card ${selectedSize === 'medium' ? 'selected' : ''}`}>
              <input type="radio" name="size" checked={selectedSize === 'medium'} onChange={() => setSelectedSize('medium')} />
              متوسط
            </label>
            <label className={`option-card ${selectedSize === 'large' ? 'selected' : ''}`}>
              <input type="radio" name="size" checked={selectedSize === 'large'} onChange={() => setSelectedSize('large')} />
              كبير
            </label>
            <label className={`option-card ${selectedSize === 'complete' ? 'selected' : ''}`}>
              <input type="radio" name="size" checked={selectedSize === 'complete'} onChange={() => setSelectedSize('complete')} />
              المجموعة بأكملها (التوصيل مجاني ❤️)
            </label>
          </div>
        </div>

        {/* Choix avec ou sans coffre */}
        <div className="form-group">
          <label>اختر</label>
          <div className="options-grid">
            <label className={`option-card ${hasBox === 'with-box' ? 'selected' : ''}`}>
              <input type="radio" name="box" checked={hasBox === 'with-box'} onChange={() => setHasBox('with-box')} />
              صندوق مع المصحف
            </label>
            <label className={`option-card ${hasBox === 'without-box' ? 'selected' : ''}`}>
              <input type="radio" name="box" checked={hasBox === 'without-box'} onChange={() => setHasBox('without-box')} />
              صندوق بدون المصحف
            </label>
          </div>
        </div>

        <h3 style={{ fontSize: '1.1rem', marginBottom: '15px', color: '#374151', borderTop: '1px solid #eee', paddingTop: '15px' }}>
          المعلومات الشخصية
        </h3>

        {/* Champs client */}
        <div className="form-group">
          <label>الاسم الكامل</label>
          <input
            type="text"
            name="fullname"
            required
            placeholder="أدخل اسمك"
            value={formData.fullname}
            onChange={handleChange}
            className="text-input"
          />
        </div>

        <div className="form-group">
          <label>الهاتف</label>
          <input
            type="tel"
            name="phone"
            required
            placeholder="أدخل رقم هاتفك"
            value={formData.phone}
            onChange={handleChange}
            className="text-input"
          />
        </div>

        <div className="form-group">
          <label>الولاية</label>
          <input
            type="text"
            name="state"
            required
            placeholder="أدخل مدينتك / ولايتك"
            value={formData.state}
            onChange={handleChange}
            className="text-input"
          />
        </div>

        <div className="form-group">
          <label>العنوان</label>
          <input
            type="text"
            name="address"
            required
            placeholder="أدخل عنوانك بالتفصيل"
            value={formData.address}
            onChange={handleChange}
            className="text-input"
          />
        </div>

        {/* Récapitulatif dynamique */}
        <div className="summary-box">
          <div className="summary-row">
            <span>المجموع الفرعي</span>
            <span>{subTotal}.00 د.ت</span>
          </div>
          <div className="summary-row">
            <span>التوصيل</span>
            <span>{shippingFee === 0 ? 'مجاني 🎁' : `${shippingFee}.00 د.ت`}</span>
          </div>
          <div className="summary-total">
            <span>المجموع</span>
            <span>{totalAmount}.00 د.ت</span>
          </div>
        </div>

      </form>

      {/* Bouton fixe en bas "اشتري الآن" */}
      <div className="fixed-bottom-bar">
        <button 
          type="submit" 
          form="order-form" 
          className="buy-now-btn"
        >
          اشتري الآن 🛍️
        </button>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 أثر (Ather) - جميع الحقوق محفوظة</p>
      </footer>

    </div>
  );
}