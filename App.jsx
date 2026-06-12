const { useState, useEffect, useRef, useCallback } = React;

/* ─── COMPASS SVG ICON ─── */
const CompassIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="var(--gold)" stroke="var(--gold)"/>
  </svg>
);

/* ─── SECTION 1: NAVBAR ─── */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const links = [
    { label: 'Home', id: 'hero' },
    { label: 'Destinations', id: 'destinations' },
    { label: 'Packages', id: 'packages' },
    { label: 'Stays', id: 'stays' },
    { label: 'Food', id: 'culinary' },
    { label: 'Hidden Gems', id: 'hidden-gems' },
    { label: 'Contact', id: 'footer' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="navbar-inner">
          <a href="#" className="nav-logo" onClick={(e) => handleNavClick(e, 'hero')}>
            <CompassIcon /> Wanderlux
          </a>
          <ul className="nav-links">
            {links.map(l => (
              <li key={l.id}>
                <a href={`#${l.id}`} onClick={(e) => handleNavClick(e, l.id)}>{l.label}</a>
              </li>
            ))}
            <li>
              <button className="btn-book-now" onClick={(e) => handleNavClick(e, 'packages')}>Book Now</button>
            </li>
          </ul>
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>
      <div className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
        {links.map(l => (
          <a key={l.id} href={`#${l.id}`} onClick={(e) => handleNavClick(e, l.id)}>{l.label}</a>
        ))}
        <button className="btn-book-now" onClick={(e) => handleNavClick(e, 'packages')}>Book Now</button>
      </div>
    </>
  );
};

/* ─── SCROLL ANIMATION HOOK ─── */
const useScrollAnimation = () => {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    const current = ref.current;
    if (current) observer.observe(current);
    return () => { if (current) observer.unobserve(current); };
  }, []);
  return ref;
};

/* ─── SECTION 2: HERO ─── */
const Hero = () => {
  const ref = useScrollAnimation();
  return (
    <section className="hero" id="hero">
      <div className="hero-bg"></div>
      <div className="hero-particles">
        {[...Array(8)].map((_, i) => <div key={i} className="particle"></div>)}
      </div>
      <div className="hero-content" ref={ref}>
        <h1 className="hero-headline">
          The <span className="highlight">World</span> Is Waiting —<br/>Have You Packed?
        </h1>
        <p className="hero-subtitle">Curated journeys to 150+ destinations across 6 continents</p>
        <div className="hero-search">
          <input className="search-field" type="text" placeholder="🌍 Where to?" />
          <div className="search-divider"></div>
          <input className="search-field" type="text" placeholder="📅 Check-in" />
          <div className="search-divider"></div>
          <input className="search-field" type="text" placeholder="📅 Check-out" />
          <div className="search-divider"></div>
          <input className="search-field" type="text" placeholder="👥 Travelers" />
          <button className="btn-search">Search</button>
        </div>
        <div className="trust-badges">
          <div className="trust-badge"><span className="badge-icon">✦</span> 50,000+ Travelers</div>
          <div className="trust-badge"><span className="badge-icon">✦</span> 150+ Destinations</div>
          <div className="trust-badge"><span className="badge-icon">✦</span> 4.9★ Rating</div>
          <div className="trust-badge"><span className="badge-icon">✦</span> 500+ Hidden Gems</div>
        </div>
      </div>
    </section>
  );
};

