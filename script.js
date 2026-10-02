/* ==========================================================================
   YUCCA PACKAGING - JAVASCRIPT
   Interactive B2B Catalog, Live Search, Quote Calculator & Basket System
   ========================================================================== */

// --- PRODUCT CATALOG DATA ---
const productsData = [
    {
        id: 'agri-1',
        title: '500g Ventilated Blueberry Punnet',
        category: 'agri',
        categoryLabel: 'Agriculture',
        badge: 'Export Standard',
        material: '80%+ rPET (Recyclable)',
        specs: '190 x 115 x 65 mm | 500g Capacity | Automated Top-Seal compatible',
        image: 'https://images.unsplash.com/photo-1595231776515-ddffb1f4273d?auto=format&fit=crop&w=600&q=80',
        description: 'Engineered specifically for blueberry and cherry exporters. Designed with micro-ventilation ports for optimal airflow during cold-chain shipping.',
        basePrice: 1.25
    },
    {
        id: 'agri-2',
        title: '250g Hinged Clamshell Punnet',
        category: 'agri',
        categoryLabel: 'Agriculture',
        badge: 'Best Seller',
        material: '100% Recyclable rPET',
        specs: '140 x 120 x 45 mm | Secure Snap-Lock Closure',
        image: 'https://images.unsplash.com/photo-1543528176-61b239494e97?auto=format&fit=crop&w=600&q=80',
        description: 'Ideal for soft fruit, raspberries, and specialty tomatoes. Snap-lock button ensures zero accidental pop-opens during shelf display.',
        basePrice: 1.10
    },
    {
        id: 'foodservice-1',
        title: 'Eco Kraft Salad Bowl (750ml)',
        category: 'foodservice',
        categoryLabel: 'Food Service',
        badge: 'FSC® Certified',
        material: 'Unbleached Kraft Board + Water Coating',
        specs: '150mm Diameter x 60mm Height | Leak-Proof PE/PLA Lining',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
        description: 'Premium takeaway bowl for salads, poké bowls, and warm meals. Grease-resistant with clear lid options available in PET or PLA.',
        basePrice: 2.10
    },
    {
        id: 'foodservice-2',
        title: 'Compostable Clear PLA Bio-Cup (350ml)',
        category: 'foodservice',
        categoryLabel: 'Food Service',
        badge: '100% Compostable',
        material: 'Plant-Based PLA Resin',
        specs: '95mm Rim Diameter | Cold Drinks & Smoothies',
        image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80',
        description: 'Crystal-clear beverage cup crafted from renewable cornstarch resin. Fully commercially compostable under DIN EN 13432 codes.',
        basePrice: 1.45
    },
    {
        id: 'processing-1',
        title: 'MAP High-Barrier Meat Tray (Deep)',
        category: 'processing',
        categoryLabel: 'Food Processing',
        badge: 'Shelf-Life Extended',
        material: 'PP / EVOH High Barrier',
        specs: '225 x 175 x 50 mm | Gas Flush Compatible',
        image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=600&q=80',
        description: 'Modified Atmosphere Packaging tray for fresh poultry, red meat, and ready-meals. Retains freshness and prevents oxygen ingress.',
        basePrice: 3.20
    },
    {
        id: 'custom-1',
        title: 'Bespoke Thermoformed Fruit Tray',
        category: 'custom',
        categoryLabel: 'Custom Moulds',
        badge: 'Custom Engineering',
        material: 'rPET / PP Custom Form',
        specs: 'Tailor-made to client specifications & automated de-nesters',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        description: 'Custom 3D CAD engineered packaging created by Yucca packaging design engineers in Paarl. Includes custom logo embossing.',
        basePrice: 4.50
    },
    {
        id: 'foodservice-3',
        title: 'Hinged Sugarcane Bagasse Container',
        category: 'foodservice',
        categoryLabel: 'Food Service',
        badge: 'Zero Plastic',
        material: '100% Sugarcane Bagasse Pulp',
        specs: '230 x 150 x 80 mm | 3-Compartment Takeaway',
        image: 'https://images.unsplash.com/photo-1530554764233-e79e16c91d08?auto=format&fit=crop&w=600&q=80',
        description: 'Microwavable and oil-resistant food container made from upcycled agricultural sugarcane waste. 100% biodegradable.',
        basePrice: 2.75
    },
    {
        id: 'agri-3',
        title: 'Table Grape Ventilated Export Clamshell',
        category: 'agri',
        categoryLabel: 'Agriculture',
        badge: 'Export Standard',
        material: 'High-Impact rPET',
        specs: '500g Capacity | Multi-slit airflow ventilation',
        image: 'https://images.unsplash.com/photo-1596368708356-6e1e1025ee73?auto=format&fit=crop&w=600&q=80',
        description: 'Designed in collaboration with South African table grape exporters. Fits standardized 600x400 export master cartons.',
        basePrice: 1.85
    }
];

// State
let basketState = [];
let activeCategoryFilter = 'all';

