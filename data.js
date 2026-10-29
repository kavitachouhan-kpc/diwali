// Content captured from https://discoverpilgrim.com/ on 2026-10-28 (mobile view).
// Images are served from Pilgrim's Shopify CDN.
const CDN = 'https://discoverpilgrim.com/cdn/shop/files/';
const img = (file, w = 600) => CDN + file + (file.includes('?') ? '&' : '?') + 'width=' + w;

// Product tuple: [handle, image, offer, brandTag, rating, reviews, title, variant, benefit, priceText]
const P = {
  vitcSerum: ['10-vitamin-c-face-serum-for-daily-brightness', '1_cd90a395-adca-4a55-aaef-5f81a2382f80.jpg?v=1764938514', 1, '#1 IN SERUMS', '4.6', '5.4k', '10% Vitamin C Face Serum', '2 sizes', 'Glowing, Brighter Skin in 5 Days*', 'From ₹645'],
  niacSerum: ['10-niacinamide-face-serum-for-acne-marks', '1.1_30a00794-6a3d-4b32-ab0c-6ee1392aaa18.jpg?v=1776666674', 1, '#2 IN SERUMS', '4.6', '5k', '10% Niacinamide Face Serum', '30ml', 'Fades Acne Marks & Spots', '₹649'],
  redensyl: ['3-redensyl-4-anagain-hair-growth-serum', '1_60.jpg?v=1792059437', 1, 'SELLING FAST', '4.7', '7.6k', 'Redensyl & Anagain Hair Growth Serum', '4 sizes', 'New Hair Growth in 28 Days', 'From ₹795'],
  peel: ['25-aha-2-bha-5-pha-peeling-solution', '1_e6841aa2-67fa-4993-aa5a-1eb2e69234bf.jpg?v=1770799215', 1, '💸TRENDING IN SALE', '4.6', '7.7k', '25% AHA 2% BHA 5% PHA Peeling Solution', '2 sizes', '10-Mins Tan Removal', 'From ₹645'],
  hydraGlow: ['korean-rice-water-hydra-glow-moisturizer', '1_d1861101-daf5-4a0f-b1d8-11c061b3b046.jpg?v=1753167116', 1, '#1 IN MOISTURIZERS', '4.7', '447', 'Korean Hydra Glow Moisturizer', '2 sizes', 'Instant Glass Skin Glow', 'From ₹449'],
  hydraDry: ['korean-rice-water-hydra-glow-moisturizer-for-dry-skin', '1.1-WB.jpg?v=1791303495', 1, 'NEW LAUNCH', '4.7', '20', 'Hydra Glow Moisturizer for Dry Skin', '100gm', 'Deep Hydration', '₹449'],
  squalane: ['squalane-glow-moisturizer', '1.2_e9ded1b8-2dd4-4fa1-bfc7-b1efe3b2642b.jpg?v=1762865025', 1, '⚡OFFER BESTSELLER', '4.7', '4.9k', 'Squalane Glow Moisturizer', '50gm', 'Enhances Glow', '₹550'],
  vitcRoll: ['10-vitamin-c-face-serum-roll-on', '1.1.WB.jpg?v=1773923714', 1, 'SELLING FAST', '4.7', '15', '10% Vitamin C Face Serum Roll-On', '25ml', 'Glowing, Brighter Skin in 5 Days*', '₹695'],
  brightSerum: ['alpha-arbutin-vitamin-c-brightening-serum', '1.6_White_background_carton.jpg?v=1776515474', 1, '#3 IN SERUMS', '4.5', '5.6k', 'Brightening Serum', '30ml', 'Reduces Pigmentation', '₹695'],
  vitcMoist: ['australian-kakadu-plum-vitamin-c-brightening-moisturizer', '1.3_065e79f1-d893-4e10-807b-b8e5b7f198cb.jpg?v=1763541825', 1, '#4 IN MOISTURIZERS', '4.9', '250', 'Vitamin C Brightening Moisturizer', '50gm', 'Boosts Glow', '₹345'],
  ddShampoo: ['australian-tea-tree-non-drying-anti-dandruff-shampoo', '1_40.jpg?v=1791548297', 1, '#1 IN SHAMPOOS', '4.7', '781', 'Non-Drying Anti-Dandruff Shampoo', '3 sizes', 'Reduces Visible Flakes From 1st Wash*', 'From ₹399'],
  patuaShampoo: ['patua-keratin-smoothening-shampoo', '1.2_White_background_texture_stamp_1.jpg?v=1791901097', 1, '#2 IN SHAMPOOS', '4.7', '5.6k', 'Keratin & Amazonian Patuá Smoothening Shampoo', '4 sizes', '10X Keratin-Smooth Hair in 1 Wash', 'From ₹399'],
  riceShampoo: ['korean-rice-water-collagen-advanced-damage-repair-shampoo', '1_43.jpg?v=1791548339', 1, '#3 IN SHAMPOOS', '4.7', '67', 'Korean Advanced Damage Repair Shampoo', '3 sizes', 'Restores Damaged Hair', 'From ₹345'],
  hfShampoo: ['redensyl-anagain-hairfall-control-shampoo', '1.2_White_background_stamp_0c7140b0-b681-4c0b-a7f2-aca5aa8ef92b.jpg?v=1772779001', 1, '#4 IN SHAMPOOS', '4.7', '15', 'Hairfall Control Shampoo', '3 sizes', 'Controls Hairfall', 'From ₹399'],
  mentholShampoo: ['australian-tea-tree-non-drying-anti-dandruff-shampoo-cool-menthol', '1_62.jpg?v=1792570636', 1, '#5 IN SHAMPOOS', '4.7', '26', 'Non-Drying Anti-Dandruff Shampoo Cooling Menthol', '2 sizes', 'Reduces Visible Flakes From 1st Wash*', 'From ₹395'],
  arganShampoo: ['sulphate-free-shampoo-with-argan-oil-camellia-white-lotus', '1_49.jpg?v=1791555526', 1, '', '4.6', '302', 'Argan Oil Sulphate Free Shampoo', '2 sizes', 'Cleans Gently', 'From ₹399'],
  rosemaryShampoo: ['spanish-rosemary-biotin-anti-hairfall-shampoo', '1.7_WB_texture.png?v=1792750722', 1, '', '4.8', '365', 'Multi-Protein Serum Anti-Hairfall Shampoo', '3 sizes', 'Visibly Reduces Hairfall', 'From ₹345'],
  ddConditioner: ['australian-tea-tree-anti-dandruff-conditioner', '1_54.jpg?v=1791886637', 1, '', '4.8', '78', 'Anti-Dandruff Conditioner', '200ml', 'Makes Hair Soft', '₹395'],
  riceConditioner: ['korean-rice-water-collagen-advanced-damage-repair-conditioner', '1.1_918593bd-4a44-4798-b740-8d5bf7640cdd.jpg?v=1762757031', 1, 'DAMAGE REPAIR', '4.5', '29', 'Korean Advanced Damage Repair Conditioner', '200ml', 'Nourishes & Softens', '₹395'],
  patuaConditioner: ['patua-keratin-hair-smoothing-conditioner', '1_55.jpg?v=1791886651', 1, '', '4.6', '17', 'Patuá & Keratin Smoothening Conditioner', '200ml', 'Soft & Smooth Hair', '₹400'],
  kajal: ['oh-the-drama-kajal', '03_9b3f639e-17ec-46e3-8d7c-258f69736599.jpg?v=1787653288', 1, 'SELLING FAST', '4.9', '55', 'OH THE DRAMA! Kajal', '', 'Intense Dark Pigment', '₹245'],
  glitterLip: ['glitter-lipstick', '01jumeirahjewel.jpg?v=1773393650', 1, '#1 IN MAKEUP', '4.7', '648', 'Dubai Bling Glitter Lipstick', '7 shades', 'Nourishing & Hydrating', 'From ₹645'],
  serumFoundation: ['dream-matte-serum-foundation', '01.Pure_Ivory_1ffb3c08-e897-47d3-a9ca-9389816dd4ec.jpg?v=1785392595', 1, '#3 IN MAKEUP', '4.9', '250', 'Dream Matte Tinted Serum Foundation', '7 shades', 'Dermat-Approved, Skin-Safe Formula', 'From ₹486 ₹695 30% OFF'],
  bulletLip: ['matte-me-up-bullet-lipstick', '01_CoralEnvy.jpg?v=1782132734', 1, '#2 IN MAKEUP', '4.6', '566', 'Matte Me Up! Serum Bullet Lipstick', '14 shades', 'Lasts All Day Long', 'From ₹416 ₹595 30% OFF'],
  foundationStick: ['dream-matte-foundation-stick', 'Foundation_Stick_120_Light_Vanilla_1._wb.jpg?v=1753449657', 1, 'NEW LAUNCH', '4.9', '49', 'Dream Matte Foundation Stick', '7 shades', '4-in-1 Stick: Conceal, Contour, Highlight & Cover', '₹591 ₹845 30% OFF'],
  lipCrayon: ['the-spanish-collection-lip-crayon', '01_Barely_Nude_04_92ee1b7b-e4e4-44c0-b2e3-c06f2943af6a.jpg?v=1764931958', 1, 'NEW LAUNCH', '4.7', '19', 'Spanish Collection Lip Crayon', '11 shades', 'Infused with Primer Oil to help prevent lines and wrinkles', '₹556 ₹795 30% OFF'],
  frenchBullet: ['the-french-collection-bullet-lipstick', '04._TEXTURE_W_STRIP_ff339155-e674-4c6c-9d46-345483d99caf.jpg?v=1762245827', 1, 'NEW LAUNCH', '4.4', '127', 'The French Collection Bullet Lipstick', '12 shades', 'Superior color payoff in one swipe', '₹661 ₹945 30% OFF'],
  frenchBlush: ['the-french-collection-rosy-delight-liquid-serum-blush', '01_Raspberry_Crepe_04._texture_w_strip.jpg?v=1756068588', 1, 'NEW LAUNCH', '4.6', '14', 'The French Collection Liquid Serum Blush', '5 shades', 'Rich, Creamy Pigment that melts into the skin', '₹416 ₹595 30% OFF'],
  frenchLiquid: ['the-french-collection-liquid-lipstick', '01_Nude_elegance_04._texture_with_strip.jpg?v=1755176036', 1, 'NEW LAUNCH', '4.5', '15', 'French Collection Liquid Lipstick', '14 shades', 'Ultra-Light Matte Finish', '₹626 ₹895 30% OFF'],
  liquidLip: ['matte-me-up-liquid-lipstick-1', 'The-Red-Stiletto-Liquid-Lipstick-Listing-Images-1080x1080-1_fd962098-08d1-4a5f-af3e-8fa661f59b3e.jpg?v=1750911358', 1, '#4 IN MAKEUP', '4.7', '443', 'Matte Me Up! Liquid Lipstick', '11 shades', 'Smooth Glide, Rich Colour', 'From ₹346 ₹495 30% OFF'],
  spanishShadow: ['the-spanish-collection-eyeshadow', '2._wb_w_strip.jpg?v=1750908387', 1, '', '4.8', '17', 'Spanish Collection Eyeshadow', '2 shades', '12-in-1 Palette for Every Mood', '₹661 ₹945 30% OFF'],
  blushDuo: ['the-spanish-collection-blush-duo', 'BlushDuoFlamencoPink1.png?v=1725889619', 1, '', '4.9', '15', 'The Spanish Collection Blush Duo', '2 shades', '2-in-1 Compact Duo', '₹451 ₹645 30% OFF'],
  concealer: ['dream-matte-concealer', '1.wb_w_swatch.jpg?v=1781872289', 1, '', '4.8', '12', 'Dream Matte Concealer', 'Orange - 35', 'Effortless Blending', '₹381 ₹545 30% OFF'],
  facePalette: ['rose-touch-3-in-1-face-palette', 'bhc_01_soft_elegance_01.wb.webp?v=1754376711', 1, 'NEW LAUNCH', '4.6', '22', 'Rosé Touch 3-in-1 Face Palette', '3 shades', '3-in-1 Travel-friendly Face Palette', '₹556 ₹795 30% OFF'],
  frenchShadow: ['the-french-collection-pro-eyeshadow-palette', '04.-TEXTURE-W-STRIP.jpg?v=1757674069', 1, 'NEW LAUNCH', '4.7', '10', 'The French Collection Pro-Eyeshadow', 'Midnight in Paris', '18 Rich, Blendable & Long-Lasting Pigments', '₹1,361 ₹1,945 30% OFF'],
  highlighter: ['the-french-collection-liquid-serum-highlighter', 'RaspberryCrepe14.ModelFrenchCollection5.webp?v=1756450191', 0, '', '4.7', '13', 'The French Collection Liquid Serum Highlighter', 'Sunkiss Gold - 01', 'New Hyper-Gloss Technology', '₹486 ₹695 30% OFF'],
  aloeWash: ['korean-aloe-anti-acne-gel-facewash', '1_e5ab2805-4a27-407b-ba25-54a031e74d4a.jpg?v=1786955069', 1, 'NEW LAUNCH', '4.8', '20', 'Korean Aloe Anti Acne Gel Face Wash', '150ml', 'Reduces Acne', '₹365'],
  detanWash: ['3-aha-bha-pha-detan-gel-face-wash', '1_3_WB_copy_2_1080.jpg?v=1792837033', 1, 'NEW LAUNCH', '4.7', '15', 'Detan Gel Face Wash', '150ml', 'Detans & Brightens', '₹399'],
  vitcSunscreen: ['5-vitamin-c-complex-brightening-serum-sunscreen-spf-50-pa', '1_3_White_background__stripe__copy_1080.jpg?v=1788438161', 1, 'NEW LAUNCH', '4.8', '173', '5% Vitamin C Brightening Serum Sunscreen SPF 50+', '50ml', 'Protects from Sun Damage & Tanning', '₹495'],
  coolSunscreen: ['korean-aloe-cooling-fluid-sunscreen-spf-50-pa', '1.2texture.jpg?v=1790237955', 1, 'IN-VIVO TESTED', '4.4', '144', 'Korean Cooling Fluid Sunscreen SPF 50+', '50ml', '-5° C Cooling Sensation', '₹495'],
  tintSunscreen: ['korean-white-lotus-tinted-sunscreen-spf-50-pa', '1_52e7d395-341b-437f-af70-8dceee20ecce.jpg?v=1750913404', 1, '#4 IN SUNSCREEN', '4.7', '106', 'Korean Tinted Sunscreen SPF 50+', '50ml', 'Natural, Radiant Finish', '₹495'],
  youthDuo: ['the-youthful-skin-duo', '1_6588fd0a-6d8c-4031-b0f5-f19073c5d6f5.jpg?v=1776421933', 1, 'PRICE DROP', '4.7', '6', 'The Youthful Skin Duo', '2 Units', 'Treats Signs of Ageing', '₹1,300'],
  vitc15: ['15-vitamin-c-face-serum-for-advanced-brightness-20-ml', '1.2_13f34e78-2e87-4f0e-9f34-b1c8f3c0818e.jpg?v=1762944223', 1, '#4 IN SERUMS', '4.8', '58', '15% Vitamin C Face Serum', '20ml', 'Boosts Brightness', '₹595'],
  haSunscreen: ['1-hyaluronic-acid-sunscreen-gel-spf-50-pa', '1_e917d630-b191-450c-9cf5-719b35b7b5fa.jpg?v=1751367358', 1, 'SPF PROTECTION', '4.4', '205', '1% Hyaluronic Acid Sunscreen Gel SPF 50', '50gm', 'SPF 50+ PA++++ & Deeply Hydrating', '₹445'],
  redensylRoll: ['3-redensyl-4-anagain-5-capilia-stem-cell-complex-advanced-hair-growth-serum-roll-on', '1_61.jpg?v=1792059478', 1, 'NEW LAUNCH', '4.8', '20', 'Redensyl & Anagain Hair Growth Serum Roll-On', '4 sizes', 'Promotes Hair Growth', '₹795'],
  riceHairSerum: ['korean-rice-water-collagen-advanced-damage-repair-hair-serum-spf-35', '1.1_9d1e0980-3944-4db3-9133-0d3f699f8039.jpg?v=1753786312', 0, '', '4.5', '14', 'Korean Advanced Damage Repair Hair Serum', '100ml', 'Prevents Breakage & Split Ends', '₹595'],
  riceMask: ['korean-rice-water-collagen-advanced-damage-repair-hair-mask', '1_50ab8575-57ac-4c19-acba-89a1ba82e9f3.jpg?v=1779712459', 1, 'DAMAGE REPAIR', '4.6', '33', 'Korean Advanced Damage Repair Hair Mask', '200ml', 'Nourishes & Softens', '₹595'],
  hairPowerhouse: ['redensyl-anagain-the-hair-growth-powerhouse', 'HGS-HCS.jpg?v=1760525149', 1, 'PRICE DROP', '4.8', '19', 'Redensyl + Anagain: The Hair Growth Powerhouse', '2 Units', 'New Hair Growth in 28 Days', '₹1,194'],
  rosemaryWater: ['spanish-rosemary-water-with-biotin', '1_1__WB_texture_1080.jpg?v=1791454695', 1, '', '4.8', '49', 'Rosemary Water With Biotin', '2 sizes', 'Promote Healthier Growth', 'From ₹225'],
  redVineLotion: ['french-red-vine-hyaluronic-acid-ultra-smooth-body-lotion', '1.1_436c6f8b-f001-42f9-9adf-6f671463a0c0.jpg?v=1755082310', 1, '', '4.8', '49', 'Red Vine Ultra-Smooth Body Lotion', '2 sizes', '48H Long - Lasting Moisturization', 'From ₹545'],
  glowLotion: ['spanish-squalane-niacinamide-glow-body-lotion', 'GLOW-BODY-LOTION-DMART-_1080X1080_-1_1_0dceeafb-a4ee-4b24-ab8a-b7c4d250b398.jpg?v=1750905297', 1, '', '4.8', '79', 'Squalane & Niacinamide Glow Body Lotion', '400ml', '48H Long - Lasting Moisturization', '₹545'],
  vitcLotion: ['vitamin-c-body-serum-lotion-kakadu-plum-lime-pearl', 'VITAMIN_C_BODY_SERUM_LOTION_Kakadu_Plum_Lime_Pearl_1_199a9fc7-f61c-4cbc-b55e-c36278744e6b.jpg?v=1761916057', 0, '', '4.8', '53', 'Vitamin C Body Serum Lotion', '150ml', 'Evens Skin Tone', '₹400'],
  // Sets
  patuaCombo: ['patua-haircare-combo', '1_6aa30e3b-d777-4174-a76e-d5b399431966.jpg?v=1773124513', 1, 'PRICE DROP', '4.8', '10', 'Patuá Haircare Combo', '3 Units', '10X Smoother Hair In 1 Wash', '₹1,349'],
  vitcDuo: ['vitamin-c-glow-power-duo', '1.wb_4072c872-b4b0-424c-a079-5c136011ebaa.jpg?v=1781792776', 1, 'PRICE DROP', '4.1', '166', 'Vitamin C Glow Power Duo', '2 Units', 'Glowing, Brighter Skin in 5 Days', '₹895'],
  flawlessBase: ['flawless-base-must-haves', '1..jpg?v=1767098414', 1, 'PRICE DROP', '4.8', '14', 'Flawless Base Must-Haves', '2 Units', 'Get An Instant Rosy Glow', '₹990'],
  glowTrio: ['glow-renewal-trio', '1_d2d41c62-7c24-4caf-9520-cb6cc32fb5a7.jpg?v=1761720224', 1, 'PRICE DROP', '4.7', '10', 'Glow Renewal Trio', '3 Units', 'Treats Signs of Ageing', '₹1,349'],
  brightCombo: ['brightening-serum-face-cream-combo', '1.wb_7a716a91-8ea5-4d17-8f87-78fa3d17345d.jpg?v=1777372214', 1, 'PRICE DROP', '4.7', '13', 'Brightening Serum & Face Cream Combo', '2 Units', 'Reduces Pigmentation', '₹1,195'],
  allDayGlow: ['all-day-glow-combo', '1_f7a63258-3d6e-407a-a7f1-2bd1050ce7b2.jpg?v=1773124675', 1, 'PRICE DROP', '4.8', '12', 'All-Day Glow Combo', '2 Units', 'Brightens Skin', '₹945'],
  dailyGlowTrio: ['daily-glow-trio', '1.wb_de5804de-d741-4419-a11d-b83aefd3b25e.jpg?v=1776688348', 1, 'PRICE DROP', '4.8', '10', 'Daily Glow Trio', '3 Units', '72H Hydrated Skin', '₹1,348'],
  retinolCombo: ['jeju-night-renew-face-ritual', '1.wb_f80c7714-94a4-4e1c-80c8-a47dae918183.jpg?v=1772714200', 0, '', '4.3', '22', 'Retinol Night Skincare Combo', '2 Units', 'Reduces fine lines', '₹1,100'],
  goldKit: ['24k-gold-facial-kit-for-golden-glow', 'White-Background-_1000x1000_ffe9d8df-215f-44bb-89cb-d4868fbd57c1.jpg?v=1750885330', 0, '', '4.9', '31', '24K Gold Facial Kit For Golden Glow', '', 'Restores Natural Glow Instantly', '₹595'],
  goldCombo: ['the-24k-gold-glow-combo', '1.wb_1ad2a95f-aef8-468f-9c36-cb10e7c3bb7d.jpg?v=1773124856', 0, '', '4.6', '8', 'The 24k Gold Glow Combo', '2 Units', 'Enhances Natural Glow', '₹1,090'],
  dayNight: ['day-night-combo-with-french-red-vine', '1_8a80cd24-6a20-4df5-946d-c41017c3b7fc.jpg?v=1772793313', 1, 'PRICE DROP', '5.0', '7', 'Day/Night Combo With French Red Vine', '2 Units', 'Makes Visibly Younger', '₹1,200'],
  goldSkinKit: ['24k-gold-skincare-kit', '1.WB_7dd9f8a2-b862-4d84-b5a2-37e386c75115.jpg?v=1777026868', 1, 'PRICE DROP', '4.8', '4', '24K Gold Skincare Kit', '2 Units', 'Enhances Natural Glow', '₹1,290'],
  kbeautyKit: ['korean-beauty-daily-glow-kit', '1.wb_e6fa5a08-87d5-470e-8534-df451fe24aec.jpg?v=1777372302', 0, '', '4.9', '14', 'Korean Beauty Daily Glow Kit', '3 Units', 'Skin Brightening', '₹1,150'],
  ultimateGold: ['the-ultimate-24k-gold-skincare-combo', '1.wb_f9cbf5e2-eb8f-441e-8ddd-da323de6be71.jpg?v=1773124754', 1, 'PRICE DROP', '4.7', '12', 'The Ultimate 24k Gold Skincare Combo', '2 Units', 'Gives Luxurious Glow', '₹1,490'],
  regrowthKit: ['hair-regrowth-kit', '1.wb_88c2d3b3-cee0-4498-b4b5-e3d48a16014a.jpg?v=1779712724', 0, '', '4.5', '12', 'Hair Regrowth Kit', '3 Units', 'Promotes Hair Growth', '₹1,739'],
  arganMaskCombo: ['argan-oil-camellia-white-lotus-shampoo-hair-mask-combo', '1_97a6e736-ad71-4945-8e66-9377b550d0d6.jpg?v=1788855808', 1, 'PRICE DROP', '4.8', '10', 'Sulphate Free Shampoo & Argan Oil Hair Mask', '2 Units', 'Promotes Growth', '₹1,049'],
  arganCondCombo: ['sulphate-free-shampoo-argan-oil-conditioner', 'Combo.jpg?v=1789028445', 1, 'PRICE DROP', '4.7', '12', 'Sulphate Free Shampoo & Argan Oil Conditioner', '2 Units', 'Shiny Hair', '₹799'],
  kbeautyHair: ['k-beauty-shampoo-conditioner-combo-1', '1_db33808e-2cbe-430e-9ca2-d5f3fa3cf0ab.jpg?v=1777278616', 1, 'PRICE DROP', '4.4', '16', 'K-Beauty Shampoo + Conditioner Combo', 'Shampoo + Conditioner', 'Repairs Hair Damage', '₹745'],
  rosemaryCombo: ['spanish-rosemary-biotin-anti-hairfall-shampoo-conditioner-combo', '1.1_pack_2.jpg?v=1792750737', 1, 'PRICE DROP', '4.9', '36', 'Rosemary Anti-Hairfall Combo', 'Shampoo + Conditioner', 'Reduces Hairfall', '₹744'],
  patuaMaskCombo: ['patua-keratin-smoothening-shampoo-hair-mask', 'ChatGPT_Image_Aug_6_2026_03_09_47_PM.png?v=1786011966', 1, '', '4.9', '20', 'Patuá & Keratin Smoothening Shampoo & Hair Mask', '2 Units', 'Deep Hydration', '₹949'],
};

