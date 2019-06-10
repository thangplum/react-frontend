import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
// import CommentForm from './CommentForm';
import { Loading } from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';
import {FadeTransform, Fade, Stagger} from 'react-animation-components';  
import { Control, LocalForm, Errors } from 'react-redux-form';

    function RenderDish({dish}) {
        if (dish != null) {
            return(
                <div className="col-12 col-md-5 m-1">
                    <FadeTransform in transformProps={{
                            exitTransform: 'scale(0.5) translateY(-50%)'
                        }}>
                        <Card>
                            <CardImg width="100%" object src={baseUrl + dish.image} alt={dish.name}></CardImg>
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </FadeTransform>
                    
                </div>
                    
            );
        }
        else {
            return(
                <div></div>
            );
        }
    }

    function RenderComment({comments, postComment, dishId}) {
        if (comments != null) {
            const commentList = comments.map(comment => {
            const options = {
                year: "numeric",
                month: "short",
                day: "2-digit"
            };
            const formattedDate = new Date(comment.date).toLocaleDateString(
                "en-US",
                options
            );
          
            return (
                <div >
                    <ul key={comment.id} className="list-unstyled">
                        <Stagger in>
                            <Fade in>
                                <li>{comment.comment}</li>
                                <li>
                                -- {comment.author}, {formattedDate}
                                </li>
                            </Fade>
                        </Stagger>
                      </ul>
                    </div>
                  );
                });
                return (
                  <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    {commentList}
                    <CommentForm dishId={dishId} postComment={postComment} />
                  </div>
                );
            }
        else {
            return (
                <div></div>
            );
        }
    }


    const DishDetail = (props) => {
        if (props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        } else if (props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        if (props.dish != null) {
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderDish dish={props.dish} /> 
                        <RenderComment comments={props.comments} postComment={props.postComment} dishId={props.dish.id} />
                    </div>
                </div>
            )
        }
        else {
            return (
                <div></div>
            )
        }
    }

    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);

    class CommentForm extends Component {
        constructor(props) {
            super(props);
            this.state = {
              modal: false
            };
        
            this.toggle = this.toggle.bind(this);
        }
    
        toggle() {
            this.setState(prevState => ({
              modal: !prevState.modal
            }));
        }
    
        handleSubmit(values) {
            this.toggle();
            this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        }
    
        render() {
            return (
                <div>
                    <Button outline color="info" onClick={this.toggle}><i className="fa fa-pencil" /> Submit Comment</Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="rating" md={12}>Rating</Label>
                                    <Col md={12}>
                                        <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="yourName" md={12}>Your Name</Label>
                                    <Col md={12}>
                                        <Control.text model=".author" id="author" name="author" placeholder="Your Name" className="form-control" validators={{required, minLength: minLength(3), maxLength: maxLength(15)}} />
                                        <Errors className="text-danger" model=".yourname" show="touched" messages={{required: 'Required', minLength: "Must be 3 characters or more", maxLength: "Must be 15 characters or less"}} />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="comment" md={12}>Comment</Label>
                                    <Col md={12}>
                                        <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control" />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={12}>
                                        <Button type="submit" color="primary">Submit</Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
            )
        }
    }

export default DishDetail