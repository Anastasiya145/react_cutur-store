-- =============================================
-- ПРОСТОЕ СОЗДАНИЕ НЕДОСТАЮЩИХ ЦВЕТОВЫХ ВАРИАНТОВ
-- =============================================

-- Проверяем какие товары нужно создать
SELECT 
    'НУЖНО СОЗДАТЬ:' as status,
    id || ' -> недостающие цвета из colors_available' as info
FROM products 
WHERE jsonb_array_length(colors_available) > 1;

-- =============================================
-- СОЗДАЕМ НЕДОСТАЮЩИЕ ВАРИАНТЫ:
-- =============================================

-- 1. Bavoir Claudine froufrous - создаем blanc вариант
INSERT INTO products (
    id, name, color, price, discount, final_price, material, category,
    created_at, updated_at, main_image, items_left, images, colors_available, description
)
SELECT 
    'bavoir-claudine-froufrous-blanc',
    name, 'blanc', price, discount, final_price, material, category,
    created_at, updated_at, main_image, 0, images, colors_available, description
FROM products 
WHERE id = 'bavoir-claudine-froufrous-vert'
AND NOT EXISTS (SELECT 1 FROM products WHERE id = 'bavoir-claudine-froufrous-blanc');

-- 2. Bavoir marguerite - создаем vert и blanc варианты  
INSERT INTO products (
    id, name, color, price, discount, final_price, material, category,
    created_at, updated_at, main_image, items_left, images, colors_available, description
)
SELECT 
    'bavoir-marguerite-vert',
    name, 'vert', price, discount, final_price, material, category,
    created_at, updated_at, main_image, 0, images, colors_available, description
FROM products 
WHERE id = 'bavoir-marguerite-rose'
AND NOT EXISTS (SELECT 1 FROM products WHERE id = 'bavoir-marguerite-vert');

INSERT INTO products (
    id, name, color, price, discount, final_price, material, category,
    created_at, updated_at, main_image, items_left, images, colors_available, description
)
SELECT 
    'bavoir-marguerite-blanc',
    name, 'blanc', price, discount, final_price, material, category,
    created_at, updated_at, main_image, 0, images, colors_available, description
FROM products 
WHERE id = 'bavoir-marguerite-rose'
AND NOT EXISTS (SELECT 1 FROM products WHERE id = 'bavoir-marguerite-blanc');

-- 3. Bavoir Claudine - создаем vert и blanc варианты
INSERT INTO products (
    id, name, color, price, discount, final_price, material, category,
    created_at, updated_at, main_image, items_left, images, colors_available, description
)
SELECT 
    'bavoir-claudine-vert',
    name, 'vert', price, discount, final_price, material, category,
    created_at, updated_at, main_image, 0, images, colors_available, description
FROM products 
WHERE id = 'bavoir-claudine-orange'
AND NOT EXISTS (SELECT 1 FROM products WHERE id = 'bavoir-claudine-vert');

INSERT INTO products (
    id, name, color, price, discount, final_price, material, category,
    created_at, updated_at, main_image, items_left, images, colors_available, description
)
SELECT 
    'bavoir-claudine-blanc',
    name, 'blanc', price, discount, final_price, material, category,
    created_at, updated_at, main_image, 0, images, colors_available, description
FROM products 
WHERE id = 'bavoir-claudine-orange'
AND NOT EXISTS (SELECT 1 FROM products WHERE id = 'bavoir-claudine-blanc');

-- 4. Bavoir boutonné - создаем blanc вариант
INSERT INTO products (
    id, name, color, price, discount, final_price, material, category,
    created_at, updated_at, main_image, items_left, images, colors_available, description
)
SELECT 
    'bavoir-boutonne-blanc',
    name, 'blanc', price, discount, final_price, material, category,
    created_at, updated_at, main_image, 0, images, colors_available, description
FROM products 
WHERE id = 'bavoir-boutonne-vert'
AND NOT EXISTS (SELECT 1 FROM products WHERE id = 'bavoir-boutonne-blanc');

-- =============================================
-- ИТОГОВАЯ ПРОВЕРКА:
-- =============================================

SELECT 
    regexp_replace(id, '-[a-z]+$', '') as base_product,
    color,
    items_left,
    CASE WHEN items_left > 0 THEN '✅ В наличии' ELSE '❌ Нет в наличии' END as status
FROM products 
WHERE name LIKE '%Bavoir%'
ORDER BY base_product, 
         CASE color 
             WHEN 'vert' THEN 1 
             WHEN 'blanc' THEN 2 
             WHEN 'rose' THEN 3 
             WHEN 'orange' THEN 4 
             ELSE 5 
         END;