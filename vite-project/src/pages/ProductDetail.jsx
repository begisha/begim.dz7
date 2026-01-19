import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout, Button, Typography, Card, Row, Col, Spin, message } from 'antd';
import { ArrowLeftOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { api } from '../api/axios';
import { useCartStore } from '../store/cartStore';

const { Title, Paragraph } = Typography;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(() => message.error('Товар не найден'));
  }, [id]);

  if (!product) return <div style={{ textAlign: 'center', paddingTop: 100 }}><Spin size="large" /></div>;

  return (
    <Layout style={{ minHeight: '100vh', background: '#0f0f1a', padding: '40px 20px' }}>
      <Button 
        icon={<ArrowLeftOutlined />} 
        onClick={() => navigate(-1)} 
        style={{ marginBottom: 20, background: 'transparent', color: '#fff', border: '1px solid #333' }}
      >
        Назад
      </Button>
      <Card bordered={false} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 24 }}>
        <Row gutter={[40, 40]}>
          <Col xs={24} md={12}>
            <img src={product.image} style={{ width: '100%', borderRadius: 16 }} alt={product.title} />
          </Col>
          <Col xs={24} md={12}>
            <Title style={{ color: '#fff' }}>{product.title}</Title>
            <Title level={2} style={{ color: '#6366f1' }}>{product.price}$</Title>
            <Paragraph style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16 }}>
              {product.description}
            </Paragraph>
            <Button 
              type="primary" 
              size="large" 
              icon={<ShoppingCartOutlined />} 
              onClick={() => { 
                addToCart(product); 
                message.success('Товар добавлен'); 
              }}
              style={{ background: '#6366f1', borderRadius: 8 }}
            >
              В корзину
            </Button>
          </Col>
        </Row>
      </Card>
    </Layout>
  );
};

export default ProductDetail;