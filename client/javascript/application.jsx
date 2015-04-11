'use strict';

import React from 'react';
import $ from 'jquery';

import Store from './store';
import TestCasesList from './components/test-cases-list.jsx';
import TestSuite from './models/test-suite';

export default class Application extends React.Component {
  constructor() {
    super();

    let logsElement = document.getElementById('logs'),
        logs = '';

    if (logsElement) {
      logs = logsElement.innerText;
    }

    this.state = {
      testSuite: Store.create(TestSuite, logs)
    };
  }


  componentDidMount() {
    var self = this;

    $.ajax({
      url: '/sample-05-04-2015.log',
      success: function (result) {
        self.setState({
          testSuite: Store.create(TestSuite, result)
        });
      }
    });
  }


  render() {
    return (
      <div>
        <header className="main-header">
          <a href="/">Mithril CI v0.0.1</a>
        </header>

        <main className="main-content">
          <TestCasesList testSuite={this.state.testSuite} />
        </main>
      </div>
    );
  }
}

// (function (document, window, THREE) {
//   'use strict';
//
//   let parentDiv = document.getElementById('the-display'),
//       renderer = new THREE.WebGLRenderer({
//         antialias: true,
//       }),
//       camera = new THREE.PerspectiveCamera(45, 1.0, 1, 100),
//       scene = new THREE.Scene();
//
//   camera.position.z = 5;
//   renderer.setPixelRatio(window.devicePixelRatio);
//   parentDiv.appendChild(renderer.domElement);
//
//   let animate = function () {
//     window.requestAnimationFrame(animate);
//
//     camera.aspect = parentDiv.clientWidth / parentDiv.clientHeight;
//     renderer.setSize(parentDiv.clientWidth, parentDiv.clientHeight);
//
//     renderer.render(scene, camera);
//   };
//
//   let cases = TestCase.buildFromFullLogs(document.getElementById('logs').innerText);
//   console.log(cases);
//
//   cases[0].prepareRender(scene);
//
//   animate();
// }).call(this, document, window, THREE);