/* ─── SECTION 3: MUST-VISIT DESTINATIONS ─── */
const destinationsData = [
  { name: 'Santorini', country: 'Greece', flag: '🇬🇷', desc: 'Caldera views, blue-domed churches, and legendary Oia sunsets', price: 'From $1,299', image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=600&h=800&fit=crop&q=80', guideUrl: 'https://www.tripadvisor.com/Search?q=Santorini+Vacation+Packages' },
  { name: 'Kyoto', country: 'Japan', flag: '🇯🇵', desc: 'Bamboo groves, geisha districts, and 1,600 ancient temples', price: 'From $1,499', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=800&fit=crop&q=80', guideUrl: 'https://www.tripadvisor.com/Search?q=Kyoto+Vacation+Packages' },
  { name: 'Bali', country: 'Indonesia', flag: '🇮🇩', desc: 'Emerald rice terraces, spiritual temples, and world-class surf', price: 'From $899', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=800&fit=crop&q=80', guideUrl: 'https://www.tripadvisor.com/Search?q=Bali+Vacation+Packages' },
  { name: 'Maldives', country: 'Maldives', flag: '🇲🇻', desc: 'Overwater bungalows and bioluminescent beaches', price: 'From $1,899', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&h=800&fit=crop&q=80', guideUrl: 'https://www.tripadvisor.com/Search?q=Maldives+Vacation+Packages' },
  { name: 'Machu Picchu', country: 'Peru', flag: '🇵🇪', desc: 'Incan citadel perched high in the Andes mountains', price: 'From $1,199', image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=600&h=800&fit=crop&q=80', guideUrl: 'https://www.tripadvisor.com/Search?q=Machu+Picchu+Vacation+Packages' },
  { name: 'Amalfi Coast', country: 'Italy', flag: '🇮🇹', desc: 'Cliffside villages, limoncello, and azure coastal drives', price: 'From $1,599', image: 'https://images.unsplash.com/photo-1534113414509-0eec2bfb493f?w=600&h=800&fit=crop&q=80', guideUrl: 'https://www.tripadvisor.com/Search?q=Amalfi+Coast+Vacation+Packages' },
  { name: 'Patagonia', country: 'Chile & Argentina', flag: '🇨🇱', desc: 'Torres del Paine, glaciers, and world-class trekking', price: 'From $2,199', image: 'https://images.unsplash.com/photo-1531761535209-180857e963b9?w=600&h=800&fit=crop&q=80', guideUrl: 'https://www.tripadvisor.com/Search?q=Patagonia+Vacation+Packages' },
  { name: 'Marrakech', country: 'Morocco', flag: '🇲🇦', desc: 'Vibrant souks, ornate riads, and Jemaa el-Fna square', price: 'From $799', image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=600&h=800&fit=crop&q=80', guideUrl: 'https://www.tripadvisor.com/Search?q=Marrakesh+Vacation+Packages' },
  { name: 'Queenstown', country: 'New Zealand', flag: '🇳🇿', desc: 'Adventure capital — fjords, bungee jumping, and alpine lakes', price: 'From $1,799', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop&q=80', guideUrl: 'https://www.tripadvisor.com/Search?q=Queenstown,+New+Zealand+Vacation+Packages' },
  { name: 'Rajasthan', country: 'India', flag: '🇮🇳', desc: 'Grand forts, opulent palaces, desert safaris, and vivid colors', price: 'From ₹35,000', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=800&fit=crop&q=80', guideUrl: 'https://www.tripadvisor.com/Search?q=Rajasthan+Vacation+Packages' },
];

const Destinations = () => {
  const ref = useScrollAnimation();
  return (
    <section className="destinations-section" id="destinations">
      <div className="container">
        <div className="section-header fade-in-section" ref={ref}>
          <span className="section-eyebrow">ICONIC DESTINATIONS</span>
          <h2 className="section-title">Places That Belong on Every Bucket List</h2>
        </div>
        <div className="destinations-scroll">
          {destinationsData.map((d, i) => (
            <DestinationCard key={i} data={d} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const DestinationCard = ({ data, index }) => {
  const ref = useScrollAnimation();
  return (
    <div className="destination-card fade-in-section" ref={ref} style={{ animationDelay: `${index * 0.08}s` }}>
      <img src={data.image} alt={`${data.name}, ${data.country}`} className="destination-card-img" loading="lazy" />
      <div className="destination-card-overlay"></div>
      <div className="destination-card-content">
        <h3><span className="dest-flag">{data.flag}</span> {data.name}</h3>
        <p>{data.desc}</p>
        <span className="destination-price">{data.price}</span>
      </div>
      <a href={data.guideUrl} target="_blank" rel="noopener noreferrer" className="destination-explore-btn">More →</a>
    </div>
  );
};

/* ─── SECTION 4: AFFORDABLE STAYS ─── */
const staysData = [
  { name: 'The Yard Hostel', city: 'Helsinki, Finland', price: 'From $12/night', desc: "Nordic's hippest social hostel with a craft beer garden", amenities: ['WiFi', 'Bar', 'Social Events', 'Lockers'], rating: 4.7, image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&h=400&fit=crop&q=80', guideUrl: 'https://theyard.fi/' },
  { name: 'Zostel Jaipur', city: 'Jaipur, India', price: 'From ₹499/night', desc: 'Rooftop views of Amber Fort and the Pink City skyline', amenities: ['WiFi', 'Breakfast', 'Rooftop', 'Lockers'], rating: 4.5, image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&h=400&fit=crop&q=80', guideUrl: 'https://www.zostel.com/zostel/jaipur/' },
  { name: 'Generator Hostel', city: 'Barcelona, Spain', price: 'From €18/night', desc: 'Stylish design hostel steps from the buzzing Las Ramblas strip', amenities: ['WiFi', 'Bar', 'Terrace', 'Café'], rating: 4.6, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop&q=80', guideUrl: 'https://staygenerator.com/hostels/barcelona' },
  { name: 'Socialtel Medellín', city: 'Medellín, Colombia', price: 'From $20/night', desc: 'Co-living meets travel in the City of Eternal Spring', amenities: ['WiFi', 'Co-work', 'Pool', 'Yoga'], rating: 4.8, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop&q=80', guideUrl: 'https://www.tripadvisor.com/Search?q=Socialtel+Medellin' },
  { name: 'Lub d Bangkok Silom', city: 'Bangkok, Thailand', price: 'From $15/night', desc: 'Capsule-style luxury in the vibrant heart of Bangkok', amenities: ['WiFi', 'Café', 'Lockers', 'Theater'], rating: 4.6, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop&q=80', guideUrl: 'https://www.tripadvisor.com/Search?q=Lub+d+Bangkok+Silom' },
  { name: 'Safestay Edinburgh', city: 'Edinburgh, Scotland', price: 'From £22/night', desc: 'Historic hostel inside a 16th-century Royal Mile townhouse', amenities: ['WiFi', 'Breakfast', 'Bar', 'Tours'], rating: 4.5, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop&q=80', guideUrl: 'https://www.tripadvisor.com/Search?q=Safestay+Edinburgh' },
];

const Stays = () => {
  const ref = useScrollAnimation();
  return (
    <section className="stays-section" id="stays">
      <div className="container">
        <div className="section-header fade-in-section" ref={ref}>
          <span className="section-eyebrow">BUDGET-FRIENDLY ACCOMMODATIONS</span>
          <h2 className="section-title">Sleep Well Without Breaking the Bank</h2>
          <p className="section-subtitle">From boutique hostels to charming guesthouses — comfort at every price point.</p>
        </div>
        <div className="stays-grid">
          {staysData.map((s, i) => <StayCard key={i} data={s} index={i} />)}
        </div>
        <div className="stays-cta">
          <button className="btn-explore-stays">Explore 500+ Affordable Stays Worldwide →</button>
        </div>
      </div>
    </section>
  );
};

const StayCard = ({ data, index }) => {
  const ref = useScrollAnimation();
  return (
    <div className="stay-card fade-in-section" ref={ref} style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="stay-card-banner">
        <img src={data.image} alt={data.name} className="stay-card-img" loading="lazy" />
      </div>
      <div className="stay-card-body">
        <h3>{data.name}</h3>
        <p className="stay-city">{data.city}</p>
        <span className="stay-price-badge">{data.price}</span>
        <p className="stay-desc">{data.desc}</p>
        <div className="stay-amenities">
          {data.amenities.map((a, i) => <span key={i} className="stay-amenity-tag">{a}</span>)}
        </div>
        <div className="stay-card-footer">
          <span className="stay-rating">{'★'.repeat(Math.floor(data.rating))} {data.rating}</span>
          <a href={data.guideUrl} target="_blank" rel="noopener noreferrer" className="btn-check-avail">More →</a>
        </div>
      </div>
    </div>
  );
};

/* ─── SECTION 5: BEST PACKAGES ─── */
const packagesData = [
  { name: 'Bali Bliss — 7 Days', category: 'Luxury', itinerary: 'Rice terrace trek → Ubud temples → Seminyak beach → Tanah Lot sunset', price: '$1,299', includes: ['✈ Flights', '🏨 5★ Resort', '🍽 All Meals', '🚌 Transfers'], badge: 'Most Popular', badgeClass: 'badge-popular', rating: 4.9, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=700&h=400&fit=crop&q=80', guideUrl: 'https://www.tripadvisor.com/Search?q=Bali+Vacation+Packages' },
  { name: 'Swiss Alps — 10 Days', category: 'Adventure', itinerary: 'Zurich → Interlaken → Jungfrau → Zermatt → Lake Geneva → Lucerne', price: '$3,499', includes: ['✈ Flights', '🏨 4★ Chalet', '🍽 Breakfast', '🚌 Rail Pass'], badge: 'Best Value', badgeClass: 'badge-value', rating: 4.8, image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=700&h=400&fit=crop&q=80', guideUrl: 'https://www.tripadvisor.com/Search?q=Swiss+Alps+Vacation+Packages' },
  { name: 'Golden Triangle India — 8 Days', category: 'Cultural', itinerary: 'Delhi → Agra (Taj Mahal) → Jaipur (Amber Fort) → Varanasi', price: '₹45,000', includes: ['🏨 Heritage Hotels', '🍽 All Meals', '🚌 AC Transport', '🎫 Guides'], badge: null, badgeClass: '', rating: 4.7, image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=700&h=400&fit=crop&q=80', guideUrl: 'https://www.tripadvisor.com/Search?q=Golden+Triangle+(India)+Vacation+Packages' },
  { name: 'Iceland Northern Lights — 6 Days', category: 'Adventure', itinerary: 'Reykjavik → Golden Circle → Blue Lagoon → Glacier Hike → Northern Lights hunt', price: '$2,899', includes: ['✈ Flights', '🏨 Boutique Hotel', '🍽 Breakfast', '🚌 4x4 Tours'], badge: null, badgeClass: '', rating: 4.9, image: 'https://images.unsplash.com/photo-1520769669658-f07657f5a307?w=700&h=400&fit=crop&q=80', guideUrl: 'https://www.tripadvisor.com/Search?q=Iceland+Vacation+Packages' },
  { name: 'Santorini & Mykonos — 8 Days', category: 'Honeymoon', itinerary: 'Athens → Santorini (Oia sunset) → Mykonos (beach clubs) → Delos ruins', price: '$2,599', includes: ['✈ Flights', '🏨 Cave Hotel', '🍽 Half Board', '🚌 Ferry'], badge: 'Honeymoon Pick', badgeClass: 'badge-honeymoon', rating: 4.8, image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=700&h=400&fit=crop&q=80', guideUrl: 'https://www.tripadvisor.com/Search?q=Cyclades+Vacation+Packages' },
  { name: 'Vietnam Explorer — 12 Days', category: 'Budget', itinerary: 'Hanoi → Ha Long Bay → Hue → Hoi An → Ho Chi Minh City → Mekong Delta', price: '$899', includes: ['🏨 Boutique Hotels', '🍽 Breakfast', '🚌 Internal Flights', '🎫 Guides'], badge: 'Best Value', badgeClass: 'badge-value', rating: 4.7, image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=700&h=400&fit=crop&q=80', guideUrl: 'https://www.tripadvisor.com/Search?q=Vietnam+Vacation+Packages' },
];

const Packages = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const ref = useScrollAnimation();
  const filters = ['All', 'Adventure', 'Luxury', 'Budget', 'Honeymoon', 'Cultural'];

  const filtered = activeFilter === 'All' ? packagesData : packagesData.filter(p => p.category === activeFilter);

  return (
    <section className="packages-section" id="packages">
      <div className="container">
        <div className="section-header fade-in-section" ref={ref}>
          <span className="section-eyebrow">CURATED EXPERIENCES</span>
          <h2 className="section-title">Handpicked Packages For Every Explorer</h2>
        </div>
        <div className="package-filters">
          {filters.map(f => (
            <button
              key={f}
              className={`filter-tab ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >{f}</button>
          ))}
        </div>
        <div className="packages-grid">
          {filtered.map((p, i) => <PackageCard key={p.name} data={p} index={i} />)}
        </div>
      </div>
    </section>
  );
};

const PackageCard = ({ data, index }) => {
  const ref = useScrollAnimation();
  return (
    <div className="package-card fade-in-section" ref={ref} style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="package-card-banner">
        <img src={data.image} alt={data.name} className="package-card-img" loading="lazy" />
        <div className="package-card-banner-overlay"></div>
        {data.badge && <span className={`package-badge ${data.badgeClass}`}>{data.badge}</span>}
        <h3>{data.name}</h3>
      </div>
      <div className="package-card-body">
        <p className="package-itinerary">{data.itinerary}</p>
        <div className="package-price">{data.price}<span style={{ fontSize: '0.9rem', fontWeight: 400, color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}> / person</span></div>
        <div className="package-includes">
          {data.includes.map((inc, i) => <span key={i} className="package-include-item">{inc}</span>)}
        </div>
        <div className="package-card-footer">
          <span className="package-rating">{'★'.repeat(Math.floor(data.rating))} {data.rating}</span>
          <a href={data.guideUrl} target="_blank" rel="noopener noreferrer" className="btn-view-package" style={{ textDecoration: 'none', textAlign: 'center' }}>More →</a>
        </div>
      </div>
    </div>
  );
};

/* ─── SECTION 6: CULINARY DELIGHTS ─── */
const culinaryData = [
  { dish: 'Street Pad Thai', city: 'Bangkok', country: 'Thailand', flag: '🇹🇭', desc: 'Wok-tossed rice noodles at Thip Samai, open since 1966 — a national treasure on a plate', category: 'Street Food', tagClass: 'tag-street-food', foodTour: true, image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600&h=500&fit=crop&q=80', guideUrl: 'https://guide.michelin.com/en/bangkok-region/bangkok/restaurant/thipsamai-maha-chai' },
  { dish: 'Neapolitan Pizza', city: 'Naples', country: 'Italy', flag: '🇮🇹', desc: 'Wood-fired Margherita at L\'Antica Pizzeria da Michele — the birthplace of pizza itself', category: 'Traditional', tagClass: 'tag-traditional', foodTour: true, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=500&fit=crop&q=80', guideUrl: 'https://www.damichele.net/' },
  { dish: 'Moroccan Tagine', city: 'Marrakech', country: 'Morocco', flag: '🇲🇦', desc: 'Slow-cooked lamb with preserved lemon and saffron in a hand-crafted clay pot', category: 'Traditional', tagClass: 'tag-traditional', foodTour: false, image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=600&h=500&fit=crop&q=80', guideUrl: 'https://www.lonelyplanet.com/morocco/marrakesh/in-location/eating/a/nar/2e50c4ce-a159-455a-bd50-48243162b467/355491' },
  { dish: 'Sushi Omakase', city: 'Tokyo', country: 'Japan', flag: '🇯🇵', desc: "Chef's seasonal selection at Tsukiji Outer Market — artistry at dawn", category: 'Fine Dining', tagClass: 'tag-fine-dining', foodTour: true, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&h=500&fit=crop&q=80', guideUrl: 'https://guide.michelin.com/en/tokyo-region/tokyo/restaurants/sushi' },
  { dish: 'Arancini & Cannoli', city: 'Palermo, Sicily', country: 'Italy', flag: '🇮🇹', desc: "Crispy risotto balls and cream-filled pastries at Ballarò market — street food perfection", category: 'Market', tagClass: 'tag-market', foodTour: true, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=500&fit=crop&q=80', guideUrl: 'https://www.lonelyplanet.com/articles/best-street-food-palermo' },
  { dish: 'Masala Dosa', city: 'Chennai', country: 'India', flag: '🇮🇳', desc: 'Crispy fermented crepe stuffed with spiced potato, served with sambar at Murugan Idli Shop', category: 'Street Food', tagClass: 'tag-street-food', foodTour: false, image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=600&h=500&fit=crop&q=80', guideUrl: 'https://muruganidlishop.com/' },
];

const Culinary = () => {
  const ref = useScrollAnimation();
  return (
    <section className="culinary-section" id="culinary">
      <div className="container">
        <div className="section-header fade-in-section" ref={ref}>
          <span className="section-eyebrow">EAT LIKE A LOCAL</span>
          <h2 className="section-title">A World of Flavors Awaits You</h2>
          <p className="section-subtitle">The best journeys are always seasoned with unforgettable food.</p>
        </div>
        <div className="culinary-grid">
          {culinaryData.map((c, i) => <CulinaryCard key={i} data={c} index={i} />)}
        </div>
        <p className="culinary-quote">"To travel is to eat — every dish tells the story of a place."</p>
      </div>
    </section>
  );
};

const CulinaryCard = ({ data, index }) => {
  const ref = useScrollAnimation();
  return (
    <div className="culinary-card fade-in-section" ref={ref} style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="culinary-card-visual">
        <img src={data.image} alt={data.dish} className="culinary-card-img" loading="lazy" />
      </div>
      <div className="culinary-card-body">
        <h3>{data.dish}</h3>
        <p className="culinary-location">{data.flag} {data.city}, {data.country}</p>
        <p className="culinary-desc">{data.desc}</p>
        <div className="culinary-tags">
          <span className={`culinary-tag ${data.tagClass}`}>{data.category}</span>
          {data.foodTour && <span className="tag-food-tour">🍴 Food Tour Available</span>}
        </div>
        <a href={data.guideUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: 'fit-content', marginLeft: 'auto', marginTop: '16px', color: 'var(--midnight)', fontWeight: 600, textDecoration: 'underline' }}>More →</a>
      </div>
    </div>
  );
};

/* ─── SECTION 7: HIDDEN GEMS ─── */
const gemsData = [
  { name: 'Kotor', country: 'Montenegro', continent: 'Europe', desc: 'A walled medieval city rising from Adriatic fjords, with Venetian palaces and cat-filled piazzas', bestTime: 'May – September', image: 'https://images.unsplash.com/photo-1555990793-da11153b2473?w=600&h=800&fit=crop&q=80', guideUrl: 'https://www.tripadvisor.com/Tourism-g295381-Kotor_Kotor_Municipality-Vacations.html' },
  { name: 'Luang Prabang', country: 'Laos', continent: 'Asia', desc: 'Buddhist monks in saffron robes, dawn alms-giving rituals, and golden Mekong sunsets', bestTime: 'November – March', image: 'https://images.unsplash.com/photo-1574227492706-f65b24c3688a?w=600&h=800&fit=crop&q=80', guideUrl: 'https://www.tripadvisor.com/Search?q=Luang+Prabang+Vacation+Packages' },
  { name: 'Matera', country: 'Italy', continent: 'Europe', desc: '2,000-year-old cave dwellings carved into the Basilicata hillside — a living fossil city', bestTime: 'April – October', image: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=600&h=800&fit=crop&q=80', guideUrl: 'https://www.tripadvisor.com/Search?q=Matera+Vacation+Packages' },
  { name: 'Chefchaouen', country: 'Morocco', continent: 'Africa', desc: 'The Blue City — every wall, staircase, and doorway painted in shades of cerulean and cobalt', bestTime: 'March – May', image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=600&h=800&fit=crop&q=80', guideUrl: 'https://www.tripadvisor.com/Search?q=Chefchaouen+Vacation+Packages' },
  { name: 'Faroe Islands', country: 'Denmark', continent: 'Europe', desc: 'Dramatic sea cliffs, puffin colonies, grass-roofed villages, and absolute solitude', bestTime: 'June – August', image: 'https://images.unsplash.com/photo-1531168556467-80aace0d0144?w=600&h=800&fit=crop&q=80', guideUrl: 'https://www.tripadvisor.com/Search?q=Faroe+Islands+Vacation+Packages' },
  { name: 'Hampi', country: 'India', continent: 'Asia', desc: 'Ruined Vijayanagara Empire temples scattered among surreal giant boulder landscapes', bestTime: 'October – February', image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=600&h=800&fit=crop&q=80', guideUrl: 'https://www.tripadvisor.com/Search?q=Hampi+Vacation+Packages' },
];

const HiddenGems = () => {
  const ref = useScrollAnimation();
  return (
    <section className="hidden-gems-section" id="hidden-gems">
      <div className="container">
        <div className="section-header fade-in-section" ref={ref}>
          <span className="section-eyebrow">OFF THE BEATEN PATH</span>
          <h2 className="section-title">Destinations the Guidebooks Haven't Found Yet</h2>
          <p className="section-subtitle">Skip the crowds. Discover the real world.</p>
        </div>
        <div className="gems-grid">
          {gemsData.map((g, i) => <GemCard key={i} data={g} index={i} />)}
        </div>
        <p className="gems-tagline">We find the places before everyone else does.</p>
      </div>
    </section>
  );
};

const GemCard = ({ data, index }) => {
  const ref = useScrollAnimation();
  return (
    <div className="gem-card fade-in-section" ref={ref} style={{ animationDelay: `${index * 0.1}s` }}>
      <img src={data.image} alt={`${data.name}, ${data.country}`} className="gem-card-img" loading="lazy" />
      <div className="gem-card-overlay"></div>
      <div className="gem-card-content">
        <span className="gem-badge">Hidden Gem 💎</span>
        <h3>{data.name}</h3>
        <p className="gem-location">{data.country} · {data.continent}</p>
        <p className="gem-timing">Best time: {data.bestTime}</p>
        <p>{data.desc}</p>
        <a href={data.guideUrl} target="_blank" rel="noopener noreferrer" className="gem-explore-btn">More →</a>
      </div>
    </div>
  );
};

/* ─── SECTION 9: HOW IT WORKS ─── */
const HowItWorks = () => {
  const ref = useScrollAnimation();
  return (
    <section className="how-section" id="how-it-works">
      <div className="container">
        <div className="section-header fade-in-section" ref={ref}>
          <span className="section-eyebrow">SIMPLE & SEAMLESS</span>
          <h2 className="section-title">How It Works</h2>
        </div>
        <div className="steps-timeline">
          <div className="step-item fade-in-section">
            <div className="step-circle"><span className="step-number">1</span></div>
            <h3>Choose Your Destination</h3>
            <p>Pick from 150+ curated destinations — or discover a hidden gem we've handpicked for you</p>
          </div>
          <div className="step-item fade-in-section">
            <div className="step-circle"><span className="step-number">2</span></div>
            <h3>Customize Everything</h3>
            <p>Stays, food tours, local guides, and budget — tailor every detail to your travel style</p>
          </div>
          <div className="step-item fade-in-section">
            <div className="step-circle"><span className="step-number">3</span></div>
            <h3>We Handle the Rest</h3>
            <p>From flights to farewell dinners — you just explore. We manage every detail behind the scenes</p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── SECTION 11: TRAVEL BLOG ─── */
const blogData = [
  { title: 'Hidden Gems of the Balkans: Why Kotor Should Be Your Next Stop', excerpt: 'Forget Dubrovnik\'s cruise ship crowds. Just across the border lies Kotor — a medieval walled city nestled between dramatic Adriatic fjords and ancient Venetian fortresses.', category: 'Hidden Gems', categoryColor: '#2D5A3D', author: 'Elena Vasquez', date: 'May 15, 2025', image: 'https://images.unsplash.com/photo-1555990793-da11153b2473?w=700&h=400&fit=crop&q=80', guideUrl: 'https://www.arzotravels.com/things-to-do-in-kotor/' },
  { title: 'Eating Your Way Through Bangkok: A Street Food Survival Guide', excerpt: 'From midnight Pad Thai at Thip Samai to Yaowarat Road\'s legendary crab omelets — here\'s how to navigate Bangkok\'s overwhelming (and delicious) street food maze.', category: 'Culinary', categoryColor: '#E8614A', author: 'Arun Patel', date: 'April 28, 2025', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&h=400&fit=crop&q=80', guideUrl: 'https://www.tripadvisor.com/Search?q=Bangkok+Street+Food+Guide' },
  { title: 'How to Sleep in Europe for Under $20 a Night', excerpt: 'Generator Barcelona, The Yard Prague, Safestay Edinburgh — our insider guide to Europe\'s best design hostels that cost less than a fancy dinner back home.', category: 'Affordable Stays', categoryColor: '#D4A853', author: 'Marco Bianchi', date: 'April 10, 2025', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=700&h=400&fit=crop&q=80', guideUrl: 'https://www.tripadvisor.com/Search?q=Best+Cheap+Hostels+In+Europe' },
];

const Blog = () => {
  const ref = useScrollAnimation();
  return (
    <section className="blog-section" id="blog">
      <div className="container">
        <div className="section-header fade-in-section" ref={ref}>
          <span className="section-eyebrow">FROM THE JOURNAL</span>
          <h2 className="section-title">Travel Stories & Guides</h2>
        </div>
        <div className="blog-grid">
          {blogData.map((b, i) => <BlogCard key={i} data={b} index={i} />)}
        </div>
      </div>
    </section>
  );
};

const BlogCard = ({ data, index }) => {
  const ref = useScrollAnimation();
  return (
    <div className="blog-card fade-in-section" ref={ref} style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="blog-card-banner">
        <img src={data.image} alt={data.title} className="blog-card-img" loading="lazy" />
        <span className="blog-category-tag" style={{ background: data.categoryColor }}>{data.category}</span>
      </div>
      <div className="blog-card-body">
        <h3>{data.title}</h3>
        <p>{data.excerpt}</p>
        <div className="blog-meta">
          <span>{data.author} · {data.date}</span>
          <a href={data.guideUrl} target="_blank" rel="noopener noreferrer" className="blog-read-more">Read More →</a>
        </div>
      </div>
    </div>
  );
};

/* ─── SECTION 12: NEWSLETTER ─── */
const Newsletter = () => {
  const ref = useScrollAnimation();
  return (
    <section className="newsletter-section" id="newsletter">
      <div className="container">
        <div className="newsletter-content fade-in-section" ref={ref}>
          <h2>Hidden Gems. Local Eats. Affordable Stays. All in Your Inbox.</h2>
          <p>Join 20,000+ travelers who explore smarter every week.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input className="newsletter-input" type="email" placeholder="Enter your email address" />
            <button className="btn-subscribe" type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  );
};

/* ─── SECTION 13: FOOTER ─── */
const Footer = () => (
  <footer className="footer" id="footer">
    <div className="footer-grid">
      <div className="footer-col">
        <div className="footer-logo">
          <CompassIcon /> Wanderlux
        </div>
        <p className="footer-tagline">Curated journeys to extraordinary places. Hidden gems, local eats, and affordable stays — we make every trip unforgettable.</p>
        <div className="footer-socials">
          <a className="footer-social-icon" href="#" aria-label="Instagram">
            <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a className="footer-social-icon" href="#" aria-label="Twitter">
            <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a className="footer-social-icon" href="#" aria-label="Facebook">
            <svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a className="footer-social-icon" href="#" aria-label="YouTube">
            <svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
        </div>
      </div>
      <div className="footer-col">
        <h4>Explore</h4>
        <ul className="footer-links">
          <li><a href="#hero">Home</a></li>
          <li><a href="#destinations">Destinations</a></li>
          <li><a href="#packages">Packages</a></li>
          <li><a href="#hidden-gems">Hidden Gems</a></li>
          <li><a href="#culinary">Culinary</a></li>
          <li><a href="#stays">Affordable Stays</a></li>
        </ul>
      </div>
      <div className="footer-col">
        <h4>Top Destinations</h4>
        <ul className="footer-links">
          <li><a href="#">Santorini, Greece</a></li>
          <li><a href="#">Kyoto, Japan</a></li>
          <li><a href="#">Kotor, Montenegro</a></li>
          <li><a href="#">Chefchaouen, Morocco</a></li>
          <li><a href="#">Matera, Italy</a></li>
          <li><a href="#">Luang Prabang, Laos</a></li>
        </ul>
      </div>
      <div className="footer-col">
        <h4>Contact</h4>
        <ul className="footer-links">
          <li><a href="mailto:hello@wanderlux.com">hello@wanderlux.com</a></li>
          <li><a href="tel:+14155550192">+1 (415) 555-0192</a></li>
          <li><a href="#">580 Market Street, Suite 400</a></li>
          <li><a href="#">San Francisco, CA 94104</a></li>
          <li><a href="#">Mon – Fri: 9am – 6pm PST</a></li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© 2025 Wanderlux Travel Co. · <a href="#">Privacy Policy</a> · <a href="#">Terms of Service</a></p>
    </div>
  </footer>
);

/* ─── GLOBAL SCROLL OBSERVER ─── */
const useGlobalScrollObserver = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll('.fade-in-section, .slide-in-left, .slide-in-right').forEach(el => {
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
};

/* ─── APP ─── */
const App = () => {
  useGlobalScrollObserver();
  return (
    <>
      <Navbar />
      <Hero />
      <Destinations />
      <Stays />
      <Packages />
      <Culinary />
      <HiddenGems />
      <HowItWorks />
      <Blog />
      <Newsletter />
      <Footer />
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
