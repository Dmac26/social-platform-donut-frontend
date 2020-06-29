import React, { Component } from "react";
import EditIcon from '@material-ui/icons/Edit';
import GitHubIcon from '@material-ui/icons/GitHub';
import LanguageIcon from '@material-ui/icons/Language';
import Navigation from "../../dashboard/navigation/navigation";
import { Card, Button, Badge, Col, Row } from "react-bootstrap";
import "./proj-info.scss";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import proj_img from "../../../images/project.png";
import EditProject from "../popups/edit-project";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteProject from "../popups/delete-project";
import { makeStyles,Grid, Fab} from "@material-ui/core";
// import { CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core"
import { connect } from 'react-redux'
import { getProjectById } from '../../../actions/projectAction'
import { checkDeleteRights } from '../../dashboard/utils/checkDeleteRights'


class ProjInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proj: true,
      editProject: false,
      projectInfo: {},
      deleteProject: false,
      githubLink: '',
      bitBucketLink: ''
    };
  }

  componentDidMount() {
    console.log('project info mounted ',this.props)
    // fetch the data from db 
    setTimeout(() => {
      this.props.getProjectById(this.props.match.params.id)
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps ', nextProps)
    const { singleProject } = nextProps.project
    this.setState({ projectInfo: singleProject }, () => {
      console.log('updating project info state ', this.state)
    })
    const { links } = singleProject
    this.setState({ githubLink: links[0]?.githubLink, bitBucketLink: links[0]?.bitBucketLink })
  }

  render() {
    const { projectInfo, editProject, proj, deleteProject, githubLink, bitBucketLink } = this.state

    let cancel = () =>{
      this.setState({
        editProject: false,
      });
    }

    let cancel_del = () => {
      this.setState({
        deleteProject: false,
      })
    }

    const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
      },
    }));

    // const useStyles2 = makeStyles({
    //   root: {
    //     maxWidth: 345,
    //     marginTop: "20px",
    //   },
    // });

    // let maintainers = projectInfo?.maintainers.map((item) => (
    //   <Grid item xs={6} sm={4}>
    //     <Card className={useStyles2.root}>
    //       <CardActionArea>
    //         <CardMedia component="img" className="img" image={user_img} />

    //         <CardContent>
    //           <Typography gutterBottom variant="h5" component="h2">
    //             {item}
    //           </Typography>
    //           <Typography variant="body2" color="textSecondary" component="p">
    //             Software developer in Codeuino
    //           </Typography>
    //         </CardContent>
    //       </CardActionArea>
    //       <CardActions>
    //         <Button size="small" variant="light">
    //           <strong>See Profile</strong>
    //         </Button>
    //       </CardActions>
    //     </Card>
    //   </Grid>
    // ));

    return (
      <div className="organization">
        <div className="navigation">
          <Navigation proj={proj}></Navigation>
        </div>
        <div className="news">
          <Fab
            className="back"
            href="/projects"
            color="primary"
            aria-label="add"
          >
            <ArrowBackIcon />
          </Fab>
          <Row>
            <Col sm={4}>
              <Card.Img variant="top" className="proj_img" src={proj_img} />
            </Col>
            <Col sm={8}>
              <div className="project-info">
                <Row>
                  <Col sm={7}>
                    <h1 className="proj_name">{projectInfo?.projectName}</h1>
                    <Badge variant="success">
                      Version {projectInfo?.version || "1.0.0"}
                    </Badge>{" "}
                  </Col>

                  <Col sm={5}>
                    <Button variant = "light" onClick = {() => {
                        window.open(githubLink, '_blank')
                      }
                    } >
                      <GitHubIcon></GitHubIcon>
                    </Button>{" "}
                    <Button variant = "light" onClick = {() => {
                          window.open(bitBucketLink, '_blank')
                        } 
                      }>
                      <LanguageIcon></LanguageIcon>
                    </Button>{" "}
                    {checkDeleteRights(projectInfo.createdBy?._id) ? (
                      <Button
                        variant="light"
                        onClick={() => this.setState({ editProject: true})}
                      >
                        <EditIcon></EditIcon>
                      </Button>
                    ) : null }
                    <EditProject
                      show={editProject}
                      data={projectInfo}
                      onHide={cancel}
                    />
                    {checkDeleteRights(projectInfo.createdBy?._id) ? (
                      <Button
                        variant="light"
                        onClick={() => this.setState({ deleteProject: true })}
                      >
                        <DeleteIcon></DeleteIcon>
                      </Button>
                    ) : null}
                  <DeleteProject
                    show={deleteProject}
                    onHide={cancel_del}
                    projectId={this.props.match.params.id}
                  />
                    <br></br>
                    <div className="tech-stack">
                  <Badge pill variant="primary">
                    React
                  </Badge>{" "}
                  <Badge pill variant="secondary">
                    Passport
                  </Badge>{" "}
                  <Badge pill variant="success">
                    Nodejs
                  </Badge>{" "}
                  <Badge pill variant="danger">
                    Bootstrap
                  </Badge>{" "}
                  <br></br>
                  <Badge pill variant="warning">
                    Mongoose
                  </Badge>{" "}
                  <Badge pill variant="info">
                    JWT
                  </Badge>{" "}
                  <Badge pill variant="light">
                    Material-ui
                  </Badge>{" "}
                  <Badge pill variant="dark">
                    Redux
                  </Badge>
                </div>
                  </Col>
                </Row>

                <p className="createAt">
                  Created At: {projectInfo?.createdAt}{" "}
                </p>
                <p className="place">Updated At: {projectInfo?.updatedAt}</p>
                <p className="short_des">{projectInfo.description?.short || "Short description"}</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="description">
                <h1>Project Details</h1>
                <hr />

                <p className="desc">
                  {projectInfo.description?.long || "Long description"}
                </p>
              </div>
            </Col>
          </Row>

          {/* <Row>
            <Col xs={12}>
              <div className="maintainers">
                <h1>Maintainers</h1>
                <hr />
              </div>
            </Col>
          </Row> */}

          <div className={useStyles.root}>
            <Grid container spacing={1}>
              {/* {maintainers} */}
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

// map state to props 
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
  project: state.project
})

export default connect(mapStateToProps, { getProjectById })(ProjInfo);
