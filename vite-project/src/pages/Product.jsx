import React, { useEffect } from 'react';
import { Layout, Row, Col, Select, Typography, Spin, ConfigProvider, Button, Badge, Space } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '../store/productStore';
import { useCategoryStore } from '../store/categoryStore';
import { useCartStore } from '../store/cartStore';
import ProductCard from '../components/ProductCard';

const { Content } = Layout;
const { Title } = Typography;

const ProductPage = () => {
  const navigate = useNavigate();
  const { products, getProducts, loading } = useProductStore();
  const { categories, getCategories } = useCategoryStore();
  const addToCart = useCartStore((state) => state.addToCart);
  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#6366f1' } }}>
      <Layout style={{ minHeight: '100vh', background: 'radial-gradient(circle at top right, #1e1e2f, #0f0f1a)', padding: '40px 20px' }}>
        <Content style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <Title level={2} style={{ color: '#fff', margin: 0 }}>КАТАЛОГ</Title>
            
            <Space size="large">
              <Select
                placeholder="Категории"
                style={{ width: 220 }}
                onChange={(value) => getProducts(value)}
                allowClear
              >
                <Select.Option value="all">Все товары</Select.Option>
                {categories.map(cat => (
                  <Select.Option key={cat._id} value={cat._id}>{cat.title}</Select.Option>
                ))}
              </Select>

              <Badge count={cart.length}>
                <Button 
                  icon={<ShoppingCartOutlined />} 
                  onClick={() => navigate('/cart')}
                  type="primary"
                >
                  Корзина
                </Button>
              </Badge>
            </Space>
          </div>

          {loading ? <div style={{textAlign: 'center', marginTop: 50}}><Spin size="large" /></div> : (
            <Row gutter={[24, 24]}>
              {products.map(item => (
                <Col xs={24} sm={12} md={8} lg={6} key={item._id || item.id}>
                  <ProductCard product={item} onAddToCart={addToCart} />
                </Col>
              ))}
            </Row>
          )}
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default ProductPage;