const DATA = {
  heroMobile: '24HoursSale_RubyFling_MobileHomepageBanner_1000x650px_28Oct.gif?v=1793110829',
  heroDesktop: '24HoursSale_RubyFling_HomepageDesktopBanner_1920x520px_28Oct.gif?v=1793110841',
  saleEnds: '2026-10-28T20:00:00+05:30',

  shopByCategories: [
    ['Hair-Care-Rashmika-400x560_6fd816d0-e889-4d02-ad8b-8caad17961f1.png?v=1742470624', '/collections/hair-care', 'Hair Care'],
    ['Skin-Care-400x560_b94a6807-7625-463a-b593-0537e8dcfb57.png?v=1742470624', '/collections/face-care', 'Skin Care'],
    ['Makeup-400x560_1d74dd34-33c7-4bc1-8fa7-6f2b122ba5b5.png?v=1742470624', '/collections/makeup', 'Makeup'],
    ['Body-Care-400x560_bc79e780-c17e-483c-bf22-a88a0e4af8fe.png?v=1742470624', '/collections/body-lotion', 'Body Care'],
    ['Combo_400x560_ee13f920-7318-413f-9de2-3d5b4049911f.png?v=1784888680', '/collections/bestseller-combos', 'Combos'],
    ['Monsoon-Essentials_400x560_c9de8b92-5ff5-450c-bc56-18ced79f48fc.png?v=1780410434', '/collections/monsoon-essentials-1', 'Monsoon Essentials'],
    ['New-Launches-400x560_1.png?v=1776256290', '/collections/new-launch', 'New Launches'],
    ['Bestsellers-400x560_1b724a88-30dd-4de0-81e1-dac40b1a678b.png?v=1760700970', '/collections/bestsellers', 'Bestsellers'],
  ],

  trending: {
    title: 'Trending Now', sub: 'Curated just for you!', cta: 'View All',
    tabs: [
      ['Bestsellers', '/collections/bestsellers', ['vitcSerum', 'niacSerum', 'redensyl', 'peel', 'hydraGlow', 'hydraDry', 'squalane', 'vitcRoll']],
      ['Skin Care', '/collections/skincare-bestsellers', ['vitcSerum', 'niacSerum', 'brightSerum', 'squalane', 'peel', 'hydraDry', 'hydraGlow', 'vitcMoist']],
      ['Hair Care', '/collections/hair-care', ['redensyl', 'ddShampoo', 'patuaShampoo', 'riceShampoo', 'hfShampoo', 'mentholShampoo', 'arganShampoo', 'rosemaryShampoo']],
      ['Makeup', '/collections/makeup', ['kajal', 'glitterLip', 'serumFoundation', 'bulletLip', 'foundationStick', 'lipCrayon', 'frenchBullet', 'frenchBlush']],
    ],
  },

  rosemaryBanner: {
    mobile: 'RosemaryShampoo2_6.jpg?v=1785745394', desktop: 'RosemaryShampoo2_3.jpg?v=1785738315',
    href: '/products/spanish-rosemary-biotin-anti-hairfall-shampoo',
  },

  buy2pay1: [
    ['TheDynamicDuo_10NiacinamideFaceSerum_BOGO_1000x1400px.jpg?v=1783009545', 'The Dynamic Duo'],
    ['ThePoreFectionists_10_NiacinamideFaceSerum_PeelingSolution_BOGO_1000x1400px.jpg?v=1783009619', 'The Pore-Fectionists'],
    ['GlowLikeAFineVine_RedVineFaceSerum_RedVineNightGelCream_BOGO_1000x1400px_1.jpg?v=1789978756', 'Glow Like a Fine Wine'],
    ['24kGoldenGlows_24kGoldSerum_24kGoldFace_Mask_BOGO_1000x1400px.jpg?v=1789978770', '24K Golden Glow'],
  ],

  makeupFest: {
    title: 'Pilgrim Makeup Fest', sub: 'Flat 30% OFF + Buy 1 Get 1 FREE', cta: 'View All',
    tabs: [['', '/collections/makeup-offers', ['frenchLiquid', 'liquidLip', 'spanishShadow', 'blushDuo', 'lipCrayon', 'concealer', 'frenchBullet', 'facePalette']]],
  },

  monsoon: {
    title: 'Monsoon Essentials', sub: 'Protect. Nourish. Glow.', cta: 'View All',
    tabs: [['', '/collections/monsoon-essentials-1', ['ddShampoo', 'patuaShampoo', 'riceShampoo', 'ddConditioner', 'riceConditioner', 'patuaConditioner', 'mentholShampoo', 'rosemaryShampoo']]],
  },

  monsoonBanner: { mobile: 'MonsoonMustHaves_HomepageBanner_Mobile_1000x650_fb90d58b-96d7-43e7-a9ee-1cd5b790cfcc.jpg?v=1784715884', href: '/collections/shampoos' },

  ingredientOfWeek: {
    name: 'Spanish Rosemary', href: '/collections/spanish-rosemary',
    slides: ['1_7128e286-c5a7-49a8-a84b-f5c1ab6f2b60.jpg?v=1792073849', '2_f38b9240-fe0d-469d-b4a8-144b6745a8a6.jpg?v=1792073862', '3_13b553e2-9474-4af0-9cdb-54a4c8bc763c.jpg?v=1792073833'],
  },

  lookingFor: [
    ['Bright-Skin-500x500.png?v=1732700599', '/collections/brightening-illuminating', 'Bright Skin'],
    ['Dandruff-free-Scalp-500x500.png?v=1732700599', '/collections/tea-tree-hair', 'Dandruff-free Scalp'],
    ['Hydrated-Skin-500x500_290764b7-407c-4f59-a820-f0a8972ee609.png?v=1738132629', '/collections/hydration', 'Hydrated Skin'],
    ['Voluminous-Hair-500x500_c9c34271-d4b2-4d26-adfc-8540bc0dd328.png?v=1738132660', '/collections/hair-fall-hair-growth', 'Voluminous Hair'],
    ['Youthful-Radiance-500x500_f656fef7-db5e-4e21-bcc6-8edbb368c7db.png?v=1738132689', '/collections/anti-ageing', 'Youthful Radiance'],
    ['Healthy_-Shiny-Hair-500x500.png?v=1732700600', '/collections/dry-frizzy-hair', 'Healthy, Shiny Hair'],
    ['Everyday-Glow-500x500.png?v=1732700599', '/collections/face', 'Everyday Glow'],
    ['Glamorous-Look-500x500.png?v=1732700600', '/collections/eyes', 'Glamorous Look'],
  ],

  skincareMakeup: {
    title: 'Skincare Infused Makeup', sub: 'Makeup Crafted for Skin', cta: 'View All',
    tabs: [['', '/collections/makeup', ['kajal', 'glitterLip', 'serumFoundation', 'bulletLip', 'foundationStick', 'lipCrayon', 'frenchBullet', 'frenchBlush']]],
  },

  newArrivals: {
    title: 'New Arrivals', sub: 'Shop the Latest & Greatest', cta: 'See all',
    tabs: [
      ['All New Arrivals', '/collections/new-launch', ['hydraDry', 'aloeWash', 'detanWash', 'mentholShampoo', 'vitcSunscreen', 'vitcRoll', 'frenchBullet', 'frenchShadow']],
      ['Skin Care', '/collections/face-care-new-arrivals', ['detanWash', 'coolSunscreen', 'tintSunscreen', 'vitcSerum', 'youthDuo', 'vitc15', 'niacSerum', 'haSunscreen']],
      ['Makeup', '/collections/makeup-new-arrivals', ['kajal', 'frenchBullet', 'frenchLiquid', 'frenchShadow', 'facePalette', 'frenchBlush', 'foundationStick', 'highlighter']],
      ['Hair Care', '/collections/hair-care-new-arrivals', ['redensylRoll', 'riceHairSerum', 'riceShampoo', 'patuaShampoo', 'riceMask', 'hairPowerhouse', 'ddShampoo', 'rosemaryWater']],
      ['Body Care', '/collections/body-lotion', ['redVineLotion', 'glowLotion', 'vitcLotion']],
    ],
  },

  sets: {
    title: 'Save with Sets', sub: 'Curated Sets for Amazing Results', cta: 'See all',
    tabs: [
      ['Bestsellers', '/collections/bestseller-combos', ['patuaCombo', 'vitcDuo', 'flawlessBase', 'glowTrio', 'youthDuo', 'brightCombo', 'allDayGlow', 'dailyGlowTrio']],
      ['Skin Care', '/collections/bestseller-combo-sets-skincare', ['retinolCombo', 'goldKit', 'goldCombo', 'dayNight', 'goldSkinKit', 'kbeautyKit', 'youthDuo', 'ultimateGold']],
      ['Hair Care', '/collections/bestseller-combos', ['regrowthKit', 'arganMaskCombo', 'arganCondCombo', 'hairPowerhouse', 'kbeautyHair', 'rosemaryCombo', 'patuaMaskCombo']],
    ],
  },

  videos: [
    ['https://discoverpilgrim.com/cdn/shop/videos/c/vp/99080e588aae43b996b3eb6258ed6d35/99080e588aae43b996b3eb6258ed6d35.HD-1080p-7.2Mbps-76919748.mp4?v=0', 'vit-c-thumbnail.png?v=1772440541', 'vitcSunscreen'],
    ['https://discoverpilgrim.com/cdn/shop/videos/c/vp/6e0df1ddc3f940aaa7eec16cc00bfabf/6e0df1ddc3f940aaa7eec16cc00bfabf.HD-1080p-7.2Mbps-76919651.mp4?v=0', 'niacinamide_sunscreen_-_thumbnail_1.png?v=1772440526', ['5-niacinamide-hydra-glow-gel-sunscreen', '1.7_1.jpg?v=1770978987', 1, '', '', '', '5% Niacinamide Hydra Glow Gel Sunscreen SPF 50+', '', '', '₹495']],
    ['https://discoverpilgrim.com/cdn/shop/videos/c/vp/037d4e47ff144b26b122e40de711e83b/037d4e47ff144b26b122e40de711e83b.HD-1080p-7.2Mbps-76920139.mp4?v=0', 'patua_shampoo-thumbnail_1.png?v=1772440512', 'patuaShampoo'],
    ['https://discoverpilgrim.com/cdn/shop/videos/c/vp/8a0e15dccf2d47c3b680afac5dbbbe58/8a0e15dccf2d47c3b680afac5dbbbe58.HD-1080p-7.2Mbps-64527610.mp4?v=0', 'vit-c2.0_thumbnail.png?v=1764924102', 'vitcSerum'],
    ['https://discoverpilgrim.com/cdn/shop/videos/c/vp/2018057654984c2bbbe7dc66fab53753/2018057654984c2bbbe7dc66fab53753.HD-1080p-7.2Mbps-64527849.mp4?v=0', '', 'redensyl'],
  ],

  shopByCategory: [
    ['Hair-Serums-248x-332_e0140f9a-92ee-43ce-a443-0fc58ab43d55.png?v=1760700995', '/collections/hair-serums', 'Hair Serums'],
    ['Shampoos-W-248-H-332_560fc5d0-fc72-4852-afa6-3e50e9199491.png?v=1791375522', '/collections/shampoos', 'Shampoos'],
    ['Hair-Masks-248x332_46eb259c-74b4-4598-b6b0-3d8115453236.png?v=1787034135', '/collections/hair-masks', 'Hair Masks'],
    ['Moisturizer-W-248-H-332_aac8827d-b75d-47b6-a9f6-f3150ab31ec5.png?v=1772433373', '/collections/day-creams', 'Moisturizers'],
    ['Sunscreens-W-248-H-332_2.png?v=1791375494', '/collections/sunscreen', 'Sunscreens'],
    ['Face-Serums-W-248-H-332_2d9b6d7f-79dc-4981-9f76-9bbeff3f9d4e.png?v=1791375510', '/collections/face-serums', 'Face Serums'],
    ['Face-W-248-H-332_5b4e397a-7d03-446e-a685-42da9a41bf38.png?v=1772433354', '/collections/face', 'Makeup - Face'],
    ['Eyes-W-248-H-332_2c5a4653-c1d6-484e-9ef4-2d5f81585810.png?v=1753872714', '/collections/eyes', 'Makeup - Eyes'],
    ['Lips-W-248-H-332_cc59fdff-af59-4287-a565-a94effa85525.png?v=1753865513', '/collections/lips', 'Makeup - Lips'],
  ],

  ingredients: [
    ['Ceramides_500x500_582fb1e8-225c-439f-bf41-cb7e8c2d19e3.png?v=1750909244', '/collections/ceramides', 'Ceramides'],
    ['Vitamin-C_1.png?v=1729245570', '/collections/vitamin-c', 'Vitamin C'],
    ['Niacinamide_1.png?v=1729245570', '/collections/clarifying-niacinamide', 'Niacinamide'],
    ['tea-tree_1.png?v=1729246424', '/collections/tea-tree-hair', 'Tea Tree'],
    ['Redensyl_1.png?v=1729246424', '/collections/redensyl', 'Redensyl'],
    ['Squalane_1.png?v=1750904541', '/collections/ultra-hydrating-squalane', 'Squalane'],
    ['Salicylic-Acid_1.png?v=1729245570', '/collections/powerful-salicylic-acid', 'Salicylic Acid'],
    ['Red-Vine_1.png?v=1729245570', '/collections/anti-ageing-with-red-vine-extracts', 'Red Vine'],
    ['Hyaluronic-Acid_1.png?v=1729245570', '/collections/hydrating-hyaluronic-acid', 'Hyaluronic Acid'],
    ['Rosemary_1.png?v=1729246424', '/collections/spanish-rosemary', 'Rosemary'],
    ['Retinol_1.png?v=1729245570', '/collections/renew-with-retinol', 'Retinol'],
  ],

  celebs: [
    ['Rashmika-Fav-1080x1080.jpg?v=1750900457', '/collections/rashmikas-fav', "Rashmika's Favourite"],
    ['Jennifer_CelebMust-Haves_1080x1080px.jpg?v=1750909181', '/collections/jennifers-fav', "Jennifer's Favourite"],
    ['Manisha-Picks-1080x1080_1.jpg?v=1750901860', '/collections/manishas-curation', "Manisha's Curation"],
  ],

  promise: {
    image: 'Pilgrim_Code_1080x1080_2.png?v=1784550256',
    html: 'Pilgrim is "Clean Compatible". Not just <strong>free of harmful and toxic chemicals</strong> but uses only those ingredients that either enhance the health of our hair &amp; skin or support the <strong>effectiveness of formulations</strong>.',
  },

  testimonials: [
    ['Testimonial-1080x1300-2.png?v=1781778494', '/products/10-vitamin-c-face-serum-for-daily-brightness'],
    ['Testimonial-1080x1300-1.png?v=1781778434', '/products/korean-rice-water-hydra-glow-moisturizer'],
    ['Testimonial-1080x1300-4.png?v=1781778448', '/products/patua-keratin-smoothening-shampoo'],
    ['Testimonial-1080x1300-3.png?v=1781778462', '/products/sulphate-free-shampoo-with-argan-oil-camellia-white-lotus'],
    ['Testimonial-1080x1300-5.png?v=1781778477', '/products/glitter-lipstick'],
  ],

  footerStrip: 'WBCS-Strip-800x160_1_f05cee62-7c15-47af-9c8b-61e3ba4d010e.png?v=1756723907',
  logo: 'Pilgrim-New-Logo-Without-Tagline_a9de71c3-9c1c-4a33-b4eb-95830dab01db.png?v=1750912299',

  footer: {
    INFORMATION: [['Track your order', '/pages/track-order'], ['About Us', '/pages/about-us'], ['Contact Us', '/pages/contact'], ['FAQ', '/pages/faq'], ['Careers', '/pages/careers'], ['Corporate Gifting', '/pages/corporate-gifting'], ['Store Locator', '/pages/store-locator']],
    'IMPORTANT LINKS': [['Shipping & Returns', '/policies/shipping-policy'], ['Terms & Conditions', '/policies/terms-of-service'], ['Privacy Policy', '/policies/privacy-policy'], ['Refund Policy', '/policies/refund-policy'], ['Download App', '/pages/app', 'EXCLUSIVE PERKS'], ['Blogs', '/blogs/news'], ['Customer Love', '/pages/love-wall'], ['Pilgrim T-shirts', '/collections/t-shirts']],
  },

  menu: [
    ['Best sellers', '/collections/bestsellers'],
    ['Skin Care', '/collections/face-care', ['Face Creams & Moisturisers', 'Sunscreen', 'Face Wash', 'Face Serum', 'Face Mask & Scrub', 'Face Mist & Toner', 'Night Cream', 'Under Eye Cream', 'Body Lotion', 'Facial Kit', 'Face Peel', 'Lip Balm']],
    ['Hair Care', '/collections/hair-care', ['Dandruff Control', 'Hair Fall & Hair Growth', 'Pollution Defence', 'Dry & Frizzy Hair', 'Damage Repair', 'Hair Spa', 'Redensyl', 'Korean Rice Water', 'Tea Tree', 'Rosemary', 'Patuá']],
    ['Makeup', '/collections/makeup', ['Foundation', 'Concealer', 'BB Cream', 'Blush', 'Highlighter', 'Loose Powder', 'Setting Spray', 'Primer', 'Kajal', 'Eyeliner', 'Mascara', 'Eyeshadow', 'Lipsticks']],
    ['Shop By Collection', '/collections/all', ['The French Collection', 'The Spanish Collection', 'Dream Matte Collection', 'Viral on Instagram']],
    ['Combos', '/collections/bestseller-combos'],
    ['New Launches', '/collections/new-launch'],
  ],

  searchHints: ['Lipsticks', 'Face Wash', 'Shampoo', 'Sunscreen', 'Vitamin C Serum', 'Hair Growth Serum'],
};
