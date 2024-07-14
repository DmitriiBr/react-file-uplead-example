import { Container } from "$/Container/Container";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <Container>
      <Link to="/multipart-single">multipart-single</Link>
      <Link to="/multipart-multi">multipart-multi</Link>
      <Link to="/base64-single">base64-single</Link>
    </Container>
  );
};
