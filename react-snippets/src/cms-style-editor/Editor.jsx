import React, { useState } from "react";
import styled from "styled-components";
import {
  newLineToArrayFormatter,
  arrayToNewLineFormatter,
} from "./engine/editorFormatters";
import { runTemplateEngine } from "./engine/runTemplateEngine";
import { TEMPLATES } from "./sample_templates";

const DEFAULT_CONTENT = [
  "Here is an example of an Icon component: @Components.SampleIcon",
  "You can also add new lines markdown style by adding two newlines!",
  "Finally, check out this button! @Components.SampleButton"
];

const GridContainer = styled.div`
  display: grid;
  grid-template-columns:
    [editor-col] 50%
    [preview-col] 50%;
  text-align: center;
`;

const EditorContainer = styled.div`
  padding: 2rem;
  background: white;
  & > * {
    width: 100%;
  }
`;

const PreviewContainer = styled.div`
  background: #f6f6f6;
  padding: 2rem;
  & > * {
    width: 100%;
  }
`;

const StyledTextarea = styled.textarea`
  height: 200px;
`;

const SpacedDiv = styled.div`
  margin:20px 0;
`

export const Editor = () => {
  const [content, updateContent] = useState(DEFAULT_CONTENT);
  return (
    <GridContainer>
      <EditorContainer>
        <h2 style={{ textAlign: "center" }}> Editor</h2>
        <hr />
        <StyledTextarea
          value={arrayToNewLineFormatter(content)}
          onChange={(e) => {
            updateContent(newLineToArrayFormatter(e.target.value));
          }}
        ></StyledTextarea>
      </EditorContainer>
      <PreviewContainer>
        <h2> Preview</h2>
        <hr />
        {content.map((line, i) => <SpacedDiv key={i}>{runTemplateEngine(TEMPLATES)(line)}</SpacedDiv>)}
      </PreviewContainer>
    </GridContainer>
  );
};

