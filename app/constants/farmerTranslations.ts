export type FarmerLang = "en" | "hi" | "ta" | "ml";

export interface FarmerT {
  // ── Common ──────────────────────────────────────────────────────────────
  loading: string;
  cancel: string;
  close: string;
  search: string;
  all: string;
  kg: string;
  perKg: string;
  total: string;
  noData: string;

  // ── Dashboard ────────────────────────────────────────────────────────────
  dash_moneyExpected: string;
  dash_marketMovement: string;
  dash_basedOnDuration: string;
  dash_activecrops: string;
  dash_fresh: string;
  dash_waiting: string;
  dash_stuck: string;
  dash_qualityMix: string;
  dash_netEarnings: string;
  dash_sales: string;
  dash_deductions: string;
  dash_netProfit: string;
  dash_govSchemes: string;

  // ── Sell Crops ───────────────────────────────────────────────────────────
  sell_title: string;
  sell_subtitle: string;
  sell_createBtn: string;
  sell_activeListings: string;
  sell_totalValue: string;
  sell_soldMonth: string;
  sell_yourListings: string;
  sell_noListings: string;
  sell_createFirst: string;
  sell_listedOn: string;
  sell_modalTitle: string;
  sell_modalSubtitle: string;
  sell_profileId: string;
  sell_fetchingProfile: string;
  sell_autoFilled: string;
  sell_cropName: string;
  sell_qualityGrade: string;
  sell_selectGrade: string;
  sell_gradePremium: string;
  sell_gradeStandard: string;
  sell_gradeEconomy: string;
  sell_quantity: string;
  sell_price: string;
  sell_aiSuggested: string;
  sell_tapToApply: string;
  sell_creating: string;
  sell_submit: string;
  sell_quantityLabel: string;
  sell_totalValueLabel: string;
  sell_qualityGradeLabel: string;
  sell_harvestDate: string;
  sell_priceLabel: string;

  // ── Offers ───────────────────────────────────────────────────────────────
  offers_title: string;
  offers_subtitle: string;
  offers_total: string;
  offers_awaiting: string;
  offers_accepted: string;
  offers_section: string;
  offers_loading: string;
  offers_empty: string;
  offers_negLog: string;
  offers_reject: string;
  offers_negotiate: string;
  offers_accept: string;
  offers_negHistory: string;
  offers_noNeg: string;
  offers_buyerOffer: string;
  offers_askingPrice: string;
  offers_modalTitle: string;
  offers_proposedPrice: string;
  offers_fetchingAi: string;
  offers_message: string;
  offers_messagePlaceholder: string;
  offers_ask: string;
  offers_sending: string;
  offers_sendCounter: string;

  // ── Market Prices ─────────────────────────────────────────────────────────
  market_title: string;
  market_subtitle: string;
  market_lastUpdated: string;
  market_searchPlaceholder: string;
  market_allStates: string;
  market_liveRates: string;
  market_loading: string;
  market_empty: string;
  market_recorded: string;
  market_added: string;

  // ── Schemes ───────────────────────────────────────────────────────────────
  schemes_title: string;
  schemes_subtitle: string;
  schemes_searchPlaceholder: string;
  schemes_allStates: string;
  schemes_available: string;
  schemes_statesCovered: string;
  schemes_endingSoon: string;
  schemes_eligible: string;
  schemes_applied: string;
  schemes_loading: string;
  schemes_empty: string;
  schemes_adjustFilters: string;
  schemes_deadline: string;
  schemes_benefit: string;
  schemes_learnMore: string;

  // ── Shipment Requests ─────────────────────────────────────────────────────
  ship_title: string;
  ship_subtitle: string;
  ship_ordersTab: string;
  ship_requestsTab: string;
  ship_searchOrders: string;
  ship_searchProviders: string;
  ship_noOrders: string;
  ship_noRequests: string;
  ship_arrangeLogistics: string;
  ship_counterOffer: string;
  ship_acceptTerms: string;
  ship_negLog: string;
  ship_chat: string;
  ship_loading: string;
  ship_proposedCost: string;
  ship_duration: string;
  ship_days: string;
  ship_message: string;
  ship_sendingCounter: string;
  ship_submitCounter: string;
  ship_selectProvider: string;
  ship_selectVehicle: string;
  ship_origin: string;
  ship_destination: string;
  ship_sendRequest: string;
  ship_notifications: string;

  // ── Support ───────────────────────────────────────────────────────────────
  support_title: string;
  support_faq: string;
  support_notifications: string;
  support_markAll: string;
  support_loading: string;
  support_empty: string;
  support_unreadOnly: string;
  support_allFilter: string;

  // ── Profile ───────────────────────────────────────────────────────────────
  profile_loading: string;
  profile_personal: string;
  profile_farm: string;
  profile_crops: string;
  profile_financial: string;
  profile_ratings: string;
  profile_documents: string;
  profile_settings: string;
  profile_personalInfo: string;
  profile_farmDetails: string;
  profile_phone: string;
  profile_email: string;
  profile_role: string;
  profile_joined: string;
  profile_verified: string;
  profile_walletBalance: string;
  profile_avgRating: string;
  profile_totalReviews: string;
  profile_landSize: string;
  profile_location: string;
  profile_noProfile: string;
  profile_yrs: string;
  profile_crops_label: string;
  profile_area: string;
  profile_rating: string;

  // ── AI Insights ───────────────────────────────────────────────────────────
  insights_title: string;
  insights_subtitle: string;
  insights_all: string;
  insights_weather: string;
  insights_market: string;
  insights_cropHealth: string;
  insights_optimization: string;
  insights_recommendations: string;
  insights_loading: string;
  insights_empty: string;
  insights_actionRequired: string;
  insights_confidence: string;
  insights_impact: string;
  insights_high: string;
  insights_medium: string;
  insights_low: string;

  // ── Guidance ──────────────────────────────────────────────────────────────
  guidance_title: string;
  guidance_subtitle: string;
  guidance_searchPlaceholder: string;
  guidance_loading: string;
  guidance_empty: string;
  guidance_bookmark: string;
  guidance_views: string;
  guidance_all: string;
  guidance_article: string;
  guidance_video: string;
  guidance_document: string;

  // ── Crop Listing (Browse) ─────────────────────────────────────────────────
  browse_title: string;
  browse_subtitle: string;
  browse_searchPlaceholder: string;
  browse_allGrades: string;
  browse_loading: string;
  browse_empty: string;
  browse_farmer: string;
  browse_qty: string;
  browse_price: string;
}

