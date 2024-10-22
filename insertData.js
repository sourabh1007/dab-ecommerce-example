const { CosmosClient } = require('@azure/cosmos');

// Set up your Cosmos DB account URI and key
const endpoint = 'https://<your-cosmos-db-account>.documents.azure.com:443/'; // Replace with your Cosmos DB URI
const key = '<your-primary-key>'; // Replace with your primary key
const databaseId = 'ecommerce';
const productContainerId = 'products';
const userContainerId = 'users';

const client = new CosmosClient({ endpoint, key });

const products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop for professionals',
    price: 1500,
    category: 'Electronics',
    stock: 200,
    imageUrl: 'https://example.com/laptop.jpg',
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest smartphone with cutting-edge features',
    price: 800,
    category: 'Electronics',
    stock: 300,
    imageUrl: 'https://example.com/smartphone.jpg',
  },
  // Add more product entries here
  {
    id: '100',
    name: 'Headphones',
    description: 'Wireless headphones with noise cancellation',
    price: 200,
    category: 'Accessories',
    stock: 150,
    imageUrl: 'https://example.com/headphones.jpg',
  }
];

const users = [
  {
    id: 'user1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    cart: [],
    orders: []
  },
  {
    id: 'user2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    password: 'password456',
    cart: [],
    orders: []
  },
  // Add more user entries here
];

// Create database and containers if they don't exist
async function setupDatabase() {
  await client.databases.createIfNotExists({ id: databaseId });
  console.log(`Database '${databaseId}' is ready.`);
  
  await client.database(databaseId).containers.createIfNotExists({ id: productContainerId });
  console.log(`Container '${productContainerId}' for products is ready.`);
  
  await client.database(databaseId).containers.createIfNotExists({ id: userContainerId });
  console.log(`Container '${userContainerId}' for users is ready.`);
}

// Insert products into the database
async function insertProducts() {
  const container = client.database(databaseId).container(productContainerId);

  for (const product of products) {
    try {
      await container.items.upsert(product);
      console.log(`Product inserted: ${product.name}`);
    } catch (error) {
      console.error(`Failed to insert product: ${product.name}`, error.message);
    }
  }
}

// Insert users into the database
async function insertUsers() {
  const container = client.database(databaseId).container(userContainerId);

  for (const user of users) {
    try {
      await container.items.upsert(user);
      console.log(`User inserted: ${user.name}`);
    } catch (error) {
      console.error(`Failed to insert user: ${user.name}`, error.message);
    }
  }
}

async function main() {
  try {
    await setupDatabase();
    await insertProducts();
    await insertUsers();
    console.log('Data insertion completed.');
  } catch (error) {
    console.error('Error inserting data into Cosmos DB:', error.message);
  }
}

main();
