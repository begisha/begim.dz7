import React from 'react';
import { Layout, List, Button, Typography, Card, Avatar, Empty, message } from 'antd';
import { DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useCartStore } from '../store/cartStore';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { Content } = Layout;

const Cart = () => {
  const { cart, removeFromCart } = useCartStore();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    removeFromCart(id);
    message.warning('Товар удален');
  };

  const total = cart.reduce((sum, item) => {
    return sum + (Number(item.price) || 0);
  }, 0);

  return (
    <Layout style={{ minHeight: '100vh', background: '#0f0f1a' }}>
      <Content style={{ padding: '60px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate(-1)} 
            style={{ marginBottom: 20, color: '#fff', background: 'rgba(255,255,255,0.1)', border: 'none' }}
          >
            Назад
          </Button>
          
          <Card 
            bordered={false}
            style={{ 
              background: 'rgba(255,255,255,0.05)', 
              borderRadius: 24,
              boxShadow: '0 10px 50px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <Title level={2} style={{ color: '#fff', textAlign: 'center', marginBottom: 40 }}>
              КОРЗИНА
            </Title>
            
            {cart.length === 0 ? (
  <div style={{ textAlign: 'center', padding: '40px 0' }}>
    <Text style={{ color: 'rgba(255,255,255,0.3)', fontSize: '18px' }}>
      В корзине пока ничего нет
    </Text>
  </div>
) : (
              <>
                <List
                  dataSource={cart}
                  renderItem={(item) => (
                    <List.Item
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '15px 0' }}
                      actions={[
                        <Button 
                          danger 
                          type="primary" 
                          shape="circle"
                          icon={<DeleteOutlined />} 
                          onClick={() => handleRemove(item._id || item.id)} 
                        />
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={item.image} size={70} shape="square" style={{ borderRadius: 8 }} />}
                        title={<Text style={{ color: '#fff', fontSize: '18px' }}>{item.title}</Text>}
                        description={<Text style={{ color: '#6366f1', fontSize: '16px' }}>{item.price}$</Text>}
                      />
                    </List.Item>
                  )}
                />
                <div style={{ marginTop: 40, textAlign: 'right', borderTop: '2px solid rgba(255,255,255,0.1)', paddingTop: 20 }}>
                  <Title level={2} style={{ color: '#fff' }}>
                    Сумма: {total.toFixed(2)}$
                  </Title>
                </div>
              </>
            )}
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default Cart;