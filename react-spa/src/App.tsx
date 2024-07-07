import { Container } from "$/Container/Container";
import { Input } from "$/Input/Input";

const App = () => {
  return (
    <Container>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: ".375rem",
          fontWeight: 500,
        }}
      >
        <label htmlFor="fileInput">Upload file</label>
        <Input id="fileInput" type="file" tabIndex={0} />
      </div>
    </Container>
  );
};

export default App;
