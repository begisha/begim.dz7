import { Form, Input, Button, Card, Typography, message } from 'antd';
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerRequest } from "../api/auth";

const { Title, Text } = Typography;

export default function Register() {
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: registerRequest,
    onSuccess: () => {
      message.success('Регистрация успешна! Теперь войдите.');
      navigate('/login');
    },
    onError: (error) => {
      console.error("Ошибка регистрации:", error);
      message.error('Ошибка: возможно, такой email уже занят или путь неверный');
    }
  });

  const onFinish = (values) => {
    const dataToSend = { 
      ...values, 
      avatar: "https://picsum.photos/200" 
    };
    registerMutation.mutate(dataToSend);
  };

  return (
    <div style={{ 
      display: 'flex', justifyContent: 'center', alignItems: 'center', 
      minHeight: '100vh', width: '100vw',
      background: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)', 
      margin: 0 
    }}>
      <Card style={{ width: 400, borderRadius: 15, boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={2}>Регистрация</Title>
          <Text type="secondary">Создайте новый аккаунт</Text>
        </div>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Имя" name="username" rules={[{ required: true, message: 'Введите имя!' }]}>
            <Input size="large" placeholder="Begimayka" />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Введите почту!' }]}>
            <Input size="large" placeholder="example@mail.com" />
          </Form.Item>

          <Form.Item label="Пароль" name="password" rules={[{ required: true, message: 'Минимум 6 символов!', min: 6 }]}>
            <Input.Password size="large" placeholder="******" />
          </Form.Item>

          <Button 
            type="primary" htmlType="submit" block size="large" 
            loading={registerMutation.isPending}
            style={{ borderRadius: 8 }}
          >
            Создать аккаунт
          </Button>

          <div style={{ marginTop: 16, textAlign: 'center' }}>
            Уже есть профиль? <Link to="/login">Войти</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}