import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom';

import { transform as babelTransform } from 'babel-standalone';
import ace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/twilight';

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
      editor.setValue(this.getResumeCode());
      this.loadCode();
      editor.session.on('change', this.loadCode);

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
    console.log("code button");
  }

	render() {
    return (
      <div id="resumeContainer">
        <div id="editorContainer">
          <div id="editorButton" onClick={this.clickCodeButton}>
            <div class="text">
              -- Code --
            </div>
          </div>
          <div id="codeCont">
            <div id="code"></div>
          </div>
        </div>
        <div id="outputContainer">
          <div id="main"></div>
        </div>
      </div>
    );
	}

  getResumeCode() {
    return `
/*
 *************************************************
 *
 * TODO:
 *  1. Figure out how I will handle responsiveness in the resume
 *	2. Fix the data (figure out what I want to portray)
 *	3. Design the site actually, and figure out how to get the css working
 *
 * stop ace editor from being selected
 * editor.setFontSize()
 *
 *************************************************
 */

let josh = {
	name: "Joshua S. Harris",
	email: "joshua40harris@gmail.com",
	phone: "(678) 920-8233",
	tagline: "Finding simple solutions to create customer value",

	education: {
		school: "Georgia Tech",
		graduation: "May 2014",
		degree: "Computer Science BS (Specialization in Networking and Media)"
	},

	work: [{
		name: "Fullstory",
		start: "May 2018",
		end: "current",
		role: "Software Engineer"
	}, {
		name: "Salesforce Pardot",
		start: "July 2014",
		end: "May 2018",
		role: "Software Engineer"
	}],

	experience: [{
		title: "Salesforce Engage",
		company: "Salesforce Pardot",
		desc: "Built a system that gave sales users information about what activities their leads were engaging in with their digital assets (email opens and clicks, page views, etc.).  The information would publish to their Salesforce1 mobile app and our Web interface to give them real time alerts when leads were active."
	}, {
		title: "Multiplicity",
		company: "Salesforce Pardot",
		desc: "We reworked major sections of our codebase to ensure that all previous contraints assuming that email addresses represented one and only one user were replaced, so that we could handle multiple records per 'user'.  Allowing multiple records would give us the ability to separate activities for different business units selling to the same customer."
	}, {
		title: "Pardot Licensing and Provisioning",
		company: "Salesforce Pardot",
		desc: "We were moving our existing product onto the Salesforce Platform and needed to build into their licensing and provisioning model.  I led the charge in understanding that system and designing it."
	}, {
		title: "Org State Email System",
		company: "Fullstory",
		desc: ""
	}, {
		title: "Quota Management (Annual Quota)",
		company: "Fullstory",
		desc: ""
	}],

	technologies: [{
		// React (Redux), Node.js, Golang, PHP, MySQL, Mongo
	}]
};

var resume_data = {
	border: "1px solid #ddd",
	padding: "5px"
};

/* Props:
 *	person [person] - object with all of the data for the resume
 *	dataview [bool] - Show raw data instead of resume
 */
class JSXResume extends React.Component {
	getResumeComponent() {
			if (this.props.dataview) {
				return (<JsonPre json={this.props.person} />);
			} else {
				let { person } = this.props;
				return (
					<div>
						<Header name={person.name}
						 	email={person.email}
							phone={person.phone} />
						<Education school={person.education.school}
							graduation={person.education.graduation}
							degree={person.education.degree} />
						<Work jobs={person.work} />
						<Experiences experiences={person.experience} />
						<Technologies technologies={person.technologies} />
					</div>
				)
			}
	}

  render () {
    return (
			<div style={resume_data}>
				{this.getResumeComponent()}
			</div>
		);
  }
}

/* Props:
 *	json [object] - An object to print as pretty JSON
 */
function JsonPre(props) {
	return (
		<pre style={{ whiteSpace: 'pre-wrap' }}>
			{JSON.stringify(props.json, null, 2)}
		</pre>
	);
}

/* Props:
 *	name [string]
 *	email [string]
 *	phone [string]
 */
function Header(props) {
	return (
		<header>
			<h2>{props.name}</h2>
			<div>
				{props.email} - {props.phone}
			</div>
		</header>
	);
}

/* Props:
 *	school [string] - the name of the school attended
 *	graduation [string] - the date of graduation
 *	degree [string] - degree description text
 */
function Education(props) {
	return (
		<div>
			<h3>Education</h3>
			<div>
				{props.school}
				<span style={{ float: "right" }}>
					{props.graduation}
				</span>
			</div>
			<p>{props.degree}</p>
		</div>
	);
}

/* Props:
 *	jobs [array] - [
 *		{
 *			name [string] - name of the company
 *			start [string] - start date working at company
 *			end [string] - end date working at company
 *			role [string] - title or role at the company
 *		}
 *	]
 */
function Work(props) {
	let { jobs } = props;
	return (
		<div>
			<h3>Work Experience</h3>
			<JsonPre json={jobs} />
		</div>
	);
}

/* Props:
 *	accomplishments [array] - [
 *		{
 *			title [string] - title of the accomplishment
 *			company [string] - name of the company
 *			desc [string] - description of the work or accomplishment
 *		}
 *	]
 */
function Experiences(props) {
	let { experiences } = props;
	return (
		<div>
			<h3>Projects or Accomplishments</h3>
			<JsonPre json={experiences} />
		</div>
	);
}

/* Props:
 *	technologies [array] - [
 *		{
 *			thing [string] - ???
 *		}
 *	]
 */
function Technologies(props) {
	let { technologies } = props;
	return (
		<div>
			<h3>Technologies</h3>
			<JsonPre json={technologies} />
		</div>
	);
}

ReactDOM.render(
	<JSXResume person={josh} />,
	document.getElementById("main")
);
`;
  }
}