// --- DOM INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(productsData);
    setupEventListeners();
    updateCalcEstimate();
});

// --- RENDER PRODUCTS GRID ---
function renderProducts(products) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    if (products.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-secondary);">
            <p>No packaging items match your current filter.</p>
        </div>`;
        return;
    }

    grid.innerHTML = products.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="card-img-wrapper">
                <span class="card-tag">${product.badge}</span>
                <img src="${product.image}" alt="${product.title}" class="card-img" loading="lazy">
            </div>
            <div class="card-body">
                <span class="card-category">${product.categoryLabel} • ${product.material}</span>
                <h3 class="card-title">${product.title}</h3>
                <p class="card-specs">${product.specs}</p>
                <div class="card-actions">
                    <button class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.85rem;" onclick="openQuickView('${product.id}')">Quick View</button>
                    <button class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.85rem;" onclick="addToBasket('${product.id}')">+ Add to Quote</button>
                </div>
            </div>
        </div>
    `).join('');
}

// --- CATEGORY FILTERING ---
function filterCategory(category) {
    activeCategoryFilter = category;
    
    // Update Tab Buttons UI
    document.querySelectorAll('.tab-btn').forEach(btn => {
        if (btn.getAttribute('data-filter') === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    if (category === 'all') {
        renderProducts(productsData);
    } else {
        const filtered = productsData.filter(p => p.category === category);
        renderProducts(filtered);
    }
}

// --- EVENT LISTENERS SETUP ---
function setupEventListeners() {
    // Filter Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            filterCategory(filter);
        });
    });

    // Search Toggle
    const searchBtn = document.getElementById('searchToggleBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const closeSearchBtn = document.getElementById('closeSearchBtn');
    const searchInput = document.getElementById('searchInput');

    if (searchBtn && searchOverlay) {
        searchBtn.addEventListener('click', () => {
            searchOverlay.classList.add('active');
            searchInput.focus();
        });

        closeSearchBtn.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
        });

        searchInput.addEventListener('input', (e) => {
            handleLiveSearch(e.target.value);
        });
    }

    // Modal Close
    const closeModalBtn = document.getElementById('closeModalBtn');
    const productModal = document.getElementById('productModal');
    if (closeModalBtn && productModal) {
        closeModalBtn.addEventListener('click', () => {
            productModal.classList.remove('active');
        });
    }

    // Basket Drawer Toggle
    const basketBtn = document.getElementById('quoteBasketBtn');
    const basketDrawer = document.getElementById('basketDrawer');
    const closeDrawerBtn = document.getElementById('closeDrawerBtn');

    if (basketBtn && basketDrawer) {
        basketBtn.addEventListener('click', () => {
            basketDrawer.classList.add('active');
        });

        closeDrawerBtn.addEventListener('click', () => {
            basketDrawer.classList.remove('active');
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('mobile-open');
        });
    }
}

// --- LIVE SEARCH LOGIC ---
function handleLiveSearch(query) {
    const resultsContainer = document.getElementById('searchResults');
    const q = query.toLowerCase().trim();

    if (!q) {
        resultsContainer.innerHTML = '<p class="search-hint">Type above to search Yucca\'s catalog of 150+ packaging solutions.</p>';
        return;
    }

    const matches = productsData.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.specs.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
        resultsContainer.innerHTML = `<p class="search-hint">No results found for "${query}".</p>`;
        return;
    }

    resultsContainer.innerHTML = matches.map(p => `
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem; border-bottom: 1px solid var(--border-light); cursor: pointer;" onclick="selectSearchResult('${p.id}')">
            <div>
                <strong style="color: var(--bg-forest); font-size: 0.95rem;">${p.title}</strong>
                <div style="font-size: 0.8rem; color: var(--text-secondary);">${p.categoryLabel} • ${p.material}</div>
            </div>
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--bg-forest);">View Spec →</span>
        </div>
    `).join('');
}

function selectSearchResult(id) {
    document.getElementById('searchOverlay').classList.remove('active');
    openQuickView(id);
}

// --- PRODUCT QUICK VIEW MODAL ---
function openQuickView(id) {
    const product = productsData.find(p => p.id === id);
    if (!product) return;

    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; padding: 2rem;">
            <div style="border-radius: var(--radius-md); overflow: hidden; background: var(--bg-cream);">
                <img src="${product.image}" alt="${product.title}" style="width: 100%; height: 320px; object-fit: cover;">
            </div>
            <div style="display: flex; flex-direction: column; justify-content: center;">
                <span class="card-tag" style="position: static; display: inline-block; width: max-content; margin-bottom: 0.75rem;">${product.badge}</span>
                <h2 style="font-family: var(--font-body); font-size: 1.5rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">${product.title}</h2>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem;"><strong>Material:</strong> ${product.material}</p>
                <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1.5rem; line-height: 1.6;">${product.description}</p>
                <div style="background: var(--bg-cream); padding: 1rem; border-radius: var(--radius-sm); font-size: 0.85rem; margin-bottom: 1.5rem;">
                    <strong>Technical Specs:</strong> ${product.specs}
                </div>
                <div style="display: flex; gap: 1rem;">
                    <button class="btn btn-primary full-width" onclick="addToBasket('${product.id}'); document.getElementById('productModal').classList.remove('active');">+ Add to Quote Basket</button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('productModal').classList.add('active');
}

