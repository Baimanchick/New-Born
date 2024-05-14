import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

function NotFoundedPage() {
  const navigate = useNavigate()
  return (
    <Result
      status="403"
      title="403"
      subTitle="Извините но этой странице не существует"
      extra={<Button onClick={() => navigate('/')} type="primary">На галвную страничку</Button>}
    />
  );
}

export default NotFoundedPage;
