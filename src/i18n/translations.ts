// src/i18n/translations.ts
// All user-facing text of the app, in French and Arabic.
//
// NOTE: Seed data (product names, descriptions, category names, variant
// options) is intentionally NOT included here — only the app's own UI text.
//
// The active language is held in LanguageContext. Components look up strings
// via the `t` helper, e.g. t("nav.home") or t("menu.items", { count: 3 }).

export type Language = "fr" | "ar";

// Nested translation dictionary. Each key maps to a French and an Arabic
// string. `{placeholder}` tokens are replaced at render time by `t`.
export const translations: Record<Language, Record<string, string>> = {
  fr: {
    // ── Bottom navigation ────────────────────────────────────────────────
    "nav.home": "Accueil",
    "nav.menu": "Menu",
    "nav.order": "Commande",
    "nav.login": "Connexion",

    // ── Hero carousel ────────────────────────────────────────────────────
    "hero.slide1.title": "Bonjour",
    "hero.slide1.subtitle": "Infusé frais chaque jour depuis 2024",
    "hero.slide2.title": "Artisanat",
    "hero.slide2.subtitle": "Précision dans chaque versement",
    "hero.slide3.title": "Source éthique",
    "hero.slide3.subtitle": "De la ferme à votre tasse",

    // ── Home / category list ─────────────────────────────────────────────
    "home.exploreMenu": "Explorer le menu",
    "category.items": "{count} articles",
    "category.view": "Voir",

    // ── Menu page ────────────────────────────────────────────────────────
    "menu.fullMenu": "Menu complet",
    "menu.items": "{count} articles",
    "menu.all": "Tout",
    "menu.goBack": "Retour",
    "menu.listView": "Vue liste",
    "menu.gridView": "Vue grille",

    // ── Product card ─────────────────────────────────────────────────────
    "product.inCart": "✓ Dans le panier",
    "product.addToOrder": "Ajouter {name} à la commande",

    // ── Product detail page ──────────────────────────────────────────────
    "detail.notFound": "Produit introuvable.",
    "detail.goBack": "Retour",
    "detail.goBackToMenu": "Retour au menu",
    "detail.inCart": "✓ Dans le panier",
    "detail.description": "Description",
    "detail.unitPrice": "Prix unitaire",
    "detail.addToOrder": "Ajouter à la commande · {price} TND",
    "detail.updateOrder": "Mettre à jour · {price} TND",
    "detail.added": "Ajouté ✓",
    "detail.decreaseQty": "Diminuer la quantité",
    "detail.increaseQty": "Augmenter la quantité",
    "detail.categoryEspresso": "☕ Espresso",
    "detail.categoryColdBrew": "🧊 Cold Brew",
    "detail.categoryTea": "🍵 Thé",

    // ── Multi-item modal ─────────────────────────────────────────────────
    "modal.addToCart": "Ajouter au panier",
    "modal.item": "Article {n}",
    "modal.selectVariants": "Sélectionnez les variantes",
    "modal.furtherDetails": "Plus de détails",
    "modal.show": "Afficher",
    "modal.hide": "Masquer",
    "modal.notePlaceholder":
      "Des demandes particulières ? ex. très chaud, moins de glace, sans mousse...",
    "modal.addItem": "+ Ajouter un article",
    "modal.items": "{count} article(s)",

    // ── Order (cart) page ────────────────────────────────────────────────
    "order.emptyTitle": "Votre commande est vide",
    "order.emptySubtitle": "Ajoutez du café pour commencer.",
    "order.browseMenu": "Parcourir le menu",
    "order.yourOrder": "Votre commande",
    "order.items": "{count} article(s)",
    "order.total": "Total",
    "order.confirmOrder": "Confirmer la commande",
    "order.goBackToMenu": "Retour au menu",
    "order.remove": "Retirer {name}",

    // ── Order confirmed page ─────────────────────────────────────────────
    "confirmed.title": "Commande confirmée !",
    "confirmed.subtitle": "Merci ! Votre café est en préparation. ☕",

    // ── Login page ───────────────────────────────────────────────────────
    "login.backToHome": "Retour à l'accueil",
    "login.welcomeBack": "Bon retour",
    "login.signInToAccount": "Connectez-vous à votre compte",
    "login.usernameOrEmail": "Nom d'utilisateur ou e-mail",
    "login.usernamePlaceholder": "Entrez votre nom d'utilisateur ou e-mail",
    "login.password": "Mot de passe",
    "login.passwordPlaceholder": "Entrez votre mot de passe",
    "login.usernameRequired": "Le nom d'utilisateur est requis",
    "login.invalidEmail": "Veuillez saisir un e-mail valide",
    "login.passwordRequired": "Le mot de passe est requis",
    "login.passwordTooShort":
      "Le mot de passe doit contenir au moins 6 caractères",
    "login.loginSuccess": "Connexion réussie ! Redirection...",
    "login.signingIn": "Connexion en cours...",
    "login.signIn": "Se connecter",

    // ── Notifications page ──────────────────────────────────────────────
    "notifications.title": "Notifications",
    "notifications.empty": "Aucune notification",
    "notifications.emptySubtitle": "Vous serez informé ici de l'état de vos commandes.",
    "notifications.goBack": "Retour",
    "notifications.orderStatus": "État de la commande",
    "notifications.orderPlaced": "Commande passée",
    "notifications.orderPlacedBody": "Votre commande a bien été reçue et est en cours de préparation.",
    "notifications.orderPreparing": "En préparation",
    "notifications.orderPreparingBody": "Votre café est en train d'être préparé avec soin.",
    "notifications.orderReady": "Prête",
    "notifications.orderReadyBody": "Votre commande est prête à être récupérée !",
    "notifications.orderDelivered": "Livrée",
    "notifications.orderDeliveredBody": "Votre commande a été livrée. Bonne dégustation !",
    "notifications.justNow": "À l'instant",
    "notifications.minutesAgo": "Il y a {n} min",
    "notifications.hoursAgo": "Il y a {n} h",

    // ── Admin ────────────────────────────────────────────────────────────
    "admin.title": "Administration",
    "admin.tables": "Tables",
    "admin.tableNumber": "Table {n}",
    "admin.tableCapacity": "{n} places",
    "admin.addTable": "Ajouter une table",
    "admin.tableAvailable": "Disponible",
    "admin.tableNumberLabel": "Table number",
    "admin.tableNumberPlaceholder": "e.g. 6",
    "admin.tableNumberInvalid": "Enter a valid table number",
    "admin.tableCapacityLabel": "Number of places",
    "admin.tableCapacityPlaceholder": "e.g. 4",
    "admin.tableCapacityInvalid": "Enter a valid number of places",
    "admin.tableImageLabel": "Table image",
    "admin.tableImagePlaceholder": "Choose an image",
    "admin.tableImagePreview": "Table image preview",
    "admin.categories": "Catégories",
    "admin.products": "Produits",
    "admin.orders": "Commandes",
    "admin.signOut": "Se déconnecter",
    "admin.placeholder": "Section en cours de construction",
  },

  ar: {
    // ── Bottom navigation ────────────────────────────────────────────────
    "nav.home": "الرئيسية",
    "nav.menu": "القائمة",
    "nav.order": "الطلب",
    "nav.login": "تسجيل الدخول",

    // ── Hero carousel ────────────────────────────────────────────────────
    "hero.slide1.title": "صباح الخير",
    "hero.slide1.subtitle": "يُحضّر طازجًا يوميًا منذ 2024",
    "hero.slide2.title": "حِرفة حرفية",
    "hero.slide2.subtitle": "دقة في كل كوب",
    "hero.slide3.title": "مصادر أخلاقية",
    "hero.slide3.subtitle": "من المزرعة إلى كوبك",

    // ── Home / category list ─────────────────────────────────────────────
    "home.exploreMenu": "استكشف القائمة",
    "category.items": "{count} عناصر",
    "category.view": "عرض",

    // ── Menu page ────────────────────────────────────────────────────────
    "menu.fullMenu": "القائمة الكاملة",
    "menu.items": "{count} عناصر",
    "menu.all": "الكل",
    "menu.goBack": "رجوع",
    "menu.listView": "عرض القائمة",
    "menu.gridView": "عرض الشبكة",

    // ── Product card ─────────────────────────────────────────────────────
    "product.inCart": "✓ في السلة",
    "product.addToOrder": "أضف {name} إلى الطلب",

    // ── Product detail page ──────────────────────────────────────────────
    "detail.notFound": "المنتج غير موجود",
    "detail.goBack": "رجوع",
    "detail.goBackToMenu": "العودة إلى القائمة",
    "detail.inCart": "✓ في السلة",
    "detail.description": "الوصف",
    "detail.unitPrice": "سعر الوحدة",
    "detail.addToOrder": "أضف إلى الطلب · {price} د.ت",
    "detail.updateOrder": "تحديث الطلب · {price} د.ت",
    "detail.added": "تمت الإضافة ✓",
    "detail.decreaseQty": "تقليل الكمية",
    "detail.increaseQty": "زيادة الكمية",
    "detail.categoryEspresso": "☕ إسبريسو",
    "detail.categoryColdBrew": "🧊 كولد برو",
    "detail.categoryTea": "🍵 شاي",

    // ── Multi-item modal ─────────────────────────────────────────────────
    "modal.addToCart": "أضف إلى السلة",
    "modal.item": "العنصر {n}",
    "modal.selectVariants": "اختر الخيارات",
    "modal.furtherDetails": "تفاصيل إضافية",
    "modal.show": "إظهار",
    "modal.hide": "إخفاء",
    "modal.notePlaceholder":
      "أي طلبات خاصة؟ مثل: ساخن جدًا، ثلج أقل، بدون رغوة...",
    "modal.addItem": "+ إضافة عنصر",
    "modal.items": "{count} عنصر",

    // ── Order (cart) page ────────────────────────────────────────────────
    "order.emptyTitle": "طلبك فارغ",
    "order.emptySubtitle": "أضف بعض القهوة للبدء",
    "order.browseMenu": "تصفح القائمة",
    "order.yourOrder": "طلبك",
    "order.items": "{count} عنصر",
    "order.total": "المجموع",
    "order.confirmOrder": "تأكيد الطلب",
    "order.goBackToMenu": "العودة إلى القائمة",
    "order.remove": "إزالة {name}",

    // ── Order confirmed page ─────────────────────────────────────────────
    "confirmed.title": "تم تأكيد الطلب!",
    "confirmed.subtitle": "شكرًا! قهوتك قيد التحضير. ☕",

    // ── Login page ───────────────────────────────────────────────────────
    "login.backToHome": "العودة إلى الرئيسية",
    "login.welcomeBack": "مرحبًا بعودتك",
    "login.signInToAccount": "سجّل الدخول إلى حسابك",
    "login.usernameOrEmail": "اسم المستخدم أو البريد الإلكتروني",
    "login.usernamePlaceholder": "أدخل اسم المستخدم أو البريد الإلكتروني",
    "login.password": "كلمة المرور",
    "login.passwordPlaceholder": "أدخل كلمة المرور",
    "login.usernameRequired": "اسم المستخدم مطلوب",
    "login.invalidEmail": "يرجى إدخال بريد إلكتروني صالح",
    "login.passwordRequired": "كلمة المرور مطلوبة",
    "login.passwordTooShort": "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل",
    "login.loginSuccess": "تم تسجيل الدخول بنجاح! جارٍ إعادة التوجيه...",
    "login.signingIn": "جارٍ تسجيل الدخول...",
    "login.signIn": "تسجيل الدخول",

    // ── Notifications page ──────────────────────────────────────────────
    "notifications.title": "الإشعارات",
    "notifications.empty": "لا توجد إشعارات",
    "notifications.emptySubtitle": "سيتم إعلامك هنا بحالة طلباتك.",
    "notifications.goBack": "رجوع",
    "notifications.orderStatus": "حالة الطلب",
    "notifications.orderPlaced": "تم تقديم الطلب",
    "notifications.orderPlacedBody": "تم استلام طلبك وهو قيد التحضير.",
    "notifications.orderPreparing": "قيد التحضير",
    "notifications.orderPreparingBody": "قهوتك تُحضّر بعناية.",
    "notifications.orderReady": "جاهز",
    "notifications.orderReadyBody": "طلبك جاهز للاستلام!",
    "notifications.orderDelivered": "تم التوصيل",
    "notifications.orderDeliveredBody": "تم توصيل طلبك. بالهناء والشفاء!",
    "notifications.justNow": "الآن",
    "notifications.minutesAgo": "منذ {n} دقيقة",
    "notifications.hoursAgo": "منذ {n} ساعة",

    // ── Admin ────────────────────────────────────────────────────────────
    "admin.title": "الإدارة",
    "admin.tables": "الطاولات",
    "admin.tableNumber": "طاولة {n}",
    "admin.tableImageAlt": "صورة الطاولة {n}",
    "admin.tableCapacity": "{n} مقاعد",
    "admin.addTable": "إضافة طاولة",
    "admin.tableAvailable": "متاحة",
    "admin.tableNumberLabel": "رقم الطاولة",
    "admin.tableNumberPlaceholder": "مثال: 6",
    "admin.tableNumberInvalid": "أدخل رقم طاولة صحيح",
    "admin.tableCapacityLabel": "عدد المقاعد",
    "admin.tableCapacityPlaceholder": "مثال: 4",
    "admin.tableCapacityInvalid": "أدخل عدد مقاعد صحيح",
    "admin.tableImageLabel": "صورة الطاولة",
    "admin.tableImagePlaceholder": "اختر صورة",
    "admin.tableImagePreview": "معاينة صورة الطاولة",
    "admin.categories": "الفئات",
    "admin.products": "المنتجات",
    "admin.orders": "الطلبات",
    "admin.signOut": "تسجيل الخروج",
    "admin.placeholder": "القسم قيد الإنشاء",
  },
};
