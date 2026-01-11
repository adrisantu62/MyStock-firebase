# Login to get JWT token
curl -X POST https://your-firebase-project-id.herokuapp.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "your-email@example.com", "password": "your-password"}'

# Get all products (requires authentication)
curl -X GET https://your-firebase-project-id.herokuapp.com/api/products \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Create a new product (requires admin role)
curl -X POST https://your-firebase-project-id.herokuapp.com/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"name": "Product Name", "price": 99.99, "category": "category-id"}'

# Update a product (requires admin role)
curl -X PUT https://your-firebase-project-id.herokuapp.com/api/products/123 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"name": "Updated Product Name", "price": 89.99}'

# Delete a product (soft delete, requires admin role)
curl -X DELETE https://your-firebase-project-id.herokuapp.com/api/products/123 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Get all categories (requires authentication)
curl -X GET https://your-firebase-project-id.herokuapp.com/api/categories \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Create a new category (requires admin role)
curl -X POST https://your-firebase-project-id.herokuapp.com/api/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"name": "Electronics", "description": "Electronic devices and accessories"}'