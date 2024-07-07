import { Button } from "$/Button/Button";
import { Container } from "$/Container/Container";
import { Input } from "$/Input/Input";
import { Label } from "$/Label/Label";
import { FormEventHandler } from "react";

const App = () => {
  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
  };

  return (
    <Container>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "1rem",
          width: "100%",
        }}
      >
        <Label htmlFor="fileInput" title="Upload file">
          <Input id="fileInput" type="file" tabIndex={0} />
        </Label>
        <Button type="submit">Upload</Button>
      </form>
    </Container>
  );
};

export default App;