export const farmerTranslations: Record<FarmerLang, FarmerT> = {
  // ═══════════════════════════════════════════════════════════════════════════
  // ENGLISH
  // ═══════════════════════════════════════════════════════════════════════════
  en: {
    loading: "Loading...",
    cancel: "Cancel",
    close: "Close",
    search: "Search",
    all: "All",
    kg: "kg",
    perKg: "/kg",
    total: "Total:",
    noData: "No data found",

    dash_moneyExpected: "Money Expected From Crops on Sale",
    dash_marketMovement: "Market Movement",
    dash_basedOnDuration: "Based on listing duration",
    dash_activecrops: "active crops",
    dash_fresh: "Fresh",
    dash_waiting: "Waiting",
    dash_stuck: "Stuck",
    dash_qualityMix: "Crop Quality Mix",
    dash_netEarnings: "Net Earnings",
    dash_sales: "Sales",
    dash_deductions: "Deductions",
    dash_netProfit: "Net Profit",
    dash_govSchemes: "Government Schemes",

    sell_title: "Sell Your Crops",
    sell_subtitle: "Create listings and manage your crop sales",
    sell_createBtn: "Create Listing",
    sell_activeListings: "Active Listings",
    sell_totalValue: "Total Value",
    sell_soldMonth: "Sold This Month",
    sell_yourListings: "Your Crop Listings",
    sell_noListings: "No listings yet",
    sell_createFirst: "Create Your First Listing",
    sell_listedOn: "Listed on",
    sell_modalTitle: "New Crop Listing",
    sell_modalSubtitle: "Fill in the details to list your crop",
    sell_profileId: "Farmer Profile ID",
    sell_fetchingProfile: "Fetching profile...",
    sell_autoFilled: "Auto-filled",
    sell_cropName: "Crop Name",
    sell_qualityGrade: "Quality Grade",
    sell_selectGrade: "Select grade",
    sell_gradePremium: "Grade A — Premium",
    sell_gradeStandard: "Grade B — Standard",
    sell_gradeEconomy: "Grade C — Economy",
    sell_quantity: "Quantity (kg)",
    sell_price: "Expected Price (₹/kg)",
    sell_aiSuggested: "AI Suggested Price",
    sell_tapToApply: "— tap to apply",
    sell_creating: "Creating...",
    sell_submit: "Create Listing",
    sell_quantityLabel: "Quantity",
    sell_totalValueLabel: "Total Value",
    sell_qualityGradeLabel: "Quality Grade",
    sell_harvestDate: "Harvest Date",
    sell_priceLabel: "Price / kg",

    offers_title: "Incoming Offers",
    offers_subtitle: "Review buyer offers on your crop listings and negotiate",
    offers_total: "Total Offers",
    offers_awaiting: "Awaiting Review",
    offers_accepted: "Accepted",
    offers_section: "Offers on Your Listings",
    offers_loading: "Loading offers...",
    offers_empty: "No offers received yet",
    offers_negLog: "Negotiation Log",
    offers_reject: "Reject",
    offers_negotiate: "Negotiate",
    offers_accept: "Accept",
    offers_negHistory: "Negotiation History",
    offers_noNeg: "No negotiation activity yet.",
    offers_buyerOffer: "Buyer's Offer",
    offers_askingPrice: "Your Asking Price",
    offers_modalTitle: "Negotiate",
    offers_proposedPrice: "Proposed Price (₹/kg)",
    offers_fetchingAi: "Fetching AI price suggestion...",
    offers_message: "Message",
    offers_messagePlaceholder: "Explain your counter-offer...",
    offers_ask: "Ask:",
    offers_sending: "Sending...",
    offers_sendCounter: "Send Counter-Offer",

    market_title: "Market Prices",
    market_subtitle: "Real-time crop prices from markets across India",
    market_lastUpdated: "Last updated:",
    market_searchPlaceholder: "Search crops or markets...",
    market_allStates: "All States",
    market_liveRates: "Live Market Rates",
    market_loading: "Loading market prices...",
    market_empty: "No prices found",
    market_recorded: "Rec:",
    market_added: "Add:",

    schemes_title: "Government Schemes",
    schemes_subtitle: "Explore benefits and subsidies available to you",
    schemes_searchPlaceholder: "Search schemes by name or description...",
    schemes_allStates: "All States",
    schemes_available: "Available Schemes",
    schemes_statesCovered: "States Covered",
    schemes_endingSoon: "Ending Soon",
    schemes_eligible: "Eligible Schemes",
    schemes_applied: "Applied Schemes",
    schemes_loading: "Loading schemes...",
    schemes_empty: "No schemes found",
    schemes_adjustFilters: "Try adjusting your search or filters",
    schemes_deadline: "Deadline",
    schemes_benefit: "Benefit",
    schemes_learnMore: "Learn More",

    ship_title: "Shipment Requests",
    ship_subtitle: "Manage your orders and logistics",
    ship_ordersTab: "Accepted Orders",
    ship_requestsTab: "My Requests",
    ship_searchOrders: "Search crop name...",
    ship_searchProviders: "Search provider...",
    ship_noOrders: "No accepted orders awaiting logistics",
    ship_noRequests: "No shipment requests yet",
    ship_arrangeLogistics: "Arrange Logistics",
    ship_counterOffer: "Counter",
    ship_acceptTerms: "Accept Terms",
    ship_negLog: "Negotiation Log",
    ship_chat: "Chat",
    ship_loading: "Loading...",
    ship_proposedCost: "Proposed Cost (₹)",
    ship_duration: "Duration",
    ship_days: "days",
    ship_message: "Message",
    ship_sendingCounter: "Sending...",
    ship_submitCounter: "Send Counter",
    ship_selectProvider: "Select a logistics provider",
    ship_selectVehicle: "Select a vehicle",
    ship_origin: "Origin",
    ship_destination: "Destination",
    ship_sendRequest: "Send Shipment Request",
    ship_notifications: "Notifications",

    support_title: "Support & Help",
    support_faq: "Frequently Asked Questions",
    support_notifications: "Your Notifications",
    support_markAll: "Mark All Read",
    support_loading: "Loading notifications...",
    support_empty: "No notifications",
    support_unreadOnly: "Unread Only",
    support_allFilter: "All",

    profile_loading: "Loading profile data...",
    profile_personal: "Personal",
    profile_farm: "Farm",
    profile_crops: "Crops",
    profile_financial: "Financial",
    profile_ratings: "Ratings",
    profile_documents: "Documents",
    profile_settings: "Settings",
    profile_personalInfo: "Personal Info",
    profile_farmDetails: "Farm Details",
    profile_phone: "Phone",
    profile_email: "Email",
    profile_role: "Role",
    profile_joined: "Joined",
    profile_verified: "Verified",
    profile_walletBalance: "Wallet Balance",
    profile_avgRating: "Average Rating",
    profile_totalReviews: "Total Reviews",
    profile_landSize: "Land Size",
    profile_location: "Location",
    profile_noProfile: "No profile data found.",
    profile_yrs: "yrs",
    profile_crops_label: "Crops",
    profile_area: "Area",
    profile_rating: "Rating",

    insights_title: "AI Market Insights",
    insights_subtitle:
      "Smart insights powered by AI to help you make better decisions",
    insights_all: "All Insights",
    insights_weather: "Weather",
    insights_market: "Market",
    insights_cropHealth: "Crop Health",
    insights_optimization: "Optimization",
    insights_recommendations: "Recommendations",
    insights_loading: "Loading insights...",
    insights_empty: "No insights available",
    insights_actionRequired: "Action Required",
    insights_confidence: "Confidence",
    insights_impact: "Potential Impact",
    insights_high: "High",
    insights_medium: "Medium",
    insights_low: "Low",

    guidance_title: "Farming Guidance",
    guidance_subtitle: "Expert-curated resources to help you farm better",
    guidance_searchPlaceholder: "Search articles, videos...",
    guidance_loading: "Loading guidance...",
    guidance_empty: "No resources found",
    guidance_bookmark: "Bookmark",
    guidance_views: "views",
    guidance_all: "All",
    guidance_article: "Article",
    guidance_video: "Video",
    guidance_document: "Document",

    browse_title: "Browse Crop Listings",
    browse_subtitle: "Find crops available in the marketplace",
    browse_searchPlaceholder: "Search by crop name...",
    browse_allGrades: "All Grades",
    browse_loading: "Loading listings...",
    browse_empty: "No listings found",
    browse_farmer: "Farmer",
    browse_qty: "Qty",
    browse_price: "Price",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HINDI
  // ═══════════════════════════════════════════════════════════════════════════
  hi: {
    loading: "लोड हो रहा है...",
    cancel: "रद्द करें",
    close: "बंद करें",
    search: "खोजें",
    all: "सभी",
    kg: "किग्रा",
    perKg: "/किग्रा",
    total: "कुल:",
    noData: "कोई डेटा नहीं मिला",

    dash_moneyExpected: "बिक्री पर फसलों से अपेक्षित राशि",
    dash_marketMovement: "बाजार की गतिविधि",
    dash_basedOnDuration: "लिस्टिंग अवधि पर आधारित",
    dash_activecrops: "सक्रिय फसलें",
    dash_fresh: "ताज़ा",
    dash_waiting: "प्रतीक्षारत",
    dash_stuck: "अटकी हुई",
    dash_qualityMix: "फसल गुणवत्ता मिश्रण",
    dash_netEarnings: "शुद्ध आय",
    dash_sales: "बिक्री",
    dash_deductions: "कटौतियाँ",
    dash_netProfit: "शुद्ध लाभ",
    dash_govSchemes: "सरकारी योजनाएँ",

    sell_title: "अपनी फसलें बेचें",
    sell_subtitle: "लिस्टिंग बनाएं और अपनी फसल की बिक्री प्रबंधित करें",
    sell_createBtn: "लिस्टिंग बनाएं",
    sell_activeListings: "सक्रिय लिस्टिंग",
    sell_totalValue: "कुल मूल्य",
    sell_soldMonth: "इस महीने बेचा",
    sell_yourListings: "आपकी फसल लिस्टिंग",
    sell_noListings: "अभी तक कोई लिस्टिंग नहीं",
    sell_createFirst: "अपनी पहली लिस्टिंग बनाएं",
    sell_listedOn: "पर सूचीबद्ध",
    sell_modalTitle: "नई फसल लिस्टिंग",
    sell_modalSubtitle: "अपनी फसल सूचीबद्ध करने के लिए विवरण भरें",
    sell_profileId: "किसान प्रोफ़ाइल आईडी",
    sell_fetchingProfile: "प्रोफ़ाइल प्राप्त हो रही है...",
    sell_autoFilled: "स्वतः भरा गया",
    sell_cropName: "फसल का नाम",
    sell_qualityGrade: "गुणवत्ता श्रेणी",
    sell_selectGrade: "श्रेणी चुनें",
    sell_gradePremium: "श्रेणी A — प्रीमियम",
    sell_gradeStandard: "श्रेणी B — मानक",
    sell_gradeEconomy: "श्रेणी C — किफ़ायती",
    sell_quantity: "मात्रा (किग्रा)",
    sell_price: "अपेक्षित मूल्य (₹/किग्रा)",
    sell_aiSuggested: "AI सुझाया मूल्य",
    sell_tapToApply: "— लागू करने के लिए टैप करें",
    sell_creating: "बना रहा है...",
    sell_submit: "लिस्टिंग बनाएं",
    sell_quantityLabel: "मात्रा",
    sell_totalValueLabel: "कुल मूल्य",
    sell_qualityGradeLabel: "गुणवत्ता श्रेणी",
    sell_harvestDate: "कटाई की तारीख",
    sell_priceLabel: "मूल्य / किग्रा",

    offers_title: "आने वाले प्रस्ताव",
    offers_subtitle:
      "अपनी फसल लिस्टिंग पर खरीदार के प्रस्ताव देखें और बातचीत करें",
    offers_total: "कुल प्रस्ताव",
    offers_awaiting: "समीक्षा के लिए प्रतीक्षारत",
    offers_accepted: "स्वीकृत",
    offers_section: "आपकी लिस्टिंग पर प्रस्ताव",
    offers_loading: "प्रस्ताव लोड हो रहे हैं...",
    offers_empty: "अभी तक कोई प्रस्ताव नहीं मिला",
    offers_negLog: "बातचीत लॉग",
    offers_reject: "अस्वीकार",
    offers_negotiate: "बातचीत करें",
    offers_accept: "स्वीकार करें",
    offers_negHistory: "बातचीत इतिहास",
    offers_noNeg: "अभी तक कोई बातचीत नहीं।",
    offers_buyerOffer: "खरीदार का प्रस्ताव",
    offers_askingPrice: "आपका अपेक्षित मूल्य",
    offers_modalTitle: "बातचीत करें",
    offers_proposedPrice: "प्रस्तावित मूल्य (₹/किग्रा)",
    offers_fetchingAi: "AI मूल्य सुझाव प्राप्त हो रहा है...",
    offers_message: "संदेश",
    offers_messagePlaceholder: "अपना जवाबी प्रस्ताव समझाएं...",
    offers_ask: "माँगा गया:",
    offers_sending: "भेजा जा रहा है...",
    offers_sendCounter: "जवाबी प्रस्ताव भेजें",

    market_title: "बाजार मूल्य",
    market_subtitle: "पूरे भारत के बाजारों से वास्तविक समय में फसल मूल्य",
    market_lastUpdated: "अंतिम अपडेट:",
    market_searchPlaceholder: "फसलें या बाजार खोजें...",
    market_allStates: "सभी राज्य",
    market_liveRates: "लाइव बाजार दरें",
    market_loading: "बाजार मूल्य लोड हो रहे हैं...",
    market_empty: "कोई मूल्य नहीं मिला",
    market_recorded: "दर्ज:",
    market_added: "जोड़ा:",

    schemes_title: "सरकारी योजनाएँ",
    schemes_subtitle: "आपके लिए उपलब्ध लाभ और सब्सिडी देखें",
    schemes_searchPlaceholder: "नाम या विवरण से योजनाएँ खोजें...",
    schemes_allStates: "सभी राज्य",
    schemes_available: "उपलब्ध योजनाएँ",
    schemes_statesCovered: "कवर किए गए राज्य",
    schemes_endingSoon: "जल्द समाप्त",
    schemes_eligible: "योग्य योजनाएँ",
    schemes_applied: "आवेदित योजनाएँ",
    schemes_loading: "योजनाएँ लोड हो रही हैं...",
    schemes_empty: "कोई योजना नहीं मिली",
    schemes_adjustFilters: "अपनी खोज या फ़िल्टर बदलकर देखें",
    schemes_deadline: "अंतिम तिथि",
    schemes_benefit: "लाभ",
    schemes_learnMore: "अधिक जानें",

    ship_title: "शिपमेंट अनुरोध",
    ship_subtitle: "अपने आदेश और लॉजिस्टिक्स प्रबंधित करें",
    ship_ordersTab: "स्वीकृत आदेश",
    ship_requestsTab: "मेरे अनुरोध",
    ship_searchOrders: "फसल का नाम खोजें...",
    ship_searchProviders: "प्रदाता खोजें...",
    ship_noOrders: "लॉजिस्टिक्स के लिए कोई स्वीकृत आदेश नहीं",
    ship_noRequests: "अभी तक कोई शिपमेंट अनुरोध नहीं",
    ship_arrangeLogistics: "लॉजिस्टिक्स व्यवस्थित करें",
    ship_counterOffer: "जवाबी प्रस्ताव",
    ship_acceptTerms: "शर्तें स्वीकार करें",
    ship_negLog: "बातचीत लॉग",
    ship_chat: "चैट",
    ship_loading: "लोड हो रहा है...",
    ship_proposedCost: "प्रस्तावित लागत (₹)",
    ship_duration: "अवधि",
    ship_days: "दिन",
    ship_message: "संदेश",
    ship_sendingCounter: "भेजा जा रहा है...",
    ship_submitCounter: "जवाब भेजें",
    ship_selectProvider: "लॉजिस्टिक्स प्रदाता चुनें",
    ship_selectVehicle: "वाहन चुनें",
    ship_origin: "मूल स्थान",
    ship_destination: "गंतव्य",
    ship_sendRequest: "शिपमेंट अनुरोध भेजें",
    ship_notifications: "सूचनाएँ",

    support_title: "सहायता और मदद",
    support_faq: "अक्सर पूछे जाने वाले प्रश्न",
    support_notifications: "आपकी सूचनाएँ",
    support_markAll: "सभी पढ़े गए चिह्नित करें",
    support_loading: "सूचनाएँ लोड हो रही हैं...",
    support_empty: "कोई सूचना नहीं",
    support_unreadOnly: "केवल अपठित",
    support_allFilter: "सभी",

    profile_loading: "प्रोफ़ाइल डेटा लोड हो रहा है...",
    profile_personal: "व्यक्तिगत",
    profile_farm: "खेत",
    profile_crops: "फसलें",
    profile_financial: "वित्तीय",
    profile_ratings: "रेटिंग",
    profile_documents: "दस्तावेज़",
    profile_settings: "सेटिंग्स",
    profile_personalInfo: "व्यक्तिगत जानकारी",
    profile_farmDetails: "खेत का विवरण",
    profile_phone: "फ़ोन",
    profile_email: "ईमेल",
    profile_role: "भूमिका",
    profile_joined: "शामिल हुए",
    profile_verified: "सत्यापित",
    profile_walletBalance: "वॉलेट बैलेंस",
    profile_avgRating: "औसत रेटिंग",
    profile_totalReviews: "कुल समीक्षाएँ",
    profile_landSize: "भूमि का आकार",
    profile_location: "स्थान",
    profile_noProfile: "कोई प्रोफ़ाइल डेटा नहीं मिला।",
    profile_yrs: "वर्ष",
    profile_crops_label: "फसलें",
    profile_area: "क्षेत्र",
    profile_rating: "रेटिंग",

    insights_title: "AI बाज़ार अंतर्दृष्टि",
    insights_subtitle:
      "बेहतर निर्णय लेने में मदद के लिए AI-संचालित स्मार्ट अंतर्दृष्टि",
    insights_all: "सभी अंतर्दृष्टि",
    insights_weather: "मौसम",
    insights_market: "बाज़ार",
    insights_cropHealth: "फसल स्वास्थ्य",
    insights_optimization: "अनुकूलन",
    insights_recommendations: "सिफारिशें",
    insights_loading: "अंतर्दृष्टि लोड हो रही हैं...",
    insights_empty: "कोई अंतर्दृष्टि उपलब्ध नहीं",
    insights_actionRequired: "कार्रवाई आवश्यक",
    insights_confidence: "विश्वास स्तर",
    insights_impact: "संभावित प्रभाव",
    insights_high: "उच्च",
    insights_medium: "मध्यम",
    insights_low: "कम",

    guidance_title: "कृषि मार्गदर्शन",
    guidance_subtitle:
      "बेहतर खेती में मदद के लिए विशेषज्ञ द्वारा चुने गए संसाधन",
    guidance_searchPlaceholder: "लेख, वीडियो खोजें...",
    guidance_loading: "मार्गदर्शन लोड हो रहा है...",
    guidance_empty: "कोई संसाधन नहीं मिला",
    guidance_bookmark: "बुकमार्क",
    guidance_views: "दृश्य",
    guidance_all: "सभी",
    guidance_article: "लेख",
    guidance_video: "वीडियो",
    guidance_document: "दस्तावेज़",

    browse_title: "फसल लिस्टिंग ब्राउज़ करें",
    browse_subtitle: "बाज़ार में उपलब्ध फसलें खोजें",
    browse_searchPlaceholder: "फसल के नाम से खोजें...",
    browse_allGrades: "सभी श्रेणियाँ",
    browse_loading: "लिस्टिंग लोड हो रही हैं...",
    browse_empty: "कोई लिस्टिंग नहीं मिली",
    browse_farmer: "किसान",
    browse_qty: "मात्रा",
    browse_price: "मूल्य",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TAMIL
  // ═══════════════════════════════════════════════════════════════════════════
  ta: {
    loading: "ஏற்றுகிறது...",
    cancel: "ரத்து செய்",
    close: "மூடு",
    search: "தேடு",
    all: "அனைத்தும்",
    kg: "கிகி",
    perKg: "/கிகி",
    total: "மொத்தம்:",
    noData: "தரவு எதுவும் இல்லை",

    dash_moneyExpected:
      "விற்பனையில் உள்ள பயிர்களிலிருந்து எதிர்பார்க்கப்படும் தொகை",
    dash_marketMovement: "சந்தை இயக்கம்",
    dash_basedOnDuration: "பட்டியல் காலத்தின் அடிப்படையில்",
    dash_activecrops: "செயலில் உள்ள பயிர்கள்",
    dash_fresh: "புதியது",
    dash_waiting: "காத்திருக்கிறது",
    dash_stuck: "தேங்கியது",
    dash_qualityMix: "பயிர் தர கலவை",
    dash_netEarnings: "நிகர வருவாய்",
    dash_sales: "விற்பனை",
    dash_deductions: "கழிவுகள்",
    dash_netProfit: "நிகர இலாபம்",
    dash_govSchemes: "அரசு திட்டங்கள்",

    sell_title: "உங்கள் பயிர்களை விற்கவும்",
    sell_subtitle: "பட்டியல்களை உருவாக்கி பயிர் விற்பனையை நிர்வகிக்கவும்",
    sell_createBtn: "பட்டியல் உருவாக்கு",
    sell_activeListings: "செயலில் உள்ள பட்டியல்கள்",
    sell_totalValue: "மொத்த மதிப்பு",
    sell_soldMonth: "இம்மாதம் விற்கப்பட்டது",
    sell_yourListings: "உங்கள் பயிர் பட்டியல்கள்",
    sell_noListings: "இன்னும் பட்டியல்கள் இல்லை",
    sell_createFirst: "உங்கள் முதல் பட்டியலை உருவாக்கவும்",
    sell_listedOn: "பட்டியலிடப்பட்ட தேதி",
    sell_modalTitle: "புதிய பயிர் பட்டியல்",
    sell_modalSubtitle: "பயிரை பட்டியலிட விவரங்களை நிரப்பவும்",
    sell_profileId: "விவசாயி சுயவிவர ID",
    sell_fetchingProfile: "சுயவிவரம் பெறுகிறோம்...",
    sell_autoFilled: "தானாக நிரப்பப்பட்டது",
    sell_cropName: "பயிர் பெயர்",
    sell_qualityGrade: "தர வகுப்பு",
    sell_selectGrade: "தர வகுப்பை தேர்வு செய்யவும்",
    sell_gradePremium: "வகுப்பு A — சிறந்தது",
    sell_gradeStandard: "வகுப்பு B — நிலையானது",
    sell_gradeEconomy: "வகுப்பு C — சாதாரணம்",
    sell_quantity: "அளவு (கிகி)",
    sell_price: "எதிர்பார்க்கப்படும் விலை (₹/கிகி)",
    sell_aiSuggested: "AI பரிந்துரைத்த விலை",
    sell_tapToApply: "— பயன்படுத்த தட்டவும்",
    sell_creating: "உருவாக்குகிறோம்...",
    sell_submit: "பட்டியல் உருவாக்கு",
    sell_quantityLabel: "அளவு",
    sell_totalValueLabel: "மொத்த மதிப்பு",
    sell_qualityGradeLabel: "தர வகுப்பு",
    sell_harvestDate: "அறுவடை தேதி",
    sell_priceLabel: "விலை / கிகி",

    offers_title: "வரும் சலுகைகள்",
    offers_subtitle:
      "உங்கள் பயிர் பட்டியல்களில் வாங்குனர் சலுகைகளை மதிப்பாய்வு செய்து பேரம் பேசவும்",
    offers_total: "மொத்த சலுகைகள்",
    offers_awaiting: "மதிப்பாய்வுக்கு காத்திருக்கிறது",
    offers_accepted: "ஏற்கப்பட்டது",
    offers_section: "உங்கள் பட்டியல்களில் சலுகைகள்",
    offers_loading: "சலுகைகள் ஏற்றுகிறது...",
    offers_empty: "இன்னும் சலுகைகள் எதுவும் இல்லை",
    offers_negLog: "பேரம் பேசல் பதிவு",
    offers_reject: "நிராகரி",
    offers_negotiate: "பேரம் பேசு",
    offers_accept: "ஏற்கவும்",
    offers_negHistory: "பேரம் பேசல் வரலாறு",
    offers_noNeg: "இன்னும் பேரம் பேசல் நடவடிக்கை இல்லை.",
    offers_buyerOffer: "வாங்குனரின் சலுகை",
    offers_askingPrice: "உங்கள் கேட்கும் விலை",
    offers_modalTitle: "பேரம் பேசு",
    offers_proposedPrice: "முன்மொழியப்பட்ட விலை (₹/கிகி)",
    offers_fetchingAi: "AI விலை பரிந்துரை பெறுகிறோம்...",
    offers_message: "செய்தி",
    offers_messagePlaceholder: "உங்கள் எதிர்-சலுகையை விளக்கவும்...",
    offers_ask: "கேட்கும் விலை:",
    offers_sending: "அனுப்புகிறோம்...",
    offers_sendCounter: "எதிர்-சலுகை அனுப்பு",

    market_title: "சந்தை விலைகள்",
    market_subtitle:
      "இந்தியா முழுவதும் உள்ள சந்தைகளில் இருந்து நிகழ்நேர பயிர் விலைகள்",
    market_lastUpdated: "கடைசியாக புதுப்பிக்கப்பட்டது:",
    market_searchPlaceholder: "பயிர்கள் அல்லது சந்தைகளை தேடவும்...",
    market_allStates: "அனைத்து மாநிலங்களும்",
    market_liveRates: "நேரடி சந்தை விகிதங்கள்",
    market_loading: "சந்தை விலைகள் ஏற்றுகிறது...",
    market_empty: "விலைகள் எதுவும் கிடைக்கவில்லை",
    market_recorded: "பதிவு:",
    market_added: "சேர்க்கப்பட்டது:",

    schemes_title: "அரசு திட்டங்கள்",
    schemes_subtitle:
      "உங்களுக்கு கிடைக்கும் சலுகைகளையும் மானியங்களையும் கண்டறியவும்",
    schemes_searchPlaceholder:
      "பெயர் அல்லது விளக்கம் மூலம் திட்டங்களை தேடவும்...",
    schemes_allStates: "அனைத்து மாநிலங்களும்",
    schemes_available: "கிடைக்கும் திட்டங்கள்",
    schemes_statesCovered: "உள்ளடக்கிய மாநிலங்கள்",
    schemes_endingSoon: "விரைவில் முடியும்",
    schemes_eligible: "தகுதியான திட்டங்கள்",
    schemes_applied: "விண்ணப்பித்த திட்டங்கள்",
    schemes_loading: "திட்டங்கள் ஏற்றுகிறது...",
    schemes_empty: "திட்டங்கள் எதுவும் கிடைக்கவில்லை",
    schemes_adjustFilters: "உங்கள் தேடல் அல்லது வடிப்பான்களை சரிசெய்யவும்",
    schemes_deadline: "கடைசி தேதி",
    schemes_benefit: "சலுகை",
    schemes_learnMore: "மேலும் அறிய",

    ship_title: "ஏற்றுமதி கோரிக்கைகள்",
    ship_subtitle: "உங்கள் ஆர்டர்கள் மற்றும் தளவாடங்களை நிர்வகிக்கவும்",
    ship_ordersTab: "ஏற்கப்பட்ட ஆர்டர்கள்",
    ship_requestsTab: "என் கோரிக்கைகள்",
    ship_searchOrders: "பயிர் பெயரை தேடவும்...",
    ship_searchProviders: "வழங்குநரை தேடவும்...",
    ship_noOrders: "தளவாடங்களுக்கு ஏற்கப்பட்ட ஆர்டர்கள் இல்லை",
    ship_noRequests: "இன்னும் ஏற்றுமதி கோரிக்கைகள் இல்லை",
    ship_arrangeLogistics: "தளவாட ஏற்பாடு செய்",
    ship_counterOffer: "எதிர் சலுகை",
    ship_acceptTerms: "நிபந்தனைகளை ஏற்கவும்",
    ship_negLog: "பேரம் பேசல் பதிவு",
    ship_chat: "அரட்டை",
    ship_loading: "ஏற்றுகிறது...",
    ship_proposedCost: "முன்மொழிந்த செலவு (₹)",
    ship_duration: "காலம்",
    ship_days: "நாட்கள்",
    ship_message: "செய்தி",
    ship_sendingCounter: "அனுப்புகிறோம்...",
    ship_submitCounter: "பதில் அனுப்பு",
    ship_selectProvider: "தளவாட வழங்குநரை தேர்வு செய்யவும்",
    ship_selectVehicle: "வாகனத்தை தேர்வு செய்யவும்",
    ship_origin: "ஆதார இடம்",
    ship_destination: "இலக்கு",
    ship_sendRequest: "ஏற்றுமதி கோரிக்கை அனுப்பு",
    ship_notifications: "அறிவிப்புகள்",

    support_title: "ஆதரவு மற்றும் உதவி",
    support_faq: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
    support_notifications: "உங்கள் அறிவிப்புகள்",
    support_markAll: "அனைத்தையும் படித்ததாக குறி",
    support_loading: "அறிவிப்புகள் ஏற்றுகிறது...",
    support_empty: "அறிவிப்புகள் இல்லை",
    support_unreadOnly: "படிக்காதவை மட்டும்",
    support_allFilter: "அனைத்தும்",

    profile_loading: "சுயவிவர தரவு ஏற்றுகிறது...",
    profile_personal: "தனிப்பட்ட",
    profile_farm: "பண்ணை",
    profile_crops: "பயிர்கள்",
    profile_financial: "நிதி",
    profile_ratings: "மதிப்பீடுகள்",
    profile_documents: "ஆவணங்கள்",
    profile_settings: "அமைப்புகள்",
    profile_personalInfo: "தனிப்பட்ட தகவல்",
    profile_farmDetails: "பண்ணை விவரங்கள்",
    profile_phone: "தொலைபேசி",
    profile_email: "மின்னஞ்சல்",
    profile_role: "பங்கு",
    profile_joined: "சேர்ந்த தேதி",
    profile_verified: "சரிபார்க்கப்பட்டது",
    profile_walletBalance: "வாலட் இருப்பு",
    profile_avgRating: "சராசரி மதிப்பீடு",
    profile_totalReviews: "மொத்த மதிப்புரைகள்",
    profile_landSize: "நிலத்தின் அளவு",
    profile_location: "இருப்பிடம்",
    profile_noProfile: "சுயவிவர தரவு எதுவும் கிடைக்கவில்லை.",
    profile_yrs: "ஆண்டுகள்",
    profile_crops_label: "பயிர்கள்",
    profile_area: "பகுதி",
    profile_rating: "மதிப்பீடு",

    insights_title: "AI சந்தை நுண்ணறிவு",
    insights_subtitle: "சிறந்த முடிவுகள் எடுக்க AI-ஆல் இயக்கப்படும் நுண்ணறிவு",
    insights_all: "அனைத்து நுண்ணறிவுகளும்",
    insights_weather: "வானிலை",
    insights_market: "சந்தை",
    insights_cropHealth: "பயிர் ஆரோக்கியம்",
    insights_optimization: "உகந்தமாக்கல்",
    insights_recommendations: "பரிந்துரைகள்",
    insights_loading: "நுண்ணறிவுகள் ஏற்றுகிறது...",
    insights_empty: "நுண்ணறிவுகள் எதுவும் இல்லை",
    insights_actionRequired: "நடவடிக்கை தேவை",
    insights_confidence: "நம்பகத்தன்மை",
    insights_impact: "சாத்தியமான தாக்கம்",
    insights_high: "அதிகம்",
    insights_medium: "நடுத்தரம்",
    insights_low: "குறைவு",

    guidance_title: "விவசாய வழிகாட்டுதல்",
    guidance_subtitle:
      "சிறந்த விவசாயத்திற்கு நிபுணர்களால் தேர்ந்தெடுக்கப்பட்ட வளங்கள்",
    guidance_searchPlaceholder: "கட்டுரைகள், வீடியோக்களை தேடவும்...",
    guidance_loading: "வழிகாட்டுதல் ஏற்றுகிறது...",
    guidance_empty: "வளங்கள் எதுவும் கிடைக்கவில்லை",
    guidance_bookmark: "புத்தக அடையாளம்",
    guidance_views: "பார்வைகள்",
    guidance_all: "அனைத்தும்",
    guidance_article: "கட்டுரை",
    guidance_video: "வீடியோ",
    guidance_document: "ஆவணம்",

    browse_title: "பயிர் பட்டியல்களை உலாவு",
    browse_subtitle: "சந்தையில் கிடைக்கும் பயிர்களை கண்டறியவும்",
    browse_searchPlaceholder: "பயிர் பெயரால் தேடவும்...",
    browse_allGrades: "அனைத்து தர வகுப்புகளும்",
    browse_loading: "பட்டியல்கள் ஏற்றுகிறது...",
    browse_empty: "பட்டியல்கள் எதுவும் கிடைக்கவில்லை",
    browse_farmer: "விவசாயி",
    browse_qty: "அளவு",
    browse_price: "விலை",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MALAYALAM
  // ═══════════════════════════════════════════════════════════════════════════
  ml: {
    loading: "ലോഡ് ചെയ്യുന്നു...",
    cancel: "റദ്ദാക്കുക",
    close: "അടയ്ക്കുക",
    search: "തിരയുക",
    all: "എല്ലാം",
    kg: "കിഗ്രാ",
    perKg: "/കിഗ്രാ",
    total: "ആകെ:",
    noData: "ഡാറ്റ ഒന്നും കണ്ടെത്തിയില്ല",

    dash_moneyExpected: "വിൽക്കുന്ന വിളകളിൽ നിന്ന് പ്രതീക്ഷിക്കുന്ന തുക",
    dash_marketMovement: "വിപണി ചലനം",
    dash_basedOnDuration: "ലിസ്റ്റിംഗ് ദൈർഘ്യം അടിസ്ഥാനത്തിൽ",
    dash_activecrops: "സജീവ വിളകൾ",
    dash_fresh: "പുതിയത്",
    dash_waiting: "കാത്തിരിക്കുന്നു",
    dash_stuck: "തടഞ്ഞിരിക്കുന്നു",
    dash_qualityMix: "വിള ഗുണനിലവാര മിശ്രണം",
    dash_netEarnings: "അറ്റ വരുമാനം",
    dash_sales: "വിൽപ്പന",
    dash_deductions: "കിഴിവുകൾ",
    dash_netProfit: "അറ്റ ലാഭം",
    dash_govSchemes: "സർക്കാർ പദ്ധതികൾ",

    sell_title: "നിങ്ങളുടെ വിളകൾ വിൽക്കുക",
    sell_subtitle: "ലിസ്റ്റിംഗുകൾ ഉണ്ടാക്കി വിള വിൽപ്പന നിയന്ത്രിക്കുക",
    sell_createBtn: "ലിസ്റ്റിംഗ് ഉണ്ടാക്കുക",
    sell_activeListings: "സജീവ ലിസ്റ്റിംഗുകൾ",
    sell_totalValue: "മൊത്തം മൂല്യം",
    sell_soldMonth: "ഈ മാസം വിൽപ്പന",
    sell_yourListings: "നിങ്ങളുടെ വിള ലിസ്റ്റിംഗുകൾ",
    sell_noListings: "ഇതുവരെ ലിസ്റ്റിംഗുകൾ ഇല്ല",
    sell_createFirst: "നിങ്ങളുടെ ആദ്യ ലിസ്റ്റിംഗ് ഉണ്ടാക്കുക",
    sell_listedOn: "ലിസ്റ്റ് ചെയ്ത തീയതി",
    sell_modalTitle: "പുതിയ വിള ലിസ്റ്റിംഗ്",
    sell_modalSubtitle: "വില ലിസ്റ്റ് ചെയ്യാൻ വിവരങ്ങൾ പൂരിപ്പിക്കുക",
    sell_profileId: "കർഷക പ്രൊഫൈൽ ID",
    sell_fetchingProfile: "പ്രൊഫൈൽ എടുക്കുന്നു...",
    sell_autoFilled: "സ്വയം നിരപ്പ്",
    sell_cropName: "വിളയുടെ പേര്",
    sell_qualityGrade: "ഗുണനിലവാര ഗ്രേഡ്",
    sell_selectGrade: "ഗ്രേഡ് തിരഞ്ഞെടുക്കുക",
    sell_gradePremium: "ഗ്രേഡ് A — പ്രീമിയം",
    sell_gradeStandard: "ഗ്രേഡ് B — സ്റ്റാൻഡേർഡ്",
    sell_gradeEconomy: "ഗ്രേഡ് C — ഇക്കോണമി",
    sell_quantity: "അളവ് (കിഗ്രാ)",
    sell_price: "പ്രതീക്ഷിത വില (₹/കിഗ്രാ)",
    sell_aiSuggested: "AI നിർദ്ദേശിച്ച വില",
    sell_tapToApply: "— ടാപ്പ് ചെയ്ത് പ്രയോഗിക്കുക",
    sell_creating: "ഉണ്ടാക്കുന്നു...",
    sell_submit: "ലിസ്റ്റിംഗ് ഉണ്ടാക്കുക",
    sell_quantityLabel: "അളവ്",
    sell_totalValueLabel: "മൊത്തം മൂല്യം",
    sell_qualityGradeLabel: "ഗുണനിലവാര ഗ്രേഡ്",
    sell_harvestDate: "വിളവെടുപ്പ് തീയതി",
    sell_priceLabel: "വില / കിഗ്രാ",

    offers_title: "വരുന്ന ഓഫറുകൾ",
    offers_subtitle:
      "നിങ്ങളുടെ വിള ലിസ്റ്റിംഗുകളിൽ വാങ്ങുന്നവരുടെ ഓഫറുകൾ അവലോകനം ചെയ്ത് വില പേശുക",
    offers_total: "മൊത്തം ഓഫറുകൾ",
    offers_awaiting: "അവലോകനം ആവശ്യമുള്ളത്",
    offers_accepted: "സ്വീകരിച്ചത്",
    offers_section: "നിങ്ങളുടെ ലിസ്റ്റിംഗുകളിലെ ഓഫറുകൾ",
    offers_loading: "ഓഫറുകൾ ലോഡ് ചെയ്യുന്നു...",
    offers_empty: "ഇതുവരെ ഓഫറുകൾ ലഭിച്ചിട്ടില്ല",
    offers_negLog: "വില പേശൽ ലോഗ്",
    offers_reject: "നിരസിക്കുക",
    offers_negotiate: "വില പേശുക",
    offers_accept: "സ്വീകരിക്കുക",
    offers_negHistory: "വില പേശൽ ചരിത്രം",
    offers_noNeg: "ഇതുവരെ വില പേശൽ നടവടികൾ ഇല്ല.",
    offers_buyerOffer: "വാങ്ങുന്നവരുടെ ഓഫർ",
    offers_askingPrice: "നിങ്ങളുടെ ആവശ്യ വില",
    offers_modalTitle: "വില പേശുക",
    offers_proposedPrice: "നിർദ്ദേശിത വില (₹/കിഗ്രാ)",
    offers_fetchingAi: "AI വില നിർദ്ദേശം ലഭ്യമാക്കുന്നു...",
    offers_message: "സന്ദേശം",
    offers_messagePlaceholder: "നിങ്ങളുടെ എതിർ ഓഫർ വിശദീകരിക്കുക...",
    offers_ask: "ചോദിക്കുന്ന വില:",
    offers_sending: "അയക്കുന്നു...",
    offers_sendCounter: "എതിർ ഓഫർ അയക്കുക",

    market_title: "വിപണി വിലകൾ",
    market_subtitle: "ഇന്ത്യ മുഴുവൻ വിപണികളിൽ നിന്നുള്ള തൽസമയ വിള വിലകൾ",
    market_lastUpdated: "അവസാനം അപ്ഡേറ്റ് ചെയ്തത്:",
    market_searchPlaceholder: "വിളകൾ അല്ലെങ്കിൽ വിപണികൾ തിരയുക...",
    market_allStates: "എല്ലാ സംസ്ഥാനങ്ങളും",
    market_liveRates: "തൽസമയ വിപണി നിരക്കുകൾ",
    market_loading: "വിപണി വിലകൾ ലോഡ് ചെയ്യുന്നു...",
    market_empty: "വിലകൾ ഒന്നും കണ്ടെത്തിയില്ല",
    market_recorded: "രേഖപ്പെടുത്തിയത്:",
    market_added: "ചേർത്തത്:",

    schemes_title: "സർക്കാർ പദ്ധതികൾ",
    schemes_subtitle:
      "നിങ്ങൾക്ക് ലഭ്യമായ ആനുകൂല്യങ്ങളും സബ്സിഡികളും കണ്ടെത്തുക",
    schemes_searchPlaceholder:
      "പേര് അല്ലെങ്കിൽ വിവരണം ഉപയോഗിച്ച് പദ്ധതികൾ തിരയുക...",
    schemes_allStates: "എല്ലാ സംസ്ഥാനങ്ങളും",
    schemes_available: "ലഭ്യമായ പദ്ധതികൾ",
    schemes_statesCovered: "ഉൾക്കൊള്ളുന്ന സംസ്ഥാനങ്ങൾ",
    schemes_endingSoon: "ഉടൻ അവസാനിക്കും",
    schemes_eligible: "യോഗ്യമായ പദ്ധതികൾ",
    schemes_applied: "അപേക്ഷിച്ച പദ്ധതികൾ",
    schemes_loading: "പദ്ധതികൾ ലോഡ് ചെയ്യുന്നു...",
    schemes_empty: "പദ്ധതികൾ ഒന്നും കണ്ടെത്തിയില്ല",
    schemes_adjustFilters:
      "നിങ്ങളുടെ തിരയൽ അല്ലെങ്കിൽ ഫിൽട്ടറുകൾ മാറ്റി നോക്കുക",
    schemes_deadline: "അവസാന തീയതി",
    schemes_benefit: "ആനുകൂല്യം",
    schemes_learnMore: "കൂടുതൽ അറിയുക",

    ship_title: "ഷിപ്പ്മെന്റ് അഭ്യർത്ഥനകൾ",
    ship_subtitle: "നിങ്ങളുടെ ഓർഡറുകളും ലോജിസ്റ്റിക്സും നിയന്ത്രിക്കുക",
    ship_ordersTab: "സ്വീകരിച്ച ഓർഡറുകൾ",
    ship_requestsTab: "എന്റെ അഭ്യർത്ഥനകൾ",
    ship_searchOrders: "വിളയുടെ പേര് തിരയുക...",
    ship_searchProviders: "ദാതാവ് തിരയുക...",
    ship_noOrders: "ലോജിസ്റ്റിക്സ് ആവശ്യമുള്ള ഓർഡറുകൾ ഇല്ല",
    ship_noRequests: "ഇതുവരെ ഷിപ്പ്മെന്റ് അഭ്യർത്ഥനകൾ ഇല്ല",
    ship_arrangeLogistics: "ലോജിസ്റ്റിക്സ് ക്രമീകരിക്കുക",
    ship_counterOffer: "എതിർ ഓഫർ",
    ship_acceptTerms: "നിബന്ധനകൾ സ്വീകരിക്കുക",
    ship_negLog: "വില പേശൽ ലോഗ്",
    ship_chat: "ചാറ്റ്",
    ship_loading: "ലോഡ് ചെയ്യുന്നു...",
    ship_proposedCost: "നിർദ്ദേശിത ചിലവ് (₹)",
    ship_duration: "ദൈർഘ്യം",
    ship_days: "ദിവസങ്ങൾ",
    ship_message: "സന്ദേശം",
    ship_sendingCounter: "അയക്കുന്നു...",
    ship_submitCounter: "മറുപടി അയക്കുക",
    ship_selectProvider: "ഒരു ലോജിസ്റ്റിക്സ് ദാതാവ് തിരഞ്ഞെടുക്കുക",
    ship_selectVehicle: "ഒരു വാഹനം തിരഞ്ഞെടുക്കുക",
    ship_origin: "ഉൽഭവ സ്ഥലം",
    ship_destination: "ലക്ഷ്യസ്ഥാനം",
    ship_sendRequest: "ഷിപ്പ്മെന്റ് അഭ്യർത്ഥന അയക്കുക",
    ship_notifications: "അറിയിപ്പുകൾ",

    support_title: "സഹായം",
    support_faq: "പതിവായി ചോദിക്കുന്ന ചോദ്യങ്ങൾ",
    support_notifications: "നിങ്ങളുടെ അറിയിപ്പുകൾ",
    support_markAll: "എല്ലാം വായിച്ചതായി അടയാളപ്പെടുത്തുക",
    support_loading: "അറിയിപ്പുകൾ ലോഡ് ചെയ്യുന്നു...",
    support_empty: "അറിയിപ്പുകൾ ഇല്ല",
    support_unreadOnly: "വായിക്കാത്തവ മാത്രം",
    support_allFilter: "എല്ലാം",

    profile_loading: "പ്രൊഫൈൽ ഡാറ്റ ലോഡ് ചെയ്യുന്നു...",
    profile_personal: "വ്യക്തിഗതം",
    profile_farm: "ഫാം",
    profile_crops: "വിളകൾ",
    profile_financial: "സാമ്പത്തികം",
    profile_ratings: "റേറ്റിംഗ്",
    profile_documents: "രേഖകൾ",
    profile_settings: "ക്രമീകരണങ്ങൾ",
    profile_personalInfo: "വ്യക്തിഗത വിവരം",
    profile_farmDetails: "ഫാം വിവരങ്ങൾ",
    profile_phone: "ഫോൺ",
    profile_email: "ഇ-മെയിൽ",
    profile_role: "റോൾ",
    profile_joined: "ചേർന്നത്",
    profile_verified: "സ്ഥിരീകരിച്ചത്",
    profile_walletBalance: "വാലറ്റ് ബാലൻസ്",
    profile_avgRating: "ശരാശരി റേറ്റിംഗ്",
    profile_totalReviews: "മൊത്തം അഭിപ്രായങ്ങൾ",
    profile_landSize: "ഭൂമിയുടെ വലിപ്പം",
    profile_location: "സ്ഥലം",
    profile_noProfile: "പ്രൊഫൈൽ ഡാറ്റ ഒന്നും കണ്ടെത്തിയില്ല.",
    profile_yrs: "വർഷം",
    profile_crops_label: "വിളകൾ",
    profile_area: "വിസ്തൃതി",
    profile_rating: "റേറ്റിംഗ്",

    insights_title: "AI വിപണി ഉൾക്കാഴ്ചകൾ",
    insights_subtitle: "മികച്ച തീരുമാനങ്ങൾ എടുക്കാൻ AI-ഉം ഉൾക്കാഴ്ചകൾ",
    insights_all: "എല്ലാ ഉൾക്കാഴ്ചകളും",
    insights_weather: "കാലാവസ്ഥ",
    insights_market: "വിപണി",
    insights_cropHealth: "വിള ആരോഗ്യം",
    insights_optimization: "ഒപ്റ്റിമൈസേഷൻ",
    insights_recommendations: "ശുപാർശകൾ",
    insights_loading: "ഉൾക്കാഴ്ചകൾ ലോഡ് ചെയ്യുന്നു...",
    insights_empty: "ഉൾക്കാഴ്ചകൾ ഒന്നും ലഭ്യമല്ല",
    insights_actionRequired: "നടപടി ആവശ്യം",
    insights_confidence: "ആത്മവിശ്വാസം",
    insights_impact: "സാധ്യമായ ആഘാതം",
    insights_high: "ഉയർന്നത്",
    insights_medium: "മധ്യമം",
    insights_low: "കുറഞ്ഞത്",

    guidance_title: "കൃഷി മാർഗ്ഗദർശനം",
    guidance_subtitle: "മികച്ച കൃഷിക്ക് വിദഗ്ദ്ധർ തിരഞ്ഞെടുത്ത ഉറവിടങ്ങൾ",
    guidance_searchPlaceholder: "ലേഖനങ്ങൾ, വീഡിയോകൾ തിരയുക...",
    guidance_loading: "മാർഗ്ഗദർശനം ലോഡ് ചെയ്യുന്നു...",
    guidance_empty: "ഉറവിടങ്ങൾ ഒന്നും കണ്ടെത്തിയില്ല",
    guidance_bookmark: "ബുക്ക്മാർക്ക്",
    guidance_views: "കാഴ്ചകൾ",
    guidance_all: "എല്ലാം",
    guidance_article: "ലേഖനം",
    guidance_video: "വീഡിയോ",
    guidance_document: "രേഖ",

    browse_title: "വിള ലിസ്റ്റിംഗുകൾ ബ്രൗസ് ചെയ്യുക",
    browse_subtitle: "മാർക്കറ്റ്പ്ലേസിൽ ലഭ്യമായ വിളകൾ കണ്ടെത്തുക",
    browse_searchPlaceholder: "വിളയുടെ പേര് ഉപയോഗിച്ച് തിരയുക...",
    browse_allGrades: "എല്ലാ ഗ്രേഡുകളും",
    browse_loading: "ലിസ്റ്റിംഗുകൾ ലോഡ് ചെയ്യുന്നു...",
    browse_empty: "ലിസ്റ്റിംഗുകൾ ഒന്നും കണ്ടെത്തിയില്ല",
    browse_farmer: "കർഷകൻ",
    browse_qty: "അളവ്",
    browse_price: "വില",
  },
};