// --- B2B QUOTE CALCULATOR ENGINE ---
function updateCalcEstimate() {
    const qtyInput = document.getElementById('calcQuantity');
    const qtyDisplay = document.getElementById('quantityDisplay');
    const productSelect = document.getElementById('calcProduct');
    const unitPriceEl = document.getElementById('estUnitPrice');
    const discountEl = document.getElementById('estDiscount');
    const co2El = document.getElementById('estCo2');
    const totalPriceEl = document.getElementById('estTotalPrice');

    if (!qtyInput) return;

    const qty = parseInt(qtyInput.value, 10);
    qtyDisplay.innerText = `${qty.toLocaleString()} Units`;

    // Base unit price logic
    let basePrice = 1.65;
    const format = productSelect ? productSelect.value : 'punnet';
    if (format === 'clamshell') basePrice = 1.45;
    if (format === 'kraft') basePrice = 2.30;
    if (format === 'biocup') basePrice = 1.55;
    if (format === 'map') basePrice = 3.40;

    // Material multiplier
    const selectedMaterial = document.querySelector('input[name="material"]:checked')?.value || 'rpet';
    let materialMult = 1.0;
    if (selectedMaterial === 'pla') materialMult = 1.15;
    if (selectedMaterial === 'bagasse') materialMult = 1.22;

    // Tier Discount
    let discount = 0.10;
    if (qty >= 25000) discount = 0.18;
    if (qty >= 100000) discount = 0.25;

    const finalUnitPrice = (basePrice * materialMult * (1 - discount)).toFixed(2);
    const totalPrice = Math.round(qty * finalUnitPrice);
    const co2Saved = Math.round(qty * 0.0128); // kg offset estimate

    if (unitPriceEl) unitPriceEl.innerText = `R ${finalUnitPrice} / unit`;
    if (discountEl) discountEl.innerText = `${Math.round(discount * 100)}% OFF`;
    if (co2El) co2El.innerText = `${co2Saved.toLocaleString()} kg saved`;
    if (totalPriceEl) totalPriceEl.innerText = `R ${totalPrice.toLocaleString()}`;
}

function handleQuoteSubmit(e) {
    e.preventDefault();
    const qty = document.getElementById('calcQuantity').value;
    showToast(`Quote enquiry submitted for ${parseInt(qty).toLocaleString()} units! Our Paarl sales team will contact you within 2 hours.`);
}

// --- QUOTE BASKET MANAGEMENT ---
function addToBasket(id) {
    const product = productsData.find(p => p.id === id);
    if (!product) return;

    const existing = basketState.find(item => item.id === id);
    if (existing) {
        existing.qty += 1000;
    } else {
        basketState.push({ ...product, qty: 5000 });
    }

    updateBasketUI();
    showToast(`Added ${product.title} to your B2B Quote Basket`);
}

function removeFromBasket(id) {
    basketState = basketState.filter(item => item.id !== id);
    updateBasketUI();
}

function updateBasketUI() {
    const countEl = document.getElementById('basketCount');
    const drawerItems = document.getElementById('basketItems');

    if (countEl) countEl.innerText = basketState.length;

    if (!drawerItems) return;

    if (basketState.length === 0) {
        drawerItems.innerHTML = '<p class="empty-basket">Your quote basket is empty. Browse products and click "+ Add to Quote".</p>';
        return;
    }

    drawerItems.innerHTML = basketState.map(item => `
        <div style="display: flex; gap: 1rem; align-items: center; padding: 1rem 0; border-bottom: 1px solid var(--border-light);">
            <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px; object-fit: cover; border-radius: var(--radius-sm);">
            <div style="flex-grow: 1;">
                <h4 style="font-family: var(--font-body); font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.2rem;">${item.title}</h4>
                <small style="color: var(--text-secondary); display: block;">Base Qty: ${item.qty.toLocaleString()} units</small>
            </div>
            <button onclick="removeFromBasket('${item.id}')" style="background: none; border: none; color: red; font-size: 1.2rem; cursor: pointer;">&times;</button>
        </div>
    `).join('');
}

function submitBasketQuote() {
    if (basketState.length === 0) {
        showToast('Your quote basket is empty.');
        return;
    }
    basketState = [];
    updateBasketUI();
    document.getElementById('basketDrawer').classList.remove('active');
    showToast('Bulk RFQ submitted successfully! A Yucca packaging specialist has received your list.');
}

// --- NEWSLETTER HANDLER ---
function handleNewsletter(e) {
    e.preventDefault();
    showToast('Thank you for subscribing to Yucca Packaging updates!');
    e.target.reset();
}

// --- TOAST NOTIFICATIONS ---
function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>🌱</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}
