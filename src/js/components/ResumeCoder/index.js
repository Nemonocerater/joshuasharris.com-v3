import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import { transform as babelTransform } from 'babel-standalone';
import ace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/twilight';

import code from './code';

const MOBILE = '800px';

export default class ResumeCoder extends React.Component {
  constructor() {
    super();
    this.loadAttempts = 0;
    this.loadCode = this.loadCode.bind(this);
    this.clickCodeButton = this.clickCodeButton.bind(this);
  }

  componentDidMount() {
    // Need these for JSX/React compilation on the Browser
    window.React = React;
    window.ReactDOM = ReactDOM;

    this.setupEditorAndLoadCode();
  }

  setupEditorAndLoadCode() {
    if (!this.editor) {
      var editor = ace.edit("code");
      editor.setTheme("ace/theme/twilight");
      editor.session.setMode("ace/mode/javascript");
      editor.session.setOption("useWorker", false);

      // TODO change this order to just load through the flow once
      editor.setValue(code);
      this.loadCode();
      editor.session.on('change', this.loadCode);
      setTimeout(() => editor.resize(), 1000);

      this.editor = editor;
    }
  }

  loadCode() {
    this.loadAttempts++;
    setTimeout(() => {
      this.loadAttempts--;
      if (this.loadAttempts === 0) {
        // TODO: Lol, fix this security nightmare before putting anything secure on the site.
        eval(babelTransform(this.editor.getValue(), {
          presets: ['es2015', 'react']
        }).code);
      }
    }, 100);
  }

  clickCodeButton() {
    alert("code button");
  }

  /*
    <div id="editorButton" onClick={this.clickCodeButton}>
      <div className="text">
        -- Code --
      </div>
    </div>
  */
	render() {
    return (
      <ResumeContainer>
        <EditorContainer>
          <CodeContainer>
            <Code id="code" />
          </CodeContainer>
        </EditorContainer>
        <OutputContainer>
          <div id="main"></div>
        </OutputContainer>
      </ResumeContainer>
    );
	}
}

const ResumeContainer = styled.div`
  width: 100%;
  height: 100%;
  max-height: 100%;
  display: flex;
  position: relative;

  @media (max-width: 800px) {
    display: block;
  }
`;

const EditorContainer = styled.div`
  flex: 1;
  max-width: 50%;
  max-height: 100%;

  @media (max-width: 800px) {
    position: absolute;
    width: 100%;
    max-width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
`;

const CodeContainer = styled.div`
	position: relative;
	height: 100%;
  flex: 1;
`;

const Code = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
`;

const OutputContainer = styled.div`
  flex: 1;
  max-height: 100%;
  overflow: scroll;
  padding: 15px;
`;
