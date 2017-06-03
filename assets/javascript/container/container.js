import React from 'react';
import underscore from 'underscore';

const Container = React.createClass({

    getInitialState () {
        return ({
            jsonData: null,
            fileUploadError: ''
        })
    },

    uploadFile (evt) {
        if (evt && evt.target && evt.target.files[0] && evt.target.files[0].name) {
            var jsonData;
            let ext = evt.target.files[0].name.split('.').pop().toLowerCase();
            if (ext === 'json') {
                var files = evt.target.files;
                var output = [];
                for (var i = 0, f; f = files[i]; i++) {
                    var reader = new FileReader();
                    reader.onload = ((theFile) => {
                        return (e) => {
                            try {
                                jsonData = JSON.parse(e.target.result);
                                this.setState({
                                    jsonData: jsonData
                                })
                            } catch (ex) {
                                this.setState({
                                    fileUploadError: 'error when trying to parse json: ' + ex
                                })
                            }
                        }
                    })(f);
                    reader.readAsText(f);
                }
            } else {
                this.setState({
                    fileUploadError: 'Incorrect file format'
                })
            }
        }
    },

    render () {
        return (
            <section className="container">
                {!this.state.jsonData
                    ? <div>
                          <form ref="form">
                              Select a json file:
                              <input type="file" name="file" onChange={this.uploadFile} />
                          </form>
                          {this.state.fileUploadError ? <span>{this.state.fileUploadError}</span> : null}
                      </div>
                    : <div id="extent-container">
                          <div id="content">
                              <div className="content">
                                  <div id="tests">
                                      {underscore.map(this.state.jsonData, (testInfo, key) => {
                                          return <TestBlock testInfo={testInfo} key={key} />
                                      })}
                                  </div>
                              </div>
                          </div>
                      </div>
                }
            </section>
        );
    }
});

const TestBlock = React.createClass({
    getInitialState () {
        return ({
            showDetails: false
        })
    },

    showDetails () {
        this.setState({
            showDetails: !this.state.showDetails
        })
    },

    render () {
        let testInfo = this.props.testInfo;
        return (
            <div className="test">
                <div className="test-header" onClick={this.showDetails}>
                    <div className="name">
                        <span>{testInfo.name}</span>
                    </div>
                    <div className="test-info">
                        <span className="startedAt" alt="Test started time" title="Test started time"><i className="fa fa-clock-o"></i>03/29 16:00:25</span>
                        <span className="endedAt" alt="Test ended time" title="Test ended time"><i className="fa fa-clock-o"></i>03/29 16:00:39</span>
                        <span className="test-status status pass">pass</span>
                    </div>
                    {testInfo.description
                        ? <div className="description">
                              <span className="description-title">Description: </span>
                              <span className="description-content">{testInfo.description}</span>
                          </div>
                        : null
                    }
                </div>
                {this.state.showDetails
                    ? <div className="exec-info">
                          <table className="extent-table">
                              <thead>
                                  <tr>
                                      <th>Timestamp</th>
                                      <th>Status</th>
                                      <th>Step</th>
                                      <th>Details</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {underscore.map(testInfo.details, (testDetail, key) => {
                                      return (
                                          <tr key={key}>
                                              <td>16:00:37</td>
                                              <td title="INFO" className="status info"><i className="fa fa-info-circle"></i>{testDetail.status}</td>
                                              <td>{testDetail.stepname}</td>
                                              <td className="step-details" colSpan="2"><span className="caller-class"></span>{testDetail.description}</td>
                                          </tr>
                                      )
                                  })}
                              </tbody>
                          </table>
                      </div>
                    : null
                }
            </div>
        )
    }
});

export default Container;
