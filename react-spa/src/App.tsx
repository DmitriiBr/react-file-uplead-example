import { Button } from "$/Button/Button";
import { Container } from "$/Container/Container";
import { Input } from "$/Input/Input";
import { InputFile } from "$/InputFile/InputFile";
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
        <InputFile id="inputFile" title="Upload your file" />
        <Button type="submit">Upload</Button>
      </form>
    </Container>
  );
};

export default App;
