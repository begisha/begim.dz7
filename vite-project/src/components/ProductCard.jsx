import React from 'react';
import { Card, Button, Typography, Space, message } from 'antd';
import { ShoppingCartOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate();

  const productId = product._id || product.id;

  const handleAdd = (e) => {
    e.stopPropagation(); 
    onAddToCart(product);
    message.success('Добавлено в корзину');
  };

  return (
    <Card
      hoverable
      style={{ 
        background: 'rgba(255, 255, 255, 0.05)', 
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
      }}
      cover={
        <img 
          alt={product.title} 
          src={product.image || 'https://via.placeholder.com/300'} 
          style={{ height: 200, objectFit: 'cover', borderRadius: '16px 16px 0 0' }}
        />
      }
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Text strong style={{ color: '#fff', fontSize: '16px' }}>{product.title}</Text>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
          <Text style={{ color: '#6366f1', fontSize: '18px', fontWeight: 'bold' }}>
            {product.price}$
          </Text>
          <Space>
            <Button 
              ghost 
              icon={<EyeOutlined />} 
              onClick={() => navigate(`/products/${productId}`)} 
              style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}
            />
            <Button 
              type="primary" 
              icon={<ShoppingCartOutlined />} 
              onClick={handleAdd}
              style={{ background: '#6366f1' }}
            />
          </Space>
        </div>
      </Space>
    </Card>
  );
};

export default ProductCard